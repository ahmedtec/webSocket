import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port:8082});

wss.on('connection' , ws =>{
  console.log('New client connected');

  ws.on('close' , ()=>{
    console.log('client has disconnected');
  })
  
  ws.on('message', (message,isBinary) => {
    [...wss.clients]
      .filter(c => c !== ws)
      .forEach(c => c.send(isBinary ? message.toString() : message));
      ws.send(isBinary ? message.toString() : message)
  });
})