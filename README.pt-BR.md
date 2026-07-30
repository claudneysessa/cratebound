<div align="center">

# Cratebound

### Ensine o gesto. Conduza a caixa.

[![CI](https://github.com/claudneysessa/cratebound/actions/workflows/ci.yml/badge.svg)](https://github.com/claudneysessa/cratebound/actions/workflows/ci.yml)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?logo=tensorflow&logoColor=fff)](https://www.tensorflow.org/js)
[![Testes](https://img.shields.io/badge/testes-10%20aprovados-72d892)](#engenharia-de-qualidade)

[Jogar agora](https://claudneysessa.github.io/cratebound/) · [English](README.md) · [Arquitetura](docs/ARCHITECTURE.md) · [Como contribuir](CONTRIBUTING.md)

![Cratebound em execução no navegador](docs/assets/gameplay.gif)

</div>

## Por que este projeto existe

Inteligência artificial gera mais valor quando é tratada como um componente de
engenharia, e não apenas como um efeito de demonstração.

**Cratebound** investiga essa ideia com um problema pequeno e visual:
empurrar uma caixa até um buraco em salas geradas proceduralmente. Além dos
controles convencionais, o jogador pode treinar no próprio navegador um
classificador que aprende quatro gestos escolhidos por ele.

O ponto central não é somente fazer o modelo funcionar. As regras do jogo
permanecem independentes do TensorFlow.js, da webcam, do teclado e do DOM. A IA
é um adaptador de entrada entre vários possíveis — não é a arquitetura inteira.

> Este repositório foi criado como experimento aplicado durante uma
> pós-graduação em Engenharia de Software com IA Aplicada.

## Principais diferenciais

- **Gestos personalizados:** o navegador aprende os gestos do jogador em vez de
  impor um vocabulário fixo.
- **Transferência de aprendizado local:** o MobileNet extrai características e
  um pequeno classificador aprende quatro direções no navegador.
- **Fases procedurais solucionáveis:** uma busca valida cada sala 8 × 8 antes de
  ela ser apresentada.
- **Domínio independente:** movimento, colisão, vitória e geração de fases não
  dependem de APIs do navegador.
- **Evolução dirigida por testes:** os comportamentos nasceram em ciclos curtos
  de vermelho–verde–refatoração.
- **Sem etapa de build:** a aplicação modular usa ES Modules nativos.

## Demonstração

Esta animação foi capturada em uma execução real. O jogador se posiciona,
empurra a caixa até o buraco e aciona a próxima fase.

[**Abrir a demonstração HTTPS →**](https://claudneysessa.github.io/cratebound/)

![Partida real concluindo uma fase](docs/assets/gameplay.gif)

<details>
<summary><strong>Experiência no desktop</strong></summary>

![Layout desktop com jogo e treinamento de gestos](docs/assets/game-overview.png)

</details>

<details>
<summary><strong>Experiência responsiva</strong></summary>

![Layout em uma tela estreita](docs/assets/game-mobile.png)

</details>

## Como a IA aplicada funciona

1. O jogador ativa a webcam de forma explícita.
2. O MobileNet v2 funciona como extrator de características congelado.
3. O jogador coleta ao menos dez exemplos para cada direção.
4. Um classificador denso compacto é treinado por 20 épocas no navegador.
5. As previsões passam por regras de confiança, estabilidade e intervalo.
6. As previsões aceitas viram os mesmos comandos usados pelo teclado e pelos
   botões.

As amostras de treinamento e previsões permanecem na memória do navegador. O
projeto não envia imagens para um servidor da aplicação.

## Abordagem de engenharia

| Camada | Responsabilidade | Independente do navegador |
| --- | --- | :---: |
| `domain` | Movimento, colisões, vitória e geração solucionável | Sim |
| `application` | Sessão, progresso e política de comandos da câmera | Sim |
| `interface` | DOM, teclado, botões e webcam | Não |

Essa fronteira mantém as regras rápidas de testar e impede que o TensorFlow.js
se espalhe pelo código. Consulte as
[notas de arquitetura](docs/ARCHITECTURE.md) para conhecer decisões e
trade-offs.

## Engenharia de qualidade

Os testes automatizados cobrem:

- empurrar a caixa e reconhecer a vitória;
- limites da sala e colisões com obstáculos;
- geração procedural solucionável;
- reset e progressão das fases;
- prontidão do treinamento de gestos;
- confiança, estabilidade e repetição das previsões;
- limites dos comandos da câmera e prontidão do treinamento.

```bash
npm test
```

Resultado esperado: **10 testes aprovados** com o test runner nativo do Node.js.
O GitHub Actions executa a suíte a cada envio e pull request.

## Executar localmente

Pré-requisitos:

- navegador moderno;
- Node.js 20+ para executar os testes;
- Python 3 ou qualquer servidor HTTP estático para servir os módulos nativos.

```bash
git clone https://github.com/claudneysessa/cratebound.git
cd cratebound
python -m http.server 8765
```

Acesse `http://localhost:8765`.

Não há instalação de dependências nem processo de build. O primeiro
carregamento precisa de internet para obter TensorFlow.js e MobileNet pelo
jsDelivr. A webcam exige permissão explícita e funciona em `localhost` ou em uma
origem HTTPS segura.

## Treinar os controles

1. Selecione **Ativar câmera** e permita o acesso.
2. Escolha um gesto diferente para cada direção.
3. Segure cada botão até atingir `10/10`.
4. Selecione **Treinar controle** e aguarde as 20 épocas.
5. Jogue com os gestos; pause as previsões ou comece outro treinamento quando
   desejar.

O teclado e os botões visuais continuam disponíveis.

## Tecnologias utilizadas

| Tecnologia | Papel no projeto |
| --- | --- |
| [HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML) | Estrutura semântica, controles, vídeo e contratos de acessibilidade |
| [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) | Sistema visual e layout responsivo |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Domínio, aplicação e navegador com ES Modules nativos |
| [TensorFlow.js 4.22](https://www.tensorflow.org/js) | Treinamento e inferência executados no navegador |
| [MobileNet 2.1.1](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) | Extrator de características pré-treinado para transferência de aprendizado |
| [Test runner do Node.js](https://nodejs.org/api/test.html) | Testes automatizados sem dependências |
| [GitHub Actions](https://github.com/features/actions) | Integração contínua em versões suportadas do Node.js |
| [GitHub Pages](https://pages.github.com/) | Hospedagem HTTPS gratuita da aplicação |

Essas tecnologias são ferramentas de terceiros utilizadas na construção e
entrega do projeto. Conceito, jogo, código-fonte, arquitetura, interface, testes
e documentação são trabalhos originais de autoria de Claudney Sarti Sessa.

## Estrutura do projeto

```text
.
├── src/
│   ├── domain/          # Regras puras e geração de fases
│   ├── application/     # Orquestração e políticas de entrada
│   └── interface/       # Adaptadores do navegador e da webcam
├── test/                # Testes nativos do Node.js
├── docs/                # Arquitetura e mídia
├── index.html
└── styles.css
```

## Próximos passos

- Adicionar sementes determinísticas para compartilhar e repetir fases.
- Persistir metadados opcionais do treinamento sem armazenar frames da câmera.
- Tornar os limites de confiança configuráveis e acessíveis por teclado.
- Ampliar os testes de navegador do fluxo completo de treinamento.
- Exibir métricas de desempenho depois de cada treinamento personalizado.

## Sobre o autor

Desenvolvido por **Claudney Sarti Sessa**, Analista de Sistemas e graduado em
Sistemas de Informação, com pós-graduações em Big Data & Analytics e Engenharia
de Software, atualmente se especializando em Engenharia de Software com IA
Aplicada.

[Perfil no GitHub](https://github.com/claudneysessa)

## Autoria

**Cratebound é um projeto original, integralmente criado e desenvolvido por
Claudney Sarti Sessa.** Não é clone, cópia ou adaptação de outro jogo ou
aplicativo. As bibliotecas e plataformas de terceiros estão identificadas na
seção de tecnologias e preservam suas respectivas titularidades e licenças.

---

<div align="center">
  <sub>Construído para conectar IA aplicada a um design de software sustentável.</sub>
</div>
