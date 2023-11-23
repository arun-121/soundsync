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

const app = express();
const port = 3000;
const corsOptions = {
    origin: '*',
    credentials: true,

}
console.log(fs.statSync(__dirname + '\\song.mp3').size);
app.use(cors(corsOptions));
let start = 0;
app.get('/audio', (req, res) => {
    const audioFilePath = __dirname + '\\song.mp3';
    if (req.headers.range) {
        start = Number(req.headers.range.replace("bytes=", "").split("-")[0]);
    }
    console.log(start);
    const chunkSize = 1024;
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});