
const SHEET_NAME = "respostas";
const HEADERS = ["id","evento","empresa","data_hora","nome","whatsapp","cargo","loja_regiao","sentimento_ia","preparo_ia","uso_ia","desafio_comunicacao","limite_ia","jogada37","aceite_participacao","aceite_whatsapp","origem"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const payload = body.payload || {};
    saveRow(payload);
    return jsonResponse({ ok: true, message: "Resposta registrada." });
  } catch (err) {
    return jsonResponse({ ok: false, message: err.message });
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action || "summary";
    if (action === "summary") return jsonResponse({ ok: true, summary: buildSummary(getRows()) });
    if (action === "list") return jsonResponse({ ok: true, rows: getRows() });
    return jsonResponse({ ok: false, message: "Ação inválida." });
  } catch (err) {
    return jsonResponse({ ok: false, message: err.message });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (firstRow.join("") === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveRow(payload) {
  const sheet = getSheet();
  sheet.appendRow(HEADERS.map(h => payload[h] || ""));
}

function getRows() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  return values.map(row => {
    const obj = {};
    HEADERS.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function buildSummary(rows) {
  const sentimentScores = {"Animação":2,"Curiosidade":1,"Neutro":0,"Dúvida":-1,"Cautela":-1,"Preocupação":-2,"Medo":-2};
  const phones = {};
  rows.forEach(r => { if (r.whatsapp) phones[r.whatsapp] = true; });
  const sentimentos = rows.map(r => r.sentimento_ia);
  const scoreList = sentimentos.map(v => sentimentScores[v] || 0);
  const sentimentoMedio = average(scoreList);
  let leitura = "neutro";
  if (sentimentoMedio >= 1) leitura = "positivo";
  if (sentimentoMedio > 0 && sentimentoMedio < 1) leitura = "curioso com cautela";
  if (sentimentoMedio < 0 && sentimentoMedio > -1) leitura = "cauteloso";
  if (sentimentoMedio <= -1) leitura = "preocupado";
  return {
    totalParticipantes: Object.keys(phones).length || rows.length,
    totalRespostas: rows.length,
    sentimentoPredominante: mode(sentimentos),
    sentimentoMedio: round2(sentimentoMedio),
    leituraSentimento: leitura,
    mediaPreparo: round2(average(rows.map(r => Number(r.preparo_ia || 0)).filter(n => !isNaN(n)))),
    principalUsoIA: mode(rows.map(r => r.uso_ia)),
    principalDesafio: mode(rows.map(r => r.desafio_comunicacao)),
    principalLimite: mode(rows.map(r => r.limite_ia)),
    porSentimento: countBy(sentimentos),
    porUsoIA: countBy(rows.map(r => r.uso_ia)),
    porDesafio: countBy(rows.map(r => r.desafio_comunicacao)),
    porLimite: countBy(rows.map(r => r.limite_ia)),
    respostasAbertas: rows.map(r => r.jogada37).filter(String)
  };
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((a,b) => a + b, 0) / values.length;
}

function round2(value) { return Math.round(value * 100) / 100; }

function countBy(values) {
  const out = {};
  values.filter(String).forEach(v => out[v] = (out[v] || 0) + 1);
  return out;
}

function mode(values) {
  const counts = countBy(values);
  let best = "-";
  let bestCount = 0;
  Object.keys(counts).forEach(k => {
    if (counts[k] > bestCount) {
      best = k;
      bestCount = counts[k];
    }
  });
  return best;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
