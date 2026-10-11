# Planilha de respostas (Google Apps Script)

## Instalação (uns 5 minutos)

1. Crie uma planilha nova no Google Sheets (ex.: "Convite R&V — respostas").
2. **Arquivo → Configurações → Fuso horário**: escolha `(GMT-03:00) Sao Paulo`.
3. Menu **Extensões → Apps Script**.
4. Apague o conteúdo do `Código.gs`, cole o conteúdo de [`Code.gs`](Code.gs) e salve.
5. **Autorize primeiro pelo editor:** no topo, escolha a função `autorizar` e clique em **▶ Executar**. Aceite as permissões. Se aparecer "Google não verificou este app", clique em **Avançado → Acessar (não seguro)**. No fim, as abas *Histórico* e *Respostas atuais* aparecem na planilha.
6. **Implantar → Nova implantação**:
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
7. Copie a **URL do App da Web** (termina em `/exec`).
8. Cole essa URL em `questionario/index.html`, na linha `const SHEET_URL = "";`, depois faça o commit e o push.

## O que aparece na planilha

- **Histórico**: uma linha por envio, com a data e a hora, o tipo (primeiro envio ou atualização) e a lista das perguntas que mudaram.
- **Respostas atuais**: a versão mais recente, uma pergunta por linha, com a data e a hora em que cada resposta foi alterada. Uma coluna marca **SIM** no que mudou no último envio.

A página lê o último envio da planilha. Assim, se os noivos abrirem o link em outro aparelho, as respostas já aparecem preenchidas para eles alterarem.

> Se mudar o código do script depois, use **Implantar → Gerenciar implantações → editar → Versão: nova versão**. Assim a URL continua a mesma.

## Se aparecer "Erro 401: invalid_client" / "The OAuth client was not found"

1. Espere de 5 a 10 minutos e tente de novo. Projetos novos do Apps Script às vezes demoram para ficar prontos no Google.
2. Tente numa janela anônima, logado só na conta dona da planilha.
3. Em **Configurações do projeto** (engrenagem), confira se **não** há um projeto do Google Cloud próprio configurado. Deve estar no projeto padrão.
4. Se continuar dando erro: crie uma planilha nova e repita tudo do passo 1. Às vezes o projeto padrão nasce com problema.
