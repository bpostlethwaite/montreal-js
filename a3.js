/**
 *  { Websocket Streams (roll your own multiplexed Super Socket.io) }
 *
 */
var websocket = require('websocket-stream')
var ws = websocket('ws://localhost:9999')
var MuxDemux = require('mux-demux')
var emitStream = require('emit-stream')
var EventEmitter = require('events').EventEmitter
var mx = MuxDemux(router)

ws.pipe(mx).pipe(ws)

var serverEmitter = emitStream(mx.createReadStream('server-emitter'))
serverEmitter.on('message', function (msg) {
    document.querySelector('.server-comments').innerHTML = msg
})

var ev = new EventEmitter()
emitStream(ev).pipe(mx.createWriteStream('client-emitter'))
setTimeout( function () {
    ev.emit('bitcoin-data')
}, 5000)

function router (stream) {
    if (stream.meta === 'file') {
        var container = document.querySelector('.file-container')
        stream.on('data', function (line) {
            container.innerHTML += line + "<br>"
        })
    }
}