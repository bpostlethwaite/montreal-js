/**
 * { Streaming the Internet of Things with Javascript }

  <imgs/raspi_clipped.png>.pipe(<imgs/plotly1.png> )
 */











/**
 * { What is a stream? }

 In general a stream is a sequence of data elements made available over time.
 A stream can be thought of as a conveyor belt that allows items to be
 processed one at a time rather than in large batches.
 In Unix like systems (linux / Macs) streams are an abstraction used when
 reading or writing files, or communicating over network sockets.
 They can be composed into pipelines.

 "We should have some ways of connecting programs like a garden hose
 screw in another segment when it becomes necessary to massage data
 in another way. This is the way of IO also."
 * <imgs/doug.png>  "Doug McIlroy. October 11, 1964"
 *
 *
 * >> echo "hello Montreal JS!"
 *
 *
 *
 - pipe data to the awk command
 * >> echo "hello Montreal" | awk '{print $0 ",", $1 " JS!"}'
 *
 *
 *
 - print a file to stdout, pipe it to 'head' which just takes the first line
 * >> cat bitcoin.csv | wc -l
 *
 *
 *
 - stream a text file (slowly) pipe it to a text to JSON renderer then pipe
 - it to this nodejs script.
 * >> slowcat -d 100 bitcoin.csv | t2j -f ',' '{"x":0, "y":7}' | node {this}
 */
var config = require('./config.json')
var Plotly = require('plotly')(config.user, config.apikey)
var Through = require('through2')
var meanStream = Through(movingAvg())
var plotlyStream = Plotly.stream(config.token1)


process.stdin.pipe(meanStream).pipe(plotlyStream)

// (streaming-demos 50 / passthrough / plotly / through2 + meanify)







function movingAvg (win) {

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
