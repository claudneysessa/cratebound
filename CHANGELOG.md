# Changelog

Todas as alterações relevantes deste projeto serão registradas neste arquivo.

## 2026-07-30

### 11:02:48 -03:00

- Executados os 16 testes automatizados; todos passaram antes da preparação para publicação.
- Validada a aplicação no navegador em layouts desktop e responsivo.
- Capturadas imagens reais da interface e uma demonstração animada de uma fase concluída.
- Reestruturado o `README.md` em inglês com foco em IA aplicada, decisões de engenharia, execução, qualidade e próximos passos.
- Criada a versão completa em português no `README.pt-BR.md`.
- Adicionadas notas de arquitetura, guia de contribuição e política de segurança e privacidade.
- Configurada integração contínua para Node.js 20, 22 e 24 no GitHub Actions.
- Atualizados os metadados do projeto no `package.json`.

### 11:09:04 -03:00

- Criado e publicado o repositório público `claudneysessa/caixa-no-buraco-ai`.
- Configurados descrição, tópicos, relatório privado de vulnerabilidades e opções enxutas do repositório.
- Habilitado o GitHub Pages com HTTPS a partir da branch `main`.
- Adicionado acesso destacado à demonstração ao vivo nos dois idiomas.

### 11:27:10 -03:00

- Adicionada uma seção bilíngue que identifica as tecnologias e o papel de cada ferramenta no projeto.
- Registrada explicitamente a autoria integral e original de Claudney Sarti Sessa sobre o jogo e toda a solução.
- Removida a redação que poderia sugerir adaptação de exemplos de terceiros.
- Mantida a distinção entre autoria do projeto e titularidade das bibliotecas e plataformas utilizadas.

### 12:06:53 -03:00

- Iniciado o rebranding integral do jogo para `Cratebound`.
- Atualizados o título da aplicação modular, a versão CodePen, os metadados e a documentação bilíngue.
- Adotadas as chamadas `Teach the gesture. Guide the crate.` e `Ensine o gesto. Conduza a caixa.`.
- Preparados os novos endereços do repositório e do GitHub Pages.
- Preservado o caminho acadêmico local `D1.M2.A1` para não quebrar a organização da disciplina.

## 2026-07-29

### 20:53:45 -03:00

- Criado o `AGENTS.md` com as regras obrigatórias de registro no changelog, documentação contínua, proteção de commits e commits periódicos.
- Criado este `CHANGELOG.md` para iniciar o histórico do projeto.

### 20:55:24 -03:00

- Acrescentadas ao `AGENTS.md` as regras de TDD, SOLID, DDD, testes mínimos e documentação de cada ciclo.
- Criado o `README.md` com objetivo, arquitetura, método de desenvolvimento e instruções de teste.
- Criado o teste inicial do domínio para o caminho mínimo de sucesso: empurrar a caixa para o buraco e vencer.
- Criado o arquivo mínimo de configuração do projeto, sem dependências externas.
- Criado um hook de pré-commit que exige o `CHANGELOG.md` junto de alterações relevantes.
- Preparada a fase vermelha do primeiro ciclo; a implementação do domínio ainda não existe intencionalmente.

### 20:56:11 -03:00

- Configurado o Git para usar os hooks versionados da pasta `.githooks`.
- Executado `npm test` para a fase vermelha: 1 teste falhou porque `src/domain/game.js` ainda não existia, conforme esperado.
- Criada a implementação mínima do domínio `Game` para movimentar o jogador, empurrar a caixa alinhada e reconhecer a vitória.
- Atualizado o `README.md` com o resultado das fases vermelha e verde do primeiro ciclo.

### 20:56:35 -03:00

- Executado `npm test` para a fase verde: o teste mínimo passou com sucesso.
- Confirmado o primeiro comportamento do domínio: um movimento pode empurrar a caixa para o buraco e produzir a vitória.

### 20:57:12 -03:00

- Iniciado o segundo ciclo de TDD para levar o estado do jogo ao navegador.
- Criado primeiro o teste da sessão de aplicação, especificando publicação de estado e Reset.
- Atualizado o `README.md` com o objetivo e os limites do segundo ciclo antes da implementação.

### 20:57:43 -03:00

- Executado `npm test` para a fase vermelha do segundo ciclo: o novo teste falhou porque `src/application/game-session.js` ainda não existia.
- Criada a sessão de aplicação que coordena movimentos, Reset e publicação do estado sem depender da interface.
- Criada a primeira interface do navegador com sala 5 × 5, jogador, caixa, buraco, quatro botões direcionais, teclado, mensagem de vitória e Reset.
- Adicionado o estilo visual responsivo da primeira tela.
- Atualizado o `README.md` com o ciclo e todas as etapas para abrir e usar o jogo.

### 20:59:16 -03:00

- Executado `npm test` para a fase verde do segundo ciclo: 2 testes passaram.
- A primeira tentativa de abrir o servidor local na porta 8000 foi impedida pelo sistema.
- Iniciado o servidor local na porta 8765 e confirmado retorno HTTP 200.
- Atualizadas no `README.md` as instruções com a porta funcional.
- Aberta no navegador a primeira versão jogável da interface.

### 20:59:59 -03:00

- Iniciado o terceiro ciclo de TDD para os limites da sala.
- Criado primeiro o teste que impede o jogador de sair pelas bordas superior e esquerda.
- Documentado no `README.md` o objetivo do novo ciclo antes da implementação.

### 21:00:21 -03:00

- Executado `npm test` para a fase vermelha do terceiro ciclo: 2 testes passaram e o teste de limites falhou ao encontrar o jogador em coordenadas negativas.
- Adicionadas largura e altura ao domínio do nível.
- Implementada a regra que impede jogador e caixa de ultrapassarem as bordas.
- Configurada a interface visível como uma sala 5 × 5 também no domínio.
- Atualizado o `README.md` com o resultado e a decisão de arquitetura do ciclo.

### 21:00:44 -03:00

- Executado `npm test` para a fase verde do terceiro ciclo: os 3 testes passaram.
- Confirmada a proteção dos limites da sala antes da atualização da prévia no navegador.

### 21:03:12 -03:00

- Definido o CodePen como formato da entrega final do jogo.
- Iniciado o quarto ciclo de TDD com um teste para garantir JavaScript clássico, sem `import` ou `export`.
- Documentados no `README.md` os três arquivos finais e a separação entre fonte testável e entrega.

### 21:03:38 -03:00

- Executado `npm test` para a fase vermelha do quarto ciclo: 3 testes passaram e o teste da entrega falhou porque o JavaScript do CodePen ainda não existia.
- Criados os três arquivos da entrega final para os painéis HTML, CSS e JS do CodePen.
- Reunidos domínio, aplicação e interface em JavaScript clássico, sem módulos ou dependências externas.
- Atualizado o `README.md` com todas as etapas para copiar e executar o jogo no CodePen.

### 21:04:40 -03:00

- Executado `npm test` para a fase verde do quarto ciclo: os 4 testes passaram.
- Confirmado que o JavaScript final do CodePen não contém módulos.

### 21:05:07 -03:00

- Iniciado o quinto ciclo de TDD para obstáculos.
- Criado primeiro o teste que impede jogador e caixa de atravessarem um obstáculo.
- Documentado no `README.md` o objetivo do ciclo antes da implementação.

### 21:05:30 -03:00

- Executado `npm test` para a fase vermelha do quinto ciclo: 4 testes passaram e a colisão com obstáculo falhou.
- Adicionados obstáculos ao estado do domínio.
- Implementada uma única regra de posição livre para bloquear bordas e obstáculos.
- Atualizado o `README.md` com o resultado e a decisão do ciclo.

### 21:05:47 -03:00

- Executado `npm test` para a fase verde do quinto ciclo: os 5 testes passaram.
- Iniciado o sexto ciclo de TDD para geração aleatória de fases solucionáveis.
- Criado primeiro o teste que exige mesa 8 × 8, posições exclusivas, obstáculos e solução comprovada.
- Documentada no `README.md` a estratégia de validação por busca de estados.

### 21:06:22 -03:00

- Executado `npm test` para a fase vermelha do sexto ciclo: 5 testes passaram e o teste do gerador falhou porque ele ainda não existia.
- Criado um solucionador que explora os estados possíveis de jogador e caixa.
- Criado o gerador de fases 8 × 8 com obstáculos progressivos, posições exclusivas e validação obrigatória de solução.
- Adicionada uma fase aleatória de reserva com corredor garantido para evitar falhas de geração.
- Atualizado o `README.md` com as garantias e a progressão de dificuldade.

### 21:06:59 -03:00

- Executado `npm test` para a fase verde do sexto ciclo: os 6 testes passaram.
- Iniciado o sétimo ciclo de TDD para progressão automática de fases.
- Criado primeiro o teste que exige publicação da vitória e carregamento da fase seguinte.
- Expandida a expectativa do estado publicado para incluir dimensões, obstáculos e número da fase.
- Documentado no `README.md` o desacoplamento entre sessão, gerador e temporizador.

### 21:07:35 -03:00

- Executado `npm test` para a fase vermelha do sétimo ciclo: 5 testes passaram e 2 testes da sessão falharam por estado incompleto e ausência de progressão.
- Expandida a sessão para publicar dimensões, obstáculos e número da fase.
- Implementada a progressão agendada após a vitória com gerador e temporizador injetados.
- Bloqueados movimentos durante a transição entre fases.
- Atualizado o `README.md` com o resultado e a aplicação de inversão de dependência.

### 21:08:09 -03:00

- Executado `npm test` para a fase verde do sétimo ciclo: os 7 testes passaram.
- Aumentada a mesa visível para 8 × 8 e reduzidos jogador, caixa e buraco.
- Adicionados obstáculos visíveis e contador de fase.
- Conectados gerador, solucionador e progressão automática à interface do navegador.
- Atualizados os painéis HTML, CSS e JavaScript do CodePen com as mesmas regras e aparência.
- Atualizado o `README.md` com o novo funcionamento completo.

### 21:09:42 -03:00

- Executados os 7 testes após a integração visual; todos passaram.
- Verificada a sintaxe do JavaScript modular e do JavaScript final do CodePen sem erros.
- Preparada a atualização da página aberta no navegador.

### 21:11:23 -03:00

- Reconhecida a ausência indevida de commits periódicos durante os ciclos já concluídos.
- Adicionados os arquivos temporários do servidor local ao `.gitignore`.
- Preparado um commit de marco inicial com o estado completo e verificável do projeto.
- Definido que cada próximo ciclo verde será encerrado com seu próprio commit e registro no changelog.
- Executados os testes antes do commit de marco: os 7 testes passaram.

### 21:12:19 -03:00

- Corrigida no `AGENTS.md` a diferença entre autorização para usar Git e obrigação de incluir o changelog.
- Definido que commits periódicos pertencem ao fluxo normal e não exigem nova autorização a cada ciclo.
- Mantida a regra independente que bloqueia commits de projeto sem o `CHANGELOG.md`.
- Executados os 7 testes antes do commit da correção; todos passaram.

### 21:14:21 -03:00

- Estudado o exemplo oficial Webcam Pac-Man do TensorFlow.js e definida a adaptação para quatro direções.
- Iniciado o oitavo ciclo de TDD com o teste do filtro de comandos da câmera.
- Especificado que somente três previsões consecutivas, confiáveis e espaçadas podem produzir movimento.
- Documentados no `README.md` o fluxo de transferência de aprendizado e a privacidade dos quadros da câmera.

### 21:14:50 -03:00

- Executado `npm test` para a fase vermelha do oitavo ciclo: 7 testes passaram e o novo teste falhou porque o filtro ainda não existia.
- Criado o filtro independente `CameraCommandGate`.
- Implementados limiar de confiança, estabilidade consecutiva e intervalo mínimo entre movimentos.
- Atualizado o `README.md` com o resultado e a responsabilidade isolada do componente.

### 21:15:12 -03:00

- Executado `npm test` para a fase verde do oitavo ciclo: os 8 testes passaram.
- Preparado o commit periódico do filtro de comandos antes da integração com TensorFlow.js.

### 21:15:37 -03:00

- Criado o commit periódico `8f86504` para o filtro de comandos da câmera.
- Iniciado o nono ciclo de TDD para integrar TensorFlow.js e MobileNet.
- Criado primeiro o teste da entrega CodePen, exigindo dependências, vídeo, ativação, quatro coletores e treinamento.
- Documentado no `README.md` o objetivo da integração real.

### 21:17:40 -03:00

- Executado `npm test` para a fase vermelha do nono ciclo: 8 testes passaram e o teste da entrega com câmera falhou.
- Adicionados TensorFlow.js 4.22.0 e MobileNet 2.1.1 à página local e à entrega CodePen.
- Criado o controlador da webcam para ativação, coleta de exemplos, extração de características, treinamento e previsão contínua.
- Criado o painel visual com prévia, quatro coletores, contadores, treinamento, ativação e pausa.
- Conectadas previsões estáveis aos mesmos comandos da sessão usados por teclado e botões.
- Atualizados os três painéis do CodePen com a integração completa.
- Documentados modelo, parâmetros e todas as etapas de treinamento no `README.md`.

### 21:18:22 -03:00

- Executado `npm test` para a fase verde do nono ciclo: os 9 testes passaram.
- Verificada a sintaxe da interface modular e do JavaScript final do CodePen sem erros.
- Preparada a verificação visual do painel sem ativar a câmera do usuário.
- Atualizada a página aberta e confirmada a presença de vídeo, quatro coletores e botões de treinamento e controle.
- Verificado o carregamento da página sem erros registrados no navegador.

### 21:25:38 -03:00

- Identificada dificuldade de uso no fluxo de treinamento por cliques individuais.
- Iniciado o décimo ciclo de TDD para tornar o treinamento guiado.
- Criado primeiro o teste de prontidão com 10 exemplos por direção e cálculo de progresso total.
- Documentado no `README.md` o fluxo planejado por pressão contínua e etapas.

### 21:26:06 -03:00

- Executado `npm test` para a fase vermelha do décimo ciclo: 9 testes passaram e o novo teste falhou porque a regra ainda não existia.
- Criada a regra independente de prontidão e progresso do treinamento.
- Definido o mínimo objetivo de 10 exemplos em cada uma das quatro direções.

### 21:27:28 -03:00

- Substituída a coleta por cliques pela coleta contínua ao segurar cada botão.
- Adicionadas contagens `x/10`, estado verde por direção e barra de progresso total.
- Organizados os comandos de câmera em quatro passos numerados.
- Impedido o treinamento até que as quatro direções atinjam 10 exemplos.
- Atualizadas a interface local, a documentação e a versão final do CodePen.
- Executados os 10 testes após a integração; todos passaram.
- Verificada a sintaxe dos JavaScripts local e do CodePen sem erros.

### 21:27:47 -03:00

- Atualizada a página aberta e confirmado o fluxo visual numerado com contadores e barra de progresso.
- Preparado o commit periódico do ciclo verde de treinamento guiado.

### 21:31:43 -03:00

- Corrigido o fluxo no qual o treinamento terminava, mas o controle ainda dependia de outro clique pouco evidente.
- O controle por câmera agora começa automaticamente quando as 20 épocas terminam.
- O último botão passou a servir claramente para pausar e retomar a câmera.
- Atualizadas a interface local, a documentação e a versão do CodePen.

### 21:32:05 -03:00

- Executados os 10 testes após a correção; todos passaram.
- Verificada a sintaxe dos JavaScripts local e do CodePen sem erros.
- Preparado o commit periódico da correção do início automático.

### 21:37:07 -03:00

- Diagnosticado que as previsões eram exibidas, mas o filtro padrão impedia os movimentos.
- Iniciado o décimo primeiro ciclo de TDD para ajustar a sensibilidade.
- Criado primeiro o teste que exige movimento após duas previsões consecutivas com 60% de confiança.
- Documentado no `README.md` o ajuste planejado e a preservação do intervalo de segurança.

### 21:37:42 -03:00

- Executado `npm test` para a fase vermelha do décimo primeiro ciclo: 10 testes passaram e o novo teste de sensibilidade falhou.
- Reduzido o limite padrão de confiança de 80% para 60%.
- Reduzida a estabilidade necessária de três para duas previsões consecutivas.
- Mantido o intervalo mínimo de 400 ms entre movimentos.
- Adicionada a mensagem `Comando enviado` quando uma previsão efetivamente movimenta o jogo.
- Atualizadas a versão local, a documentação e a entrega do CodePen.

### 21:37:59 -03:00

- Executados os 11 testes após o ajuste; todos passaram.
- Verificada a sintaxe do JavaScript final do CodePen sem erros.
- Preparado o commit periódico do ciclo verde de sensibilidade.

### 21:46:53 -03:00

- Iniciado o décimo segundo ciclo de TDD para colocar treinamento e tabuleiro lado a lado.
- Criado primeiro o teste estrutural da área principal e da coluna do tabuleiro.
- Documentado no `README.md` o comportamento responsivo planejado.

### 21:47:26 -03:00

- Executado `npm test` para a fase vermelha do décimo segundo ciclo: 11 testes passaram e o novo teste estrutural falhou.
- Criadas as estruturas `play-area` e `board-column`.
- Posicionados tabuleiro e treinamento lado a lado em telas largas.
- Adicionado o retorno automático para uma coluna abaixo de 1040 px.
- Atualizadas a versão local, a documentação e a entrega do CodePen.

### 21:47:51 -03:00

- Executados os 12 testes após a reorganização; todos passaram.
- Preparada a atualização visual e o commit periódico do ciclo verde.

### 21:48:32 -03:00

- Iniciado o décimo terceiro ciclo de TDD para repetir o treinamento sem recarregar a página.
- Criado primeiro o teste que exige o botão **Novo treinamento** na entrega CodePen.
- Documentado no `README.md` o comportamento esperado de limpeza com câmera preservada.

### 21:49:12 -03:00

- Executado `npm test` para a fase vermelha do décimo terceiro ciclo: 12 testes passaram e o novo teste da entrega falhou.
- Adicionado o botão **Novo treinamento** às interfaces local e CodePen.
- Implementada a liberação dos tensores de exemplos e do classificador treinado.
- Zerados contadores, progresso e estado do controle sem desligar a câmera ou recarregar MobileNet.
- Atualizado o `README.md` com o novo fluxo.

### 21:49:23 -03:00

- Executados os 13 testes após a implementação; todos passaram.
- Verificada a sintaxe dos controladores local e CodePen sem erros.
- Preparada a atualização visual e o commit periódico do ciclo verde.

### 21:50:28 -03:00

- Inspecionado visualmente o jogo no navegador e identificado que tabuleiro e treino pareciam cartões desconectados.
- Identificado que a grade interna do treino apertava câmera, instruções e botões.
- Iniciado o décimo quarto ciclo de TDD com verificações de frame externo e divisor interno.
- Documentado no `README.md` o novo layout integrado e responsivo.

### 21:51:22 -03:00

- Executado `npm test` para a fase vermelha do décimo quarto ciclo: 12 testes passaram e o teste do frame falhou.
- Criado um único frame visual atrás do tabuleiro e do treinamento.
- Adicionado divisor vertical entre as áreas em telas largas.
- Reorganizado o treino em uma coluna com vídeo amplo e sequência linear de ações.
- Configurado divisor horizontal e controles em coluna para telas estreitas.
- Atualizadas a interface local, a documentação e a entrega CodePen.

### 21:52:14 -03:00

- Executados os 13 testes após o redesenho; todos passaram.
- Revisado visualmente o layout empilhado no tamanho padrão do navegador.
- Revisado visualmente o layout lado a lado em 1280 × 900, confirmando frame único, divisor e painel organizado.
- Restaurado o tamanho normal do navegador após a verificação responsiva.
- Preparado o commit periódico do ciclo verde.

### 22:09:16 -03:00

- Diagnosticado que um gesto mantido repetia movimentos a cada 400 ms, causando deslocamento contínuo.
- Iniciado o décimo quinto ciclo de TDD para limitar a repetição dos comandos.
- Criado primeiro o teste que impede um novo movimento antes de um segundo.
- Documentado no `README.md` o objetivo de manter resposta inicial rápida com repetição controlada.

### 22:09:48 -03:00

- Executado `npm test` para a fase vermelha do décimo quinto ciclo: 13 testes passaram e o teste de repetição falhou.
- Aumentado o intervalo padrão entre movimentos mantidos de 400 ms para 1000 ms.
- Preservados o limite de 60% e as duas previsões necessárias para o primeiro movimento.
- Atualizadas a versão local, a documentação e a entrega CodePen.

### 22:10:05 -03:00

- Executados os 14 testes após o ajuste; todos passaram.
- Verificada a sintaxe do JavaScript final do CodePen sem erros.
- Preparado o commit periódico do ciclo verde.

### 22:23:35 -03:00

- Conferida a pasta `codepen` e confirmado que os conteúdos existiam, mas os nomes dos arquivos eram pouco claros.
- Iniciado um ciclo de correção da entrega final para usar exatamente `HTML.html`, `CSS.css` e `JS.js`.
- Atualizados primeiro os testes e o `README.md` para exigir os novos nomes, preparando a fase vermelha.

### 22:24:11 -03:00

- Executado `npm test` para a fase vermelha: 13 testes passaram e a entrega falhou porque `codepen/JS.js` ainda não existia.
- Renomeados os três arquivos finais para `HTML.html`, `CSS.css` e `JS.js`.
- Mantidos os conteúdos completos e a correspondência direta com os painéis do CodePen.

### 22:25:08 -03:00

- Corrigida a tentativa de nomes que dependiam apenas de maiúsculas e minúsculas no Windows.
- Recuperados os conteúdos de HTML e CSS que haviam desaparecido durante essa tentativa.
- Adotados os nomes solicitados pelo usuário: `index.html`, `style.css` e `script.js`.
- Atualizados testes e documentação para apontar exclusivamente para os três nomes finais.

### 22:25:33 -03:00

- Confirmado que a pasta `codepen` contém exatamente os três arquivos finais solicitados.
- Executados os 14 testes; todos passaram.
- Verificada a sintaxe de `codepen/script.js` sem erros.
- Preparado o commit periódico da correção da entrega.

### 22:26:43 -03:00

- Diagnosticado que `codepen/index.html` não carregava `style.css` nem `script.js` ao ser aberto fora dos painéis do CodePen.
- Criado primeiro o teste que exige os dois vínculos relativos no HTML.
- Documentado que os três arquivos devem funcionar juntos quando mantidos na mesma pasta.

### 22:27:12 -03:00

- Executado `npm test` para a fase vermelha: 13 testes passaram e o vínculo com `style.css` não foi encontrado.
- Adicionado ao `index.html` o carregamento explícito de `./style.css`.
- Adicionado ao `index.html` o carregamento explícito e adiado de `./script.js`.

### 22:28:57 -03:00

- Executados os 14 testes; todos passaram após a inclusão dos vínculos no `index.html`.
- Verificada a sintaxe de `codepen/script.js` sem erros.
- Validada no navegador local a aplicação do `style.css`, com o tabuleiro em grade e 64 casas.
- Inspecionado o CodePen aberto: os CDNs do TensorFlow.js e MobileNet estavam presentes, mas a versão salva ainda não carregava `style.css` nem `script.js`.

### 22:35:47 -03:00

- Iniciado ciclo TDD para impedir cortes do jogo em telas estreitas.
- Criado teste que exige tabuleiro e treinamento lado a lado, tabuleiro limitado pela altura da tela e ausência do empilhamento vertical anterior.
- Executado `npm test` para a fase vermelha: 14 testes passaram e o novo teste responsivo falhou porque o painel ainda era empilhado.
- Substituído o empilhamento por duas colunas fluidas e compactas.
- Reduzidos espaçamentos, textos, botões e controles em telas estreitas.
- Limitado o tabuleiro pela altura disponível da tela.
- Documentado o novo comportamento responsivo no `README.md`.
- Na validação em 420 × 700 px, identificado excesso vertical de 6 px.
- Reduzido o preenchimento externo móvel para eliminar a pequena rolagem restante.
- A segunda medição encontrou sobra de 1 px; removido o preenchimento externo somente no menor breakpoint.

### 22:38:20 -03:00

- Executados os 15 testes; todos passaram.
- Validado no navegador em 420 × 700 px: documento e viewport ficaram com dimensões idênticas, sem rolagem horizontal ou vertical.
- Confirmadas as 64 casas do tabuleiro após a adaptação responsiva.

### 22:39:08 -03:00

- Iniciado ciclo TDD para incluir os créditos solicitados abaixo do jogo.
- Criado teste que exige o nome em destaque e a identificação da UNIPDS.
- Executado `npm test` para a fase vermelha: 15 testes passaram e o teste do rodapé falhou pela ausência dos créditos.
- Adicionado rodapé com o crédito de Claudney Sarti Sessa e a identificação da UNIPDS.
- Mantida a grade de amostras em duas colunas no menor breakpoint para liberar a altura ocupada pelo rodapé.
- Documentados os créditos no `README.md`.
- Na validação pelo navegador, identificado que o separador central poderia sofrer codificação incorreta fora do CodePen.
- Criado teste complementar exigindo uma entidade HTML segura para o separador.
- Executado `npm test` para a segunda fase vermelha: 15 testes passaram e o teste de codificação falhou.
- Substituído o caractere literal pela entidade HTML `&middot;`.

### 22:40:19 -03:00

- Executados os 16 testes; todos passaram.
- Validado o rodapé no navegador em 420 × 700 px, com o separador correto e sem rolagem horizontal ou vertical.
