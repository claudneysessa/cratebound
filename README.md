# Caixa no Buraco

Jogo simples de navegador no qual o jogador atravessa uma sala e empurra uma caixa até um buraco, desviando de um obstáculo.

## Estado atual

O projeto está no primeiro ciclo de TDD. O teste do caminho mínimo de sucesso falhou primeiro porque o domínio ainda não existia. Em seguida, foi criada somente a implementação necessária para movimentar o jogador, empurrar a caixa alinhada e reconhecer a vitória.

## Objetivo da primeira versão

- Exibir uma sala quadrada 8 × 8.
- Representar o jogador inicialmente como um ponto.
- Permitir empurrar uma caixa, mas nunca puxá-la.
- Impedir a passagem pelo obstáculo.
- Vencer quando a caixa chegar ao buraco.
- Oferecer os botões cima, esquerda, baixo, direita e Reset.
- Gerar uma nova fase aleatória após cada vitória.
- Aumentar gradualmente os obstáculos sem aceitar fases impossíveis.

## Entrega final

A versão final será preparada para o CodePen em exatamente três partes:

- `codepen/html.html`: painel HTML.
- `codepen/css.css`: painel CSS.
- `codepen/javascript.js`: painel JavaScript.

Essa entrega não usará módulos, instalação, servidor, banco de dados ou serviço externo. A estrutura modular em `src` continuará sendo a fonte organizada e testável do projeto.

## Arquitetura

O projeto seguirá uma separação simples inspirada em DDD:

- **Domínio:** regras da sala, posições, movimentos, caixa, obstáculo, buraco e vitória.
- **Aplicação:** recebe uma intenção de movimento ou Reset e coordena o domínio.
- **Interface:** desenha o estado no navegador e converte botões ou teclado em comandos.

O domínio não conhecerá HTML, eventos do navegador ou elementos visuais. Isso mantém as regras testáveis e aplica o princípio de inversão de dependência sem acrescentar estruturas desnecessárias.

## Método de desenvolvimento

Cada comportamento será desenvolvido em um ciclo curto:

1. Escrever o menor teste.
2. Executá-lo e confirmar a falha esperada.
3. Implementar apenas o necessário para fazê-lo passar.
4. Refatorar sem alterar o comportamento.
5. Documentar o ciclo e registrar data e hora no changelog.

O primeiro teste descreve somente o sucesso mínimo: com jogador, caixa e buraco alinhados, um movimento empurra a caixa para o buraco e encerra a partida com vitória. Obstáculos, limites, Reset e interface serão acrescentados em ciclos posteriores.

### Ciclo 1 — caminho mínimo de sucesso

- **Vermelho:** o teste falhou porque `src/domain/game.js` ainda não existia.
- **Verde:** foi criado o objeto de domínio `Game`, capaz de mover o jogador, empurrar uma caixa alinhada e informar a vitória.
- **Limite intencional:** entradas inválidas, paredes, obstáculo e movimentos depois da vitória ainda não pertencem a este ciclo.

### Ciclo 2 — sessão da interface e Reset

- **Vermelho:** o teste falhou porque a sessão de aplicação ainda não existia.
- **Verde:** a sessão agora publica o estado, aceita movimentos e recria o nível no Reset. A primeira interface no navegador observa essa sessão.
- **Limite intencional:** o tabuleiro visual ainda usará o nível mínimo do primeiro teste; sala completa e obstáculo virão nos próximos ciclos.

### Ciclo 3 — limites da sala

- **Vermelho:** o jogador saiu para coordenadas negativas, demonstrando que o domínio não conhecia os limites.
- **Verde:** largura e altura passaram a fazer parte do nível; jogador e caixa não podem atravessar as bordas.
- **Decisão de domínio:** a interface apenas informa o tamanho. A validação continua dentro do jogo.

### Ciclo 4 — formato final do CodePen

- **Vermelho:** o teste falhou porque `codepen/javascript.js` ainda não existia.
- **Verde:** domínio, aplicação e interface foram reunidos em JavaScript clássico, acompanhado pelos painéis HTML e CSS.
- **Manutenção:** a entrega do CodePen será atualizada junto com cada novo comportamento validado na fonte modular.

### Ciclo 5 — obstáculos

- **Vermelho:** jogador e caixa avançaram sobre a célula ocupada porque o domínio ignorava obstáculos.
- **Verde:** obstáculos passaram a fazer parte do nível e bloqueiam tanto o jogador quanto a caixa.
- **Decisão de domínio:** bordas e obstáculos usam a mesma consulta de posição livre.

### Ciclo 6 — fases aleatórias solucionáveis

- **Vermelho:** o teste falhou porque o gerador e o solucionador ainda não existiam.
- **Verde:** o gerador cria candidatos 8 × 8 e só aceita uma fase quando a busca encontra a caixa no buraco.
- **Garantia adicional:** depois de várias tentativas rejeitadas, uma fase de reserva mantém um corredor solucionável e distribui obstáculos fora dele.
- **Dificuldade:** a quantidade de obstáculos cresce gradualmente até um limite seguro.

### Ciclo 7 — progressão automática

- **Vermelho:** a sessão publicou um estado incompleto e não solicitou a fase seguinte.
- **Verde:** a sessão publica dimensões, obstáculos e fase; após a vitória, agenda a troca e solicita o próximo nível.
- **SOLID:** gerador e agendador são recebidos pela sessão. Ela não depende de `Math.random`, do navegador ou de uma implementação concreta de temporizador.

### Integração visual dos ciclos 5 a 7

- A mesa aumentou de 5 × 5 para 8 × 8.
- Jogador, caixa e buraco foram reduzidos proporcionalmente.
- Obstáculos receberam representação visual própria.
- O cabeçalho mostra o número da fase.
- Ao vencer, a mensagem é exibida e a próxima fase aparece automaticamente.
- A versão modular e os três painéis do CodePen foram mantidos equivalentes.

### Ciclo 8 — comandos estáveis da câmera

- **Vermelho:** o teste falhou porque o filtro ainda não existia.
- **Verde:** o filtro libera somente direções com confiança mínima de 80%, três previsões iguais e intervalo de 400 ms.
- **SOLID:** o filtro não conhece câmera, TensorFlow, jogo ou interface; ele recebe somente direção, confiança e tempo.

### Ciclo 9 — transferência de aprendizado no jogo

- **Vermelho:** o teste falhou porque a entrega ainda não tinha dependências, vídeo nem controles de treinamento.
- **Verde:** a interface carrega TensorFlow.js e MobileNet, captura exemplos das quatro direções, treina uma rede densa e converte previsões filtradas em movimentos.
- **Modelo:** MobileNet v2 com multiplicador 0,5 extrai características; o classificador possui uma camada oculta de 64 unidades e quatro saídas softmax.
- **Treinamento:** mínimo de 3 exemplos por classe, 20 épocas e Adam com taxa 0,0001. Recomenda-se coletar de 10 a 20 exemplos variados por direção.

### Ciclo 10 — treinamento guiado

- **Vermelho:** o teste falhou porque a regra de prontidão ainda não existia.
- **Verde:** uma regra independente exige 10 exemplos nas quatro direções e calcula o progresso total, limitado a 100%.
- **Integração planejada:** permitir segurar cada botão para coletar continuamente, mostrar contagem `x/10` e conduzir o usuário em quatro etapas claras.

### Ciclo 11 — sensibilidade dos comandos

- **Vermelho:** o teste confirmou que os padrões antigos rejeitavam duas previsões com 60%.
- **Verde:** o filtro padrão passou de 80% e três previsões para 60% e duas previsões.
- **Feedback:** a interface diferencia a previsão observada de um `Comando enviado`, facilitando verificar a ligação com o jogo.
- **Segurança:** o intervalo de 400 ms foi mantido para impedir movimentos rápidos demais.

## Controle pela câmera

O controle seguirá o exemplo oficial Webcam Pac-Man do TensorFlow.js:

1. Carregar MobileNet no navegador.
2. Ativar a webcam somente após ação do usuário.
3. Coletar exemplos visuais para cima, esquerda, baixo e direita.
4. Usar as ativações internas do MobileNet como características.
5. Treinar um pequeno classificador para as quatro direções.
6. Converter previsões estáveis em movimentos do jogo.

Imagens e exemplos permanecem na memória do navegador e não são enviados pelo projeto a um servidor.

### Como treinar

1. Clique em **1. Ativar câmera** e autorize o acesso.
2. Escolha um gesto diferente para cada direção.
3. Faça o gesto e **segure** o botão correspondente até ele mostrar `10/10`.
4. Repita até as quatro direções ficarem verdes e a barra chegar a 100%.
5. Clique em **3. Treinar controle** e aguarde as 20 épocas.
6. Quando o treino terminar, o controle por câmera começará automaticamente.
7. Use **Pausar câmera** para interromper as previsões sem desligar o jogo; o mesmo botão permite continuar.

## Como usar no CodePen

1. Crie um novo Pen.
2. Copie todo o conteúdo de `codepen/html.html` para o painel **HTML**.
3. Copie todo o conteúdo de `codepen/css.css` para o painel **CSS**.
4. Copie todo o conteúdo de `codepen/javascript.js` para o painel **JS**.
5. Não adicione bibliotecas ou preprocessadores.
6. Execute o Pen e use os botões ou as setas do teclado.

## Como executar os testes

Pré-requisito: Node.js instalado.

1. Abra o terminal nesta pasta.
2. Execute `npm test`.
3. O teste do caminho mínimo deve passar.

## Como abrir o jogo no navegador

Como a página usa módulos nativos do navegador, abra-a por um servidor local:

1. Abra o terminal nesta pasta.
2. Execute `python -m http.server 8765`.
3. Acesse `http://localhost:8765`.
4. Use os quatro botões ou as setas do teclado.
5. Pressione **Recomeçar** para restaurar a posição inicial.

Não há dependências para instalar nem processo de compilação.
