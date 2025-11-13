const net = require("node:net");

let server = new net.Server();

function respond(socket, statusCode, statusMessage, body) {
  let httpResponse =
    `HTTP/1.1 ${statusCode} ${statusMessage}\r\n` +
    "Content-Type: text/html\r\n" +
    "Connection: close\r\n" +
    `Content-Length: ${body.length}\r\n` +
    "\r\n" +
    body;
  socket.write(httpResponse);
  socket.end();
}

server.on("connection", (socket) => {
  console.log(`remoteAddress:   ${socket.remoteAddress}`);
  console.log(`remotePort:      ${socket.remotePort}`);

  console.log(`localAddress:    ${socket.localAddress}`);
  console.log(`localPort:       ${socket.localPort}`);

  socket.on("data", (data) => {
    let httpRequest = data.toString();
    let lines = httpRequest.split("\r\n");
    let statusLine = lines[0];
    let requestUrl = statusLine.split(" ")[1];
    respond(socket, 200, "OK", `<h1>You requested: ${requestUrl}</h1>`);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
