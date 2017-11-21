var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {
        name: "Neoclassical",
        message: "Neoclassical style in music indicates a 20th-century eclectic return by some composers to various styles and forms of earlier periods, whether Classical or Baroque. The style is exemplified in the score for the ballet Pulcinella by Stravinsky or by the same composer’s opera The Rake’s Progress."
    },
    {
        name: "Mazurka",
        message: "The mazurka is a Polish dance, transformed by Chopin in some 50 piano pieces with this name."
    },
    {
        name: "Giocoso",
        message: "Giocoso (Italian: jocular, cheerful) is sometimes found as part of a tempo instruction to a performer, as in allegro giocoso (‘fast and cheerful’). The same Italian adjective is used in the descriptive title of Mozart’s opera Don Giovanni, a dramma giocoso."
    },
    {
        name: "Canzone",
        message: "A canzone is a song. In opera the word is used to indicate a song that appears as such in the dramatic context. An example might be Cherubino’s song Voi che sapete (You who know what love is) in Mozart’s Le nozze di Figaro (‘The Marriage of Figaro’)."
    }
]

app.get('/messages', (req, res) =>{
    res.send(messages)
})

app.post('/messages', (req, res) =>{
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

var PORT = process.env.PORT || 3000

var server = http.listen(PORT, () => {
    console.log('server is listening on port', server.address().port)
})

