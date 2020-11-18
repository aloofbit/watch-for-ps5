const log = console.log
const chalk = require('chalk')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// start up a puppeteer browser
puppeteer.launch({ args: ['--no-sandbox'], headless: true }).then(async browser => {
  log('hi! this program will check if PS5 is available on sites every 30 seconds')
  setInterval(async () => checkAvailableAndOutputResults(browser), 30000)
  await checkAvailableAndOutputResults(browser)
});

// call site checks here
async function checkAvailableAndOutputResults(browser) {
  log('------------------------')
  const page = await browser.newPage()
  
  // duplicate this to if adding more sites
  log(`Walmart - ${await checkIfAvailableonWalMart(page) ? chalk.green('AVAILABLE') : chalk.red('UNAVAILABLE') }`)
}

// walmart check (duplicate this function and rename to add more sites)
async function checkIfAvailableonWalMart(page) {
  const pageUrl = 'https://www.walmart.com/ip/PlayStation5-Console/363472942'
  const buttonElement = '.prod-ProductCTA--primary'

  page.setJavaScriptEnabled(false) // to stop captcha evil meanies
  await page.goto(pageUrl)
  const buttonAvailable = await page.$(buttonElement) 
  
  return buttonAvailable ? true : false
}