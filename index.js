const cors = require("cors");
const express = require('express');
const fs = require('fs');
const { Server } = require("socket.io")
const { createServer } = require("http")
const bodyParser = require('body-parser')
const data = require('./song')
const app = express();
const server = createServer(app);
const path = require('path')
const port = 3000;
const corsOptions = {
    origin: '*',
    credentials: true,

}

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

app.use(bodyParser.json());
app.use(cors(corsOptions));
let start = 0;
app.use('/songs/icons', express.static(path.join(__dirname, 'songs/icons')))

app.get('/audio/:id', (req, res) => {
    if (req.headers.range) {
        start = Number(req.headers.range.replace("bytes=", "").split("-")[0]);
    }
    const audioFilePath = __dirname + "\\songs\\audio\\" + req.params.id;
    const chunkSize = 0.5 * 1024 * 1024;
    const end = Math.min(start + chunkSize, fs.statSync(audioFilePath).size - 1);

    const size = fs.statSync(audioFilePath).size
    const fileStream = fs.createReadStream(audioFilePath, { start, end });

    const headers = {
        'Content-Range': ` bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': (end - start) + 1,
        'Content-Type': 'audio/mp3',

    };
    res.writeHead(206, headers)
    fileStream.pipe(res);
});

app.get('/songData', (req, res) => {

    res.status(200).send(data)
})

app.get('/app', (req, res) => {
    res.download('./codeblocks.exe')
})
app.get('/arun/:id', (req, res) => {
    res.send(req.params.id);

})
app.get('/download/:id', (req, res) => {
    res.download(__dirname + "\\songs\\audio\\" + req.params.id)
})
app.get('/movie', (req, res) => {
    console.log("hit");
    res.download('./Departures (2008) 720p x264.AAC.mp4')
})
app.get('/p', (req, res) => {
    // console.log(req)
    // res.send("hi")
    res.download('./Inglorious Bastards.mp4')

})




try {
    io.on('connection', (socket) => {
        console.log('⚡ new user connected')
        socket.on('join_room', (data) => {

            socket.join(data.Room)
            console.log(data.Room);

        })

        socket.on('send_query', data => {

            io.to(data.Room).emit('receive_query', data.query)

        })
        socket.on('chat', (data) => {
            console.log(data);
            io.to(data.Room).emit('receive', data.val);
        })

        socket.on('play_music', data => {
            console.log(data.url);
            io.to(data.Room).emit('start_playing', data.url);
        })
    })

} catch (error) {

}






server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});