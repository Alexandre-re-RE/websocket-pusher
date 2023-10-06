const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3010", "http://localhost:8000"],
  },
});

io.on("connection", (socket) => {
  console.log("connexion catched");

  // Gére la souscription à un canal
  socket.on("subscribe", (channel) => {
    console.log(`Le client ${socket.id} s'est abonné au canal: ${channel}`);
    socket.join(channel);
  });

  // Gére l'envoi de messages à un canal
  socket.on("message", (data) => {
    const { channel, sender } = data;
    console.log(`Push reçu sur le canal ${channel}: ${sender}`);
    // Envoye le message à tous les clients du canal
    io.to(channel).emit("message", {channel, sender});
  });

  // Gére la déconnexion du client
  socket.on("disconnect", () => {
    console.log(`Client déconnecté: ${socket.id}`);
  });
});

httpServer.listen(3020);