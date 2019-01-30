var fs = require('fs')
var cq = require('concurrent-queue')
var https = require('https');

var queue = cq().limit({ concurrency: 100 }).process(function (url, callback) {
  const req = https.request({
    method: "HEAD",
    host: url
  }, (res) => {
    callback(null, res)
  })
  req.end()
})
 
fs.readFile('files/urls.txt', 'utf8', function(err, contents) {
    urls = contents.split('\n')
    threads = 0
    maxThreads = 100
    urls.forEach(url => {
      
      queue(url,(err, res) => {
        if(err) {
          console.log(err)
        }
        console.log(res)
      })
    });
});