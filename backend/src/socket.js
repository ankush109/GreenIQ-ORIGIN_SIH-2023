import { Server } from "socket.io";
import http from "http"
import express from "express";

const app = express();
const server  = http.createServer(app)
const io = new Server(server,{
    cors:["http://localhost:3000"]
})

export const getReciverSocketId=(reciverId)=>{
  return socketMap[reciverId]
}
const socketMap = {}
io.on('connection',(socket)=>{
  const userId= socket.handshake.query.userId;
  console.log(userId,"socket")
  if(userId!=undefined) socketMap[userId]=socket.id
  console.log(socketMap,"socket map..")
  io.emit("getOnlineUsers",Object.keys(socketMap))
 console.log("a user connected ",socket.id)
 socket.on('disconnected',()=>{
   delete socketMap[userId]
   console.log("user disconnected")
})
})
export {app,io,server}