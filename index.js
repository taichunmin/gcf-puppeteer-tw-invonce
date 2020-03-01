const puppeteer = require('puppeteer')

exports.main = async (req, res) => {
  try {
    const inv = req.query.inv
    if (!/^[a-zA-Z0-9-_]{20,}$/.test(inv)) throw new Error('inv is required.')
    const browser = await puppeteer.launch({args: ['--no-sandbox']})
    const page = await browser.newPage()
    await page.goto(`https://taichunmin.idv.tw/pug/tw-invonce.html?inv=${inv}`, { waitUntil: 'domcontentloaded' })
    const pdf = await page.pdf({ format: 'A4' })
    await browser.close()
    res.type('pdf').send(pdf)
  } catch (err) {
    res.status(500).send(err.message)
  }
}