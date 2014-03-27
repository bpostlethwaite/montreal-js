/**
 * { Streaming the Internet of Things with Javascript }
 *
 * Many thanks to @substack for inspiration and source materials.

  <imgs/raspi_clipped.png>.pipe(<imgs/plotly1.png> )
 */








/**
 * { I am interwebs }
 */

var r = require('request'); var trumpet = require('trumpet');
(function interwebs () {
  var tr = trumpet().on('end', function () {console.log(""); interwebs()})
  tr.selectAll('.firstHeading span', function (span) {
    span.createReadStream().pipe(process.stdout);
  }); r('http://en.wikipedia.org/wiki/Special:Random').pipe(tr)
})();

/**
 *  >> echo "FIN" | awk '{print $1 " Thank you"}'
 */







/**
 * { if (javascript && hardware === streaming) win; }

  - The world around us

 */