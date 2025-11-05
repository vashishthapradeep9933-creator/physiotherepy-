# Physio Connect – Admin + Bookings + Webhooks + ICS

## Run
```
npm install
npm run dev
```
Open http://localhost:3000

## Admin
- /admin (password: `physio@123` – change in `app/admin/page.js`)
- /admin/bookings for tracking (search, filter, status, CSV, WhatsApp/Call, delete)

## Booking → External Integrations
The booking form now sends data to:
1) **Google Sheet (Apps Script)** – set `NEXT_PUBLIC_APPS_SCRIPT_URL`
2) **Zapier/Make webhook** – set `NEXT_PUBLIC_ZAPIER_WEBHOOK`
3) **Supabase table** (optional) – set `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Create `.env.local`:
```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
NEXT_PUBLIC_ZAPIER_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxx/yyyy
NEXT_PUBLIC_SUPABASE_URL=https://YOUR.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Google Sheet (Apps Script)
- Create a Sheet ➜ `Extensions → Apps Script`:
```js
function doPost(e){
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('Bookings') || ss.insertSheet('Bookings');
  var data = JSON.parse(e.postData.contents);
  var headers = ['id','createdAt','status','name','phone','email','issue','date','time','mode','startISO','endISO','source'];
  if (sh.getLastRow() == 0) sh.appendRow(headers);
  var row = headers.map(h => data[h] || '');
  sh.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
```
- `Deploy → New deployment → Web app → Execute as Me, Anyone can access`
- Copy the URL to `.env.local` as `NEXT_PUBLIC_APPS_SCRIPT_URL`

### Zapier/Make
- Create a **Catch Hook**.
- Map the incoming JSON to: Gmail/Slack/SMS/Twilio etc.

### Supabase
- Create table `bookings` with columns:
  `id:text primary key`, `createdAt:timestamptz`, `status:text`, `name:text`, `phone:text`, `email:text`, `issue:text`, `date:text`, `time:text`, `mode:text`, `startISO:timestamptz`, `endISO:timestamptz`, `source:text`
- Enable `Anon` insert (RLS with insert policy for anon).
- Put URL & ANON KEY in `.env.local`.

## Calendar (.ics)
- On successful booking, a **consultation.ics** file auto-downloads for the patient. They can add it to their calendar (Google/Apple/Outlook).

## Deploy to Vercel
- Push to GitHub → Import to Vercel → Add the same env vars in **Project Settings → Environment Variables** → Deploy.

## Doctor Photo
- Place `public/doctor.jpg` or set a remote URL in Admin → Business → photo.

## Notes
- Local prototype uses `localStorage` for quick testing. Webhooks/Supabase make it production-ready.
