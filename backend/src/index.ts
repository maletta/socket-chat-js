import { ServerApp } from "ServerApp";

;
const server = new ServerApp();


server.chatServer.appendListener('chat message', (msg: string) => {
  console.log('Nova mensagem de chat:', msg);
});

server.app.get("/", (req, res) => {
  console.log("alo http ")
  res.status(200).send("alo htto")
})


server.listen(3333)