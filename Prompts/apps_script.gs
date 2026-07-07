// Web AI Content System - Apps Script
// Paste into Extensions -> Apps Script in Google Sheets
const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your API key
const GEMINI_MODEL = "models/gemini-1.5-mini";

function runAIContentLoop() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  for (let r = 1; r < values.length; r++) {
    try {
      const page = values[r][0];
      const mainKW = values[r][1];
      const subKW = values[r][2];
      const wordLimit = values[r][6] || 2000;
      const prevScore = values[r][9] || 0;
      if (!page || prevScore >= 95) continue;
      const masterPrompt = `You are the MASTER SEO AGENT for GEM Gujarat.
Write a ${wordLimit}-word SEO-optimized page for: ${page}.
Main Keyword: ${mainKW}
Sub Keywords: ${subKW}
Include: H1 and intro, H2 sections (What, Process, Benefits, FAQs, CTA), Schema suggestions, Internal linking ideas, Local focus (Ahmedabad), conversational professional tone.
Return a JSON object with keys: content (markdown), score (0-100), feedback (short).`;
      const masterResp = callGeminiAPI(masterPrompt);
      const masterJson = safeParseJSON(masterResp);
      let content = masterResp;
      let score = 0;
      let feedback = '';
      if (masterJson) {
        content = masterJson.content || masterResp;
        score = masterJson.score || 0;
        feedback = masterJson.feedback || '';
      }
      sheet.getRange(r+1, 8).setValue("V1");
      sheet.getRange(r+1, 9).setValue(content);
      sheet.getRange(r+1, 10).setValue(score);
      sheet.getRange(r+1, 11).setValue(feedback);
      if (score < 95) {
        const improvePrompt = `You are the IMPROVEMENT AGENT. Improve the content to reach score 95 based on feedback: ${feedback}. Content: ${content}. Return JSON with keys: content and score.`;
        const improveResp = callGeminiAPI(improvePrompt);
        const improveJson = safeParseJSON(improveResp);
        if (improveJson) {
          const content2 = improveJson.content || content;
          const score2 = improveJson.score || score;
          sheet.getRange(r+1, 8).setValue("V2");
          sheet.getRange(r+1, 9).setValue(content2);
          sheet.getRange(r+1, 10).setValue(score2);
        }
      }
      SpreadsheetApp.flush();
      Utilities.sleep(1200);
    } catch (e) {
      Logger.log('Error row ' + (r+1) + ': ' + e);
    }
  }
}

function callGeminiAPI(promptText) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/' + GEMINI_MODEL + ':generateText?key=' + GEMINI_API_KEY;
  const payload = { prompt: { text: promptText }, maxOutputTokens: 3000 };
  const options = { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true };
  const resp = UrlFetchApp.fetch(url, options);
  const txt = resp.getContentText();
  return txt;
}

function safeParseJSON(text) {
  try { return JSON.parse(text); } catch(e) {
    const m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try { return JSON.parse(m[0]); } catch(e) { return null; }
    }
    return null;
  }
}
