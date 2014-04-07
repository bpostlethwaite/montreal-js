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
