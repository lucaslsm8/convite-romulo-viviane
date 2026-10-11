/**
 * Recebe as respostas do questionário e grava uma linha por envio na
 * aba "Respostas" da planilha onde este script está.
 *
 * Instalação: veja apps-script/README.md
 */
const ABA = "Respostas";
const CABECALHO = ["Recebido em", "Enviado em (aparelho)", "Respondidas", "Respostas em texto", "JSON"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const dados = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(ABA);
    if (!aba) aba = planilha.insertSheet(ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHO);
      aba.setFrozenRows(1);
    }
    aba.appendRow([
      new Date(),
      dados.sentAt || "",
      (dados.respondidas || 0) + " de " + (dados.total || 0),
      dados.texto || "",
      JSON.stringify(dados.answers || {})
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Questionário Rômulo & Viviane: endpoint ativo.");
}
