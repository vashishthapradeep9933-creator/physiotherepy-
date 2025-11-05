
# Deploy to Vercel (Starter – Free Only)

## 1) Push or Upload
- Option A (GitHub): Create a new GitHub repo and push this folder.
- Option B (Direct): On Vercel, click **Add New → Project → Import** and upload this folder as a zip.

## 2) Framework
- Vercel will auto-detect **Next.js**

## 3) Environment Variables
Add these in **Vercel → Project → Settings → Environment Variables**:
- `NEXT_PUBLIC_APPS_SCRIPT_URL` = (Google Apps Script Web App URL)
- `NEXT_PUBLIC_CALENDLY_URL` = (optional)
- `NEXT_PUBLIC_UPI_VPA` = `drgargi@upi`
- `NEXT_PUBLIC_UPI_NAME` = `Dr Gargi Jaimini`

## 4) Build & Deploy
- Build Command: `next build` (auto-set)
- Output: `.next` (auto-set)
- Hit **Deploy**

## 5) After Deploy – Quick Test
- Open `/` → Submit a booking (test phone/email)
- Confirm:
  - WhatsApp opens with prefilled message
  - `.ics` downloads
  - Admin `/admin/bookings` shows the new booking
  - If `NEXT_PUBLIC_APPS_SCRIPT_URL` is set → Row appears in your Google Sheet

## Admin Routes
- `/admin` (password in `app/admin/page.js`, default `physio@123`)
- `/admin/bookings`

## Notes
- This **Starter** build uses only free tools (Google Sheets + WhatsApp + ICS).
- Later you can swap to the **Ultimate** build for Supabase/Zapier/Make if needed.
