# Planilha de respostas (Google Apps Script)

1. Crie uma planilha nova no Google Sheets (ex.: "Convite R&V — respostas").
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo do `Código.gs` e cole o conteúdo de [`Code.gs`](Code.gs). Salve.
4. **Implantar → Nova implantação**:
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando o Google pedir. Se aparecer "Google não verificou este app", clique em **Avançado → Acessar (não seguro)**. O script é seu, então pode seguir.
6. Copie a **URL do App da Web** (termina em `/exec`).
7. Cole essa URL em `questionario/index.html`, na linha `const SHEET_URL = "";`, faça o commit e o push.

Cada vez que os noivos clicarem em "Enviar respostas", uma linha nova aparece na aba **Respostas**. A última linha é a versão mais recente.

> Se mudar o código do script depois, use **Implantar → Gerenciar implantações → editar → Nova versão** para manter a mesma URL.
