import * as puppeteer from 'puppeteer'
import { Browser, Page } from 'puppeteer'

main().then(cleanUp).catch(onError).finally(onFinish)

async function main() {
    console.log(`hello world`)
    const urlArgs = process.argv.slice(2)
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(urlArgs[0] || 'https://hello.dubsado.com')
    await page.waitForNavigation()
    await login(page)
    return browser
}

async function login(page: Page) {
    // const element = await page.$('[data-form-field-value="244103310504090"]')
    await page.$eval('#email', (el: any) => (el.value = 'test@example.com'))
    await page.click(`[ui-sref="login.signup"]`)
}

async function cleanUp(browser: Browser) {
    // await browser.close()
}

function onError(error) {
    console.error(error)
}

function onFinish() {
    console.log(`We've exited the program!`)
}
