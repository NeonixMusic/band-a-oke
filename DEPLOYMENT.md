# Bandeoki Deployment Instructions

## Quick Setup Guide for Your Live Show

### Step 1: Set up Formspree (FREE Email Backend)
1. Go to [formspree.io](https://formspree.io) and sign up for a free account
2. Create a new form and copy your form ID (it looks like `xpznvkqw`)
3. In `scripts/main.js`, replace `YOUR_FORM_ID` with your actual form ID:
   ```javascript
   fetch('https://formspree.io/f/xpznvkqw', {  // Replace with your ID
   ```
4. You'll receive nominations via email in real-time!

### Step 2: Deploy to GitHub Pages
1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Setup bandeoki nomination system"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. Your site will be available at: `https://neonixmusic.github.io/band-a-oke/`

### Step 3: Create QR Code
1. Use any free QR code generator (qr-code-generator.com, qr.io, etc.)
2. Enter your GitHub Pages URL: `https://neonixmusic.github.io/band-a-oke/`
3. Download and print the QR code for your audience

### What Happens When Someone Submits:
- You'll receive an email with:
  - Song choice
  - Person's name
  - Additional names (if any)
  - Timestamp
- The person sees a confirmation message
- Form resets for next person

### Live Show Tips:
- Test the form before your show
- Have the QR code prominently displayed
- Check your email during breaks for nominations
- Consider having a backup phone/tablet ready

### Troubleshooting:
- If songs don't load: Check that `songlist.json` is accessible
- If form doesn't submit: Verify your Formspree form ID
- If QR code doesn't work: Double-check your GitHub Pages URL

That's it! Your bandeoki nomination system is ready to rock! 🎤🎸