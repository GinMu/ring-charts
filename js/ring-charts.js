(function($, undefined) {
    $.logCharts = function(titles, filename) {
        var title = {
            text: titles
        };
        var xAxis = {
            endOnTick: true,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%y/%m/%d'
            }
        };
        var yAxis = {
            endOnTick: true,
            gridLineColor: '#c0c0c0',
            gridLineDashStyle: 'longdash'
        };
        var plotOptions = {
            line: {
                dataLabels: {
                    enabled: false,
                    allowOverlap: true,
                    rotation: 350,
                    y: -15,
                    x: 10
                },
                enableMouseTracking: true
            }
        };
        var credits = {
            enabled: false
        };
        var tooltip = {
            crosshairs: true,
            shared: true,
            dateTimeLabelFormats:{
              day: '%Y/%m/%d %a'
            }
        };
        var legend = {
            y: 20
        };

        var json = {};
        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.credits = credits;
        json.tooltip = tooltip;
        json.plotOptions = plotOptions;
        json.legend = legend;
        $.ajax({
            url: 'http://localhost:8080',
            data: {
                filename: filename
            },
            type: 'get',
            dataType: 'text',
            success: function(csv) {
                var data = {
                    csv: csv
                };
                json.data = data;
                $('#container').highcharts(json);
            }
        });
    };

    $.seriesUpdate = function(labels, tracking) {
        var chart = $('#container').highcharts();
        var series = chart.series;
        for (var i in series) {
            series[i].update({
                dataLabels: {
                    enabled: labels
                },
                enableMouseTracking: tracking
            });
        }
    };
}(jQuery, window));
