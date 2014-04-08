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
    console.log(msg)
})

var ev = new EventEmitter()
emitStream(ev).pipe(mx.createWriteStream('client-emitter'))
setTimeout( function () {
    ev.emit('bitcoin-data')
}, 2000)


function router (stream) {
    if (stream.meta === 'file') {
        stream.on('data', function (data) {
            console.log(data)
        })
    }
}