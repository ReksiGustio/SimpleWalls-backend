const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const router = require('./routes')
const { strategy, serialize, deserialize } = require('./middlewares/strategy')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(cookieSession({
    name: 'simplewalls',
    keys: ['secret-new', 'secret-old'],
    maxAge: 1000 * 60 * 60
}))

//home
app.get('/', (req, res) => {
  res.send('Simple Walls Backend by Gustio. Malas ngoding frontend web atau lebih tepatnya gak ngerti')
})

//static file
app.use('/download/profile', express.static(__dirname+ '/uploads/profile'))
app.use('/download/post', express.static(__dirname+ '/uploads/post'))
app.use('/download/comment', express.static(__dirname+ '/uploads/comment'))

//passport session
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(serialize)
passport.deserializeUser(deserialize)

passport.use('local', strategy)

app.use('/', router)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})