const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

console.log(path.resolve(__dirname, '../dist/ktimer.js'), '-->', path.resolve(__dirname, './public/js/ktimer.js'))

fs.copyFileSync(path.resolve(__dirname, '../dist/ktimer.js'), path.resolve(__dirname, './public/js/ktimer.js'))

// fs.unlinkSync(path.resolve(__dirname, '../dist/ktimer.js'))

// console.log('remove: ', path.resolve(__dirname, '../dist/ktimer.js'))

app.use(express.static(path.resolve(__dirname, './public')))

app.get('/', (req, res) => {
  res.redirect('/index.html')
})

app.listen(10099, () => console.log('Example server start on port 10099'))