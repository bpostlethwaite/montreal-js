/**
 *  { tcp http & duplex streams }
 *
 * Nodejs has from its beginning been inspired by the
 * Unix philosophy nicely distilled into these points:

 - Write programs that do one thing and do it well.
 - Write programs to work together.
 - Write programs to handle text streams, because that is a universal interface.
 * Doug McIlroy
 * >> node {this}
 */
var tcpserver = require('net').createServer(handler).listen(9999)
var Through = require('through2')
function handler (conn) {
    var lowerStream = Through(Lower)
    conn.pipe(lowerStream).pipe(conn)
    conn.write("HELLO\n")
    conn.on('data', function (data) {console.log(data.toString())})
}


function Lower(chunk, enc, cb) {
    this.push(chunk.toString().toLowerCase())
    cb()
}