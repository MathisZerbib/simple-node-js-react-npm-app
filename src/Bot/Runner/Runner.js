const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://levictorhugo.tv/events/')
  .wait(5000)
  .inject("js", __dirname+'/../Victor_Hugo_Nimes.js')
  .evaluate(() => {return get_pageinfo()})
  .end()
  .then((result)=>{ console.log(result) })
  .catch(error => {
    console.error('Search failed:', error)
  })