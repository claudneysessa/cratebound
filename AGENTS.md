# Regras de trabalho do projeto

Estas regras são obrigatórias para qualquer pessoa ou agente que trabalhe neste repositório.

## Registro das alterações

- Toda alteração executada no projeto deve ser registrada no `CHANGELOG.md`.
- Cada registro deve conter a data e a hora locais, com o fuso horário.
- O registro deve explicar de forma curta o que foi criado, alterado, removido ou executado.
- O `CHANGELOG.md` deve ser atualizado no mesmo conjunto de alterações do trabalho realizado.

## Git e commits

- O histórico do Git deve respeitar e refletir o `CHANGELOG.md`.
- É proibido criar um commit que contenha alterações de projeto sem a entrada correspondente no `CHANGELOG.md`.
- O repositório deve possuir um hook que impeça commits quando houver alterações relevantes sem atualização do `CHANGELOG.md`.
- O hook deve ser configurado antes do primeiro commit de implementação.
- Commits devem ser pequenos, periódicos e representar etapas funcionais ou marcos claros.
- Antes de cada commit, verificar se o código funciona, se o `README.md` está atualizado e se o `CHANGELOG.md` descreve a etapa.
- Os commits periódicos fazem parte do fluxo normal deste projeto e não exigem uma nova autorização a cada ciclo.
- A exigência de atualizar o `CHANGELOG.md` é uma proteção de integridade do histórico e não uma regra de autorização.

## README

- O `README.md` deve documentar o projeto desde o início.
- As instruções devem ser escritas em ordem, sem omitir etapas necessárias para executar, testar ou compreender o projeto.
- Sempre que uma mudança alterar a instalação, a execução, os controles, as regras ou a estrutura do projeto, o `README.md` deve ser atualizado no mesmo conjunto de alterações.

## Fluxo obrigatório

1. Definir a pequena etapa de trabalho.
2. Escrever primeiro o menor teste que descreva o comportamento desejado.
3. Executar o teste e confirmar que ele falha pela razão esperada (fase vermelha).
4. Implementar somente o necessário para o teste passar (fase verde).
5. Refatorar preservando os testes e os princípios SOLID e DDD.
6. Adicionar os comportamentos complementares em novos ciclos vermelho-verde-refatoração.
7. Atualizar o `README.md` sem omitir decisões ou etapas.
8. Registrar comandos, testes e alterações no `CHANGELOG.md` com data e hora.
9. Criar um commit periódico ao concluir o ciclo verde.
10. Confirmar que o hook de proteção permite o commit.

## Arquitetura e qualidade

- O desenvolvimento deve seguir TDD: teste falhando, implementação mínima, teste passando e refatoração.
- O primeiro ciclo deve cobrir apenas o caminho mínimo de sucesso.
- Casos complementares e restrições devem ser adicionados depois, um comportamento por ciclo.
- O domínio do jogo deve permanecer independente da interface do navegador.
- Os nomes do domínio devem representar a linguagem do jogo: sala, jogador, caixa, obstáculo, buraco, movimento e vitória.
- Aplicar SOLID de forma proporcional ao tamanho do projeto, evitando abstrações sem necessidade.
- Regras de negócio não devem depender do HTML, dos botões nem do teclado.
- Toda decisão de arquitetura e cada ciclo de TDD devem ser documentados no `README.md` e no `CHANGELOG.md`.
