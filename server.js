const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Sending a message to the client
  ws.send('Welcome Simple Message Server!');

  // Listening for messages from the client
  ws.on('message', (raw_data) => {
    const payload = JSON.parse(raw_data) 
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`<b>${payload.name}</b>: ${payload.message}`);
      }
    });
  });

  // Handling client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');