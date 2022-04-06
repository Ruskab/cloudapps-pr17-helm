import expressWs from 'express-ws';
import DebugLib from 'debug';

const debug = new DebugLib('server:ws');

const usersWs = new Map();

export let wsServer;

export function createWsServer(server, path) {
  wsServer = expressWs(server).getWss(path);
  server.ws(path, wsRouter);
}

function wsRouter(ws, req) {
  debug('user connected', req.headers['sec-websocket-key']); 
  //Using sec-websocket-key header to give every user a uniqueId.
  usersWs.set(req.headers['sec-websocket-key'], ws);
  ws.send(JSON.stringify({ 'user-key': req.headers['sec-websocket-key'] }));
}

export function sentToUser(userId, message){
  let ws = usersWs.get(userId);
  ws.send(JSON.stringify(message));
}

export function sentToAllUsers(message){
  wsServer.clients.forEach(ws => {
    ws.send(JSON.stringify(message));
  });
}