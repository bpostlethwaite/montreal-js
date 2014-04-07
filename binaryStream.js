var Readable = require('readable-stream').Readable
var util = require('util')

module.exports = RandomSignal

function RandomSignal (opt) {

  if (!opt) opt = {}

  if (!(this instanceof RandomSignal))
    return new RandomSignal(opt);


  Readable.call(this, opt)

  var self = this
  self._destroyed = false
  self.iv = null


  startSignal()

  function startSignal () {

    self.iv = setInterval( function () {
      var x = timeFormatter(now)
      var y = generateSignal((ts - start) / 1000, trend)

      var data = {x:x, y:y}

      if (!opt.objectMode) {
        data = JSON.stringify(data) + sep
        data = new Buffer(data, 'utf8');
      }
      self.push(data);

    }, tdelta)
  }

    function generateSignal(ts, trend) {
        var y = amp*Math.sin(hz*ts)
          , noise = randNoiseAmp() * Math.sin(noiseHz*ts)
        return y + noise + trend
  }

}

util.inherits(RandomSignal, Readable)

RandomSignal.prototype._read = function () {
  if (this._destroyed) {
    this.push(null)
  }
}

RandomSignal.prototype.destroy = function () {
  clearInterval(this.iv)
  this._destroyed = true
  this.emit("end")
}

/*
 * Helper functions
 */
function getTimeString (now) {
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month }
  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day }
  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour }
  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute }
  var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second }
  var ms = "" + now.getMilliseconds(); while (ms.length < 3) { ms = "0"+ms }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + ms;
}


function randGenerator(min, max) {
  if (isNaN(min)) min = -1
  if (isNaN(max)) max = 1
  return function () {
    return Math.random() * (max - min + 1) + min
  }
}