var http = require("http"),
    fs = require("fs"),
    argv = require("minimist")(process.argv.slice(2));

http.createServer(function (req, res) {
  switch(req.url) {
    case "/storage":
      if(req.method === "POST") {
        var writeStream = fs.createWriteStream("var/storage.json", {
          flags: "w",
          encoding: "utf-8",
          autoClose: true
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
        res.writeHead(200, {"Content-Type": "application/json"});
        var readStream = fs.createReadStream("var/storage.json", {
          encoding: "utf-8",
          autoClose: true
        });
        readStream.on("close", function () {
          res.end();
        });
        readStream.pipe(res);
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
