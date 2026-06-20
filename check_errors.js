const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    console.log('Page loaded successfully.');
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
