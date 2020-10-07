const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/public/index.html');
});

app.get('/room1', (req, res) => {
  res.sendFile(__dirname +'/public/room1.html');
});

const stocks = io.of('stocks');

stocks.on('connection', (socket) => {
  socket.on('join', () => {
    socket.join();
    stocks.emit('message', `New user joined room 1!`);
  });

  socket.on('message', (msg) => {
    console.log(`message: ${msg} `);
    stocks.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconected');

    stocks.emit('message', 'user disconnected');
  });
});