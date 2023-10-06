
const express = require("express");
const app = express();
const port = 3010;
const io = require("socket.io-client");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/pusher", function (req, res) {
    
    if (req.body?.channel && req.body?.sender) {
        const { channel, sender } = req.body;
        const socket = io("ws://localhost:3020");
        socket.emit("message", { channel, sender });
    }
  res.send("Got it");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});