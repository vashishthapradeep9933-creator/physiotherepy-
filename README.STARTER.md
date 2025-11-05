# Physio Connect – Starter (FREE Only)

This build uses **only free tools**: Google Sheets (Apps Script) + WhatsApp + Calendar (.ics) + local tracking.

## Run
```
npm install
npm run dev
# open http://localhost:3000
```
Admin: `/admin` (password in `app/admin/page.js` – default `physio@123`)  
Bookings Dashboard: `/admin/bookings`

## Connect Google Sheet (FREE)
1. Create a sheet → **Extensions → Apps Script** and paste:
```js
function doPost(e){
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');
  var data = JSON.parse(e.postData.contents);
  var headers = ['id','createdAt','status','name','phone','email','issue','date','time','mode','startISO','endISO','source'];
  if (sh.getLastRow() == 0) sh.appendRow(headers);
  sh.appendRow(headers.map(h => data[h] || ''));
  // Optional: auto-email patient and you
  if (data.email){ MailApp.sendEmail(data.email, 'Your Physio Booking Received', 'Thanks '+(data.name||'')+', your consultation request has been received. We will confirm on WhatsApp.'); }
  MailApp.sendEmail('physio0305@gmail.com', 'New Booking – ReliefCare', JSON.stringify(data, null, 2));
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
```
2. **Deploy → New deployment → Web app** → Execute as **Me**, Who has access **Anyone**.  
3. Copy the URL into `.env.local`:
```
NEXT_PUBLIC_APPS_SCRIPT_URL=PASTE_WEB_APP_URL_HERE
```
(If no env set, website still works with local tracking + WhatsApp + ICS.)

## Optional: Calendly
Set in `.env.local`:
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-page
```

## Payments / UPI
- Replace `public/upi-qr.png` with your real QR.
- Change UPI ID text in `app/page.js` (search `UPI ID:`).
- Add UPI intent links later if needed.

## Admin Upgrades
- Export bookings **CSV**, **JSON**
- Import bookings **JSON**
- Duplicate booking guard (same phone+date)
- Spam honeypot to block bots
- Success toast

## Notes
- This starter build removes Zapier/Supabase to keep everything free.
- You can later swap to the **Ultimate** build for advanced features.
