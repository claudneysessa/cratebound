# Changelog

Todas as alterações relevantes deste projeto serão registradas neste arquivo.

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
