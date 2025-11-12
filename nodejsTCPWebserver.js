const net = require("node:net");

let server = new net.Server();

server.on("connection", (socket) => {
  console.log(`remoteAddress:   ${socket.remoteAddress}`);
  console.log(`remotePort:      ${socket.remotePort}`);

  console.log(`localAddress:    ${socket.localAddress}`);
  console.log(`localPort:       ${socket.localPort}`);

  socket.on("data", data => {
    let httpRequest = data.toString();
    let lines = httpRequest.split("\r\n");
    let statusLine = lines[0];
    let requestUrl = statusLine.split(" ")[1];
    console.log(requestUrl);
    socket.end();
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
