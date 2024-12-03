const { google } = require('googleapis');
const path = require('path');

// Path to your service account key file
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'service-account-key.json');

// The ID of your Google Sheet
const SHEET_ID = 'YOUR_SHEET_ID'; // Replace with your Google Sheet ID

// The range of cells to read (e.g., "Sheet1!A1:E10")
const RANGE = 'Sheet1!A1:E10';

// Function to authenticate and fetch data
async function readGoogleSheet() {
  try {
    // Authenticate with the service account
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Create the Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch the data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    // Log the data to the console
    const rows = response.data.values;
    if (rows.length) {
      console.log('Data from the sheet:');
      rows.forEach((row) => {
        console.log(row);
      });
    } else {
      console.log('No data found in the specified range.');
    }
  } catch (error) {
    console.error('Error reading Google Sheet:', error.message);
  }
}

// Call the function
readGoogleSheet();