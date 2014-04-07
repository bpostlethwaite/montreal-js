var config = require('./config.json')
var Plotly = require('plotly')(config.user, config.apikey)

var data = {
    "x": [],
    "y": [],
    "type": "scatter",
    "mode": "lines+markers",
    "marker": {
 	"opacity": 0.7,
 	"size": 12,
 	"color": "rgb(54,144,192)",
 	"line": {
  	    "width": 1,
  	    "color": "darkblue"
 	}
    },
    "stream": {
        "token": config.token1,
        "maxpoints": 100
    }
}

var layout = {
    layout : {
        "title" : "Bitcoin Historic Real-time"
    },
    "filename" : "Bitcoin Historic Real-time",
    "fileopt": "overwrite"
}

Plotly.plot(data, layout, function (err, res) {
    if (err) return console.log(err)
    console.log(res)
})