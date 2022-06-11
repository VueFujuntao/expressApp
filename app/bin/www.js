import app from "./../main";
import http from "http";

app.set('port', 8080);

const server = http.createServer(app);

server.listen(8080);
