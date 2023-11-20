const http = require("http")
const fs = require("fs")
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
    let read = fs.createReadStream(__dirname + '\\song.mp3');
    read.pipe(res)
}).listen(3000, () => console.log("listening"))