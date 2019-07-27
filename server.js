const express = require('express')
const app = express()

const { LargePlayListRouter } = require('./controllers/LargePlaylist.js')

// middleware for handling requests and data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(`${__dirname}/client/build`))

//handles routes to LargePlaylist API
app.use('/api/tracks', LargePlayListRouter)

// catches all other files
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

//Setup port to host database
const PORT = process.env.PORT || 3001

//Listen on port for requests
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
