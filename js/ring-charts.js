(function($, undefined) {
    $.logCharts = function(title,filename) {
        var title = {
            text: title
        };
        var yAxis = {
            alternateGridColor: '#fbfbfb',
            endOnTick: true,
            gridLineColor: '#c0c0c0',
            gridLineDashStyle: 'longdash'
        };
        var plotOptions = {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        };
        var tooltip = {
            crosshairs: true,
            shared: true
        };
        var legend = {
            y: 20
        };

        var json = {};
        json.title = title;
        json.yAxis = yAxis;
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
}(jQuery, window));
