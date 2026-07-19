import http from "node:http";

const host = "127.0.0.1";
const port = 5999;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (request.url?.startsWith("/api/auth/get-session")) {
    response.writeHead(200);
    response.end("null");
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ success: false, message: "Mock route not found." }));
});

server.listen(port, host, () => {
  console.log(`GrantPilot E2E mock API listening on http://${host}:${port}`);
});

const shutdown = () => server.close(() => process.exit(0));
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
