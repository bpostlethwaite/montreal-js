/**
 * { What is a stream? Readable & Writable & Transform Streams }

 In general a stream is a sequence of data elements made available over time.
 A stream can be thought of as a conveyor belt that allows items to be
 processed one at a time rather than in large batches.
 In Unix like systems (Linux / Macs) streams are an abstraction used when
 reading or writing files, or communicating over network sockets.
 They can be composed into pipelines.



 "We should have some ways of connecting programs like a garden hose---
 screw in another segment when it becomes necessary to massage data
 in another way. This is the way of IO also."
 * <imgs/doug.png>  "Doug McIlroy. October 11, 1964"
 *
 * So what does this have to do with Javascript?
 * Node has from its beginning been inspired by the Unix philosophy
 *
 - Write programs that do one thing and do it well.
 - Write programs to work together.
 - Write programs to handle text streams, because that is a universal interface.
 * ---Doug McIlroy
 *
 *
 * Streams are a fundamental node I/O primitive and are used all
 * throughout its core.
 *
 *
 * {TOUR BEGIN}
 *
 * We are going to start where life itself started, on the Unix command line.
 *
 *
 *
 *
 * >> echo "hello Montreal JS"
 *
 *
 *
 - pipe data to the awk command
 * >> echo "hello Montreal" | awk '{print $0 ",", $1 " JS!"}'
 *
 *
 *
 - print a file to stdout, pipe it to 'head' which just takes the first line
 * >> slowcat  bitcoin.csv | wc -l
 *
 *
 *
 - stream a text file (slowly) pipe it to a text to JSON converter then pipe
 - it to this nodejs script.
 * >> slowcat -d 100 bitcoin.csv | t2j -f ',' '{"x":0, "y":7}' | node {this}
 */
var conf = require('./config.json')
var plotly = require('plotly')(conf.user, conf.apikey)
var through = require('through2')
var meanStream = through(movingAvg(5))

var plotlyStream = plotly.stream(conf.token1)
process.stdin.pipe(meanStream).pipe(plotlyStream)

function movingAvg (win) {

  if (!win) win = 5

  var window = []

  function transformer(chunk, enc, callback) {
    var data = JSON.parse(chunk)

    window.push(data.y)

    if (window.length > win) {
      window.shift()
    }

    data.y = takemean(window)

    this.push(JSON.stringify(data)+'\n')

    callback()
  }


  function takemean (arr) {
    return arr.reduce( function(p,c) {
             return p+c;
           } ) / arr.length
  }

  return transformer
}
