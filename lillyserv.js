var Q = require("q"),
    http = require("http"),
    fs = require("fs"),
    argv = require("minimist")(process.argv.slice(2));

http.createServer(function (req, res) {
  switch(req.url) {
    case "/storage":
      if(req.method === "POST") {
        var writeStream = fs.createWriteStream("var/storage.json", {
          flags: "w",
          encoding: "utf-8"
        });

        req.on("data", function (data) {
          writeStream.write(data);
        });

        req.on("end", function() {
          writeStream.end();
          res.writeHead(200, {"Content-Type": "text/plain"});
          res.end();
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
