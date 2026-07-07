Web AI Content System - GEM Gujarat
Files included:
1) Web_AI_Content_System_Template.xlsx  (Google Sheet template - upload to Drive)
2) apps_script.gs  (Apps Script to paste into Extensions -> Apps Script)
3) README_Web_AI_Content_System.txt  (this file)

Quick setup:
- Upload the Excel to Google Drive and open with Google Sheets.
- In Google Sheets, go to Extensions -> Apps Script. Create a new project and paste the contents of apps_script.gs.
- Replace GEMINI_API_KEY with your Generative Models API key.
- Save and Run runAIContentLoop() once to authorize permissions.
- Populate columns: Page Name, Main Keyword, Sub Keywords, Word Limit (optional) and run the script.
- Output appears in 'Final Content' column.

Security note: For production, consider proxying the API request through a secure backend (do not expose API key in client-side scripts).
