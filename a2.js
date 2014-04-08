/**
 *  { TCP HTTP & duplex streams }
 *
 * >> node {this}
 */
var net = require('net')
var through = require('through2')
var screamStream = through(function (chunk, enc, cb) {
                       this.push(chunk.toString().toUpperCase())
                       cb() })

net.createServer( function (conn) {
    conn.pipe(screamStream).pipe(conn)
    screamStream.on('data', function (data) {
        console.log(data.toString())
    })
}).listen(9999)












// (echo / lowercase -> on read and write / back and use duplex on original slide)


// var tcpserver = require('net').createServer(handler).listen(9999)
// var Through = require('through2')
// function handler (conn) {
//     var lowerStream = Through(Lower)
//     conn.pipe(lowerStream).pipe(conn)
//     conn.write("HELLO\n")
//     conn.on('data', function (data) {console.log(data.toString())})
// }


// function Lower(chunk, enc, cb) {
//     this.push(chunk.toString().toLowerCase())
//     cb()
// }