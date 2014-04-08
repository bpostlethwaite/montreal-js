/**
 * { WEBSOCKET SERVER }
 *
 */
var ecstatic = require('ecstatic')
  , server = require('http').createServer(
      ecstatic({ root: __dirname + '/static' })).listen(9999)
  , fs = require('fs')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({server: server})
  , websocket = require('websocket-stream')
  , MuxDemux = require('mux-demux')
  , emitStream = require('emit-stream')
  , EventEmitter = require('events').EventEmitter
  , split = require('split')
  , SlowStream = require("slow-stream")


wss.on('connection', function(ws) {
  console.log('got connection')
    var mx = MuxDemux(router)
    var stream = websocket(ws)
    stream.pipe(mx).pipe(stream)
})

function router (stream) {
  var meta = stream.meta
  var self = this
  switch (meta) {

    case "server-emitter":
    console.log('got server emitter')
    var evserver = new EventEmitter()
    emitStream(evserver).pipe(stream)
    var i = 0
    setInterval( function () {
      evserver.emit('message', 'server sending ' + i)
      i++
    }, 500)

    case "client-emitter":
    var evclient = emitStream(stream)
    var splitter = split()
      , throttle = new SlowStream({ maxWriteInterval: 200 })
    evclient.on('bitcoin-data', function () {
      fs.createReadStream('bitcoin.csv', {encoding:'utf8'})
      .pipe(splitter)
      .pipe(throttle)
      .pipe(self.createWriteStream('file'))
    })
  }
}