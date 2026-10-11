/**
 * Recebe as respostas do questionário de Rômulo & Viviane.
 *
 * Aba "Histórico": uma linha por envio (primeiro envio e cada atualização),
 *   com data/hora e a lista de perguntas que mudaram.
 * Aba "Respostas atuais": a versão mais recente, uma pergunta por linha,
 *   com a data/hora em que cada resposta foi alterada.
 *
 * GET ?acao=ler devolve o último envio, para a página carregar as respostas
 * salvas em qualquer aparelho.
 *
 * Instalação: veja apps-script/README.md
 */
const ABA_HISTORICO = "Histórico";
const ABA_ATUAIS = "Respostas atuais";
const CAB_HISTORICO = ["Recebido em", "Tipo", "Perguntas alteradas", "Respondidas", "Respostas em texto", "JSON"];
const CAB_ATUAIS = ["Bloco", "Pergunta", "Resposta", "Alterada em", "Mudou no último envio?"];
const FUSO = "America/Sao_Paulo";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const dados = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const alteradas = dados.alteracoes || [];

    const hist = aba_(planilha, ABA_HISTORICO, CAB_HISTORICO);
    hist.appendRow([
      quando_(dados.sentAt),
      dados.tipo || "",
      alteradas.length ? alteradas.join("\n") : (dados.tipo === "Primeiro envio" ? "—" : "nenhuma"),
      (dados.respondidas || 0) + " de " + (dados.total || 0),
      dados.texto || "",
      JSON.stringify({ sentAt: dados.sentAt, answers: dados.answers, meta: dados.meta, history: dados.history })
    ]);

    const atuais = aba_(planilha, ABA_ATUAIS, CAB_ATUAIS);
    if (atuais.getLastRow() > 1) atuais.getRange(2, 1, atuais.getLastRow() - 1, CAB_ATUAIS.length).clearContent();
    const linhas = (dados.perguntas || []).map(function (p) {
      return [p.bloco, p.pergunta, p.resposta, p.alteradaEm ? quando_(p.alteradaEm) : "", alteradas.indexOf(p.pergunta) >= 0 ? "SIM" : ""];
    });
    if (linhas.length) atuais.getRange(2, 1, linhas.length, CAB_ATUAIS.length).setValues(linhas);
    atuais.getRange(1, 7).setValue("Última atualização: " + Utilities.formatDate(quando_(dados.sentAt), FUSO, "dd/MM/yyyy 'às' HH:mm"));

    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.acao === "ler") {
    const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_HISTORICO);
    if (!aba || aba.getLastRow() < 2) return json_({ ok: true, dados: null });
    const bruto = aba.getRange(aba.getLastRow(), CAB_HISTORICO.length).getValue();
    return json_({ ok: true, dados: JSON.parse(bruto) });
  }
  return ContentService.createTextOutput("Questionário Rômulo & Viviane: endpoint ativo.");
}

function aba_(planilha, nome, cabecalho) {
  let aba = planilha.getSheetByName(nome);
  if (!aba) aba = planilha.insertSheet(nome);
  if (aba.getLastRow() === 0) {
    aba.appendRow(cabecalho);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, cabecalho.length).setFontWeight("bold");
  }
  return aba;
}

function quando_(iso) {
  const d = iso ? new Date(iso) : new Date();
  return isNaN(d) ? new Date() : d;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
