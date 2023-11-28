// // const http = require("http")
// // const fs = require("fs")
// // http.createServer((req, res) => {
// //     res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
// //     let read = fs.createReadStream(__dirname + '\\song.mp3');
// //     read.pipe(res)
// // }).listen(3000, () => console.log("listening"))

// const express = require("express")
// const app = express();
// const cors = require("cors");
// const fs = require("fs")


// const corsOptions = {
//     origin: '*',
//     credentials: true,

// }
// app.use(cors(corsOptions));
// app.get('/audio', (req, res) => {
//     console.log(req.he);
//     const range = req.headers.range;
//     const [start, end] = range.replace(/bytes=/, '').split('-').map(Number);
//     res.status(206).set({
//         'Content-Range': `bytes ${start}-${end}/${fs.statSync(__dirname + '\\song.mp3').size}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': end - start + 1,
//         'Content-Type': 'audio/mpeg',
//     })
//     let read = fs.createReadStream(__dirname + '\\song.mp3', { start, end });
//     read.pipe(res)

// }).listen(3000, () => {
//     console.log("listening");
// })
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


app.get('/arun/:id', (req, res) => {
    res.send(req.params.id);

})


try {
    io.on('connection', (socket) => {
        console.log('⚡ new user connected')
        socket.on('join_room', (data) => {
            socket.join(data.Room)
            console.log(data.Room);
        })

        socket.on('chat', (data) => {
            console.log(data);
            io.to(data.Room).emit('receive', data.val);
        })

    })

} catch (error) {

}






server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});