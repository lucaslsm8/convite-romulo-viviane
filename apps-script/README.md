# Planilha de respostas (Google Apps Script)

## Instalação (uns 5 minutos)

1. Crie uma planilha nova no Google Sheets (ex.: "Convite R&V — respostas").
2. **Arquivo → Configurações → Fuso horário**: escolha `(GMT-03:00) Sao Paulo`.
3. Menu **Extensões → Apps Script**.
4. Apague o conteúdo do `Código.gs`, cole o conteúdo de [`Code.gs`](Code.gs) e salve.
5. **Implantar → Nova implantação**:
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Autorize quando o Google pedir. Se aparecer "Google não verificou este app", clique em **Avançado → Acessar (não seguro)**. O script é seu.
7. Copie a **URL do App da Web** (termina em `/exec`).
8. Cole essa URL em `questionario/index.html`, na linha `const SHEET_URL = "";`, depois faça o commit e o push.

## O que aparece na planilha

- **Histórico**: uma linha por envio, com a data e a hora, o tipo (primeiro envio ou atualização) e a lista das perguntas que mudaram.
- **Respostas atuais**: a versão mais recente, uma pergunta por linha, com a data e a hora em que cada resposta foi alterada. Uma coluna marca **SIM** no que mudou no último envio.

A página lê o último envio da planilha. Assim, se os noivos abrirem o link em outro aparelho, as respostas já aparecem preenchidas para eles alterarem.

> Se mudar o código do script depois, use **Implantar → Gerenciar implantações → editar → Versão: nova versão**. Assim a URL continua a mesma.
