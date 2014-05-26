var Q = require("q"),
    http = require("http"),
    fs = require("fs"),
    argv = require("minimist")(process.argv.slice(2));

http.createServer(function (req, res) {
  switch(req.url) {
    case "/storage":
      if(req.method === "POST") {
        Q.nfcall(fs.writeFile, "var/storage.json", "utf-8")
          .then(function() {
            res.writeHead(200);
            res.end();
          }, function(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
          });
      } else {
        Q.nfcall(fs.readFile, "var/storage.json", "utf-8")
          .then(function(data) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(data);
          }, function(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end(err.toString());
          });
      }
      break;
    case "/gettitle":
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }
}).listen(argv.p, argv.h);
