export class WebcamController {
  constructor({
    video,
    gate,
    onDirection,
    onStatus,
    onSamples,
    onPrediction,
  }) {
    this.video = video;
    this.gate = gate;
    this.onDirection = onDirection;
    this.onStatus = onStatus;
    this.onSamples = onSamples;
    this.onPrediction = onPrediction;
    this.examples = [[], [], [], []];
    this.directions = ["up", "left", "down", "right"];
    this.isPredicting = false;
  }

  async start() {
    if (!globalThis.tf || !globalThis.mobilenet) {
      throw new Error("TensorFlow.js ou MobileNet não foi carregado.");
    }

    this.onStatus("Solicitando acesso à câmera…");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 224, height: 224 },
      audio: false,
    });
    this.video.srcObject = stream;
    await this.video.play();

    this.onStatus("Carregando MobileNet…");
    this.featureExtractor = await globalThis.mobilenet.load({
      version: 2,
      alpha: 0.5,
    });

    const warmup = this.extractFeatures();
    warmup.dispose();
    this.onStatus("Câmera pronta. Colete exemplos para cada direção.");
  }

  extractFeatures() {
    return globalThis.tf.tidy(() =>
      this.featureExtractor.infer(this.video, true).clone(),
    );
  }

  addExample(label) {
    if (!this.featureExtractor) {
      throw new Error("Ative a câmera antes de coletar exemplos.");
    }

    this.examples[label].push(this.extractFeatures());
    this.onSamples(this.examples.map((items) => items.length));
  }

  async train() {
    if (this.examples.some((items) => items.length < 3)) {
      throw new Error("Colete ao menos 3 exemplos de cada direção.");
    }

    this.stopPredicting();
    this.model?.dispose();
    const tensors = this.examples.flat();
    const labels = this.examples.flatMap((items, label) =>
      items.map(() => label),
    );
    const xs = globalThis.tf.concat(tensors);
    const ys = globalThis.tf.oneHot(
      globalThis.tf.tensor1d(labels, "int32"),
      this.directions.length,
    );

    this.model = globalThis.tf.sequential({
      layers: [
        globalThis.tf.layers.dense({
          inputShape: xs.shape.slice(1),
          units: 64,
          activation: "relu",
          kernelInitializer: "varianceScaling",
        }),
        globalThis.tf.layers.dense({
          units: this.directions.length,
          activation: "softmax",
          kernelInitializer: "varianceScaling",
        }),
      ],
    });
    this.model.compile({
      optimizer: globalThis.tf.train.adam(0.0001),
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });

    this.onStatus("Treinando o controle…");
    await this.model.fit(xs, ys, {
      epochs: 20,
      batchSize: Math.min(16, labels.length),
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          const accuracy = logs.acc ?? logs.accuracy ?? 0;
          this.onStatus(
            `Treinando: ${epoch + 1}/20 · precisão ${(accuracy * 100).toFixed(0)}%`,
          );
        },
      },
    });
    xs.dispose();
    ys.dispose();
    this.onStatus("Treino concluído. Ative o controle por câmera.");
  }

  togglePredicting() {
    if (!this.model) {
      throw new Error("Treine o controle antes de jogar com a câmera.");
    }

    this.isPredicting = !this.isPredicting;
    if (this.isPredicting) {
      this.onStatus("Controle por câmera ativo.");
      this.predict();
    } else {
      this.onStatus("Controle por câmera pausado.");
    }
    return this.isPredicting;
  }

  stopPredicting() {
    this.isPredicting = false;
  }

  async predict() {
    while (this.isPredicting) {
      const features = this.extractFeatures();
      const prediction = this.model.predict(features);
      const probabilities = await prediction.data();
      features.dispose();
      prediction.dispose();

      let label = 0;
      for (let index = 1; index < probabilities.length; index += 1) {
        if (probabilities[index] > probabilities[label]) label = index;
      }

      const direction = this.directions[label];
      const confidence = probabilities[label];
      this.onPrediction(direction, confidence);
      const command = this.gate.accept(direction, confidence);
      if (command) this.onDirection(command);

      await globalThis.tf.nextFrame();
    }
  }
}

