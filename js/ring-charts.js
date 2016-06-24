(function($, undefined) {
    $.ringCharts = function() {
        var title = {
            text: '设备数量'
        };
        var xAxis = {
            categories: ['2016-06-12', '2016-06-13', '2016-06-14', '2016-06-15', '2016-06-16', '2016-06-17',
                '2016-06-18', '2016-06-19', '2016-06-20', '2016-06-21', '2016-06-22', '2016-06-23'
            ]
        };
        var yAxis = {
            title: {
                text: '个数'
            }
        };
        var plotOptions = {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        };
        var series = [{
            name: '总数',
            data: [2010, 1900, 1800, 1949, 1900, 2105, 2100, 2000, 2150, 2149, 2013, 2082]
        }, {
            name: '新版本',
            data: [200, 290, 230, 149, 180, 201, 200, 150, 209, 210, 230, 249]
        }, {
            name: '老版本',
            data: [1810, 1610, 1570, 1800, 1720, 1904, 1900, 1850, 1941, 1939, 1789, 1833]
        }];
        var tooltip = {
            crosshairs: true,
            shared: true
        };

        var json = {};
        json.title = title;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.tooltip = tooltip;
        json.plotOptions = plotOptions;
        $('#container').highcharts(json);
    };
}(jQuery, window));
