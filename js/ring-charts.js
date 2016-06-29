(function($, undefined) {
	$.logs = {
		path: 'logs/',
		getPath: function(filename) {
			return this.path + filename;
		}
	};

	$.logCharts = function(titles, filename) {
		var title = {
			text: titles
		};
		var xAxis = {
			endOnTick: true,
			type: 'datetime',
			startOnTick: true,
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
			series: {
				dataLabels: {
					enabled: false,
					allowOverlap: true,
					rotation: 350,
					y: -15,
					x: 10,
					formatter: function() {
						return this.y;
					}
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
			xDateFormat: '%Y-%m-%d %a'
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
			url: $.logs.getPath(filename),
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

	$.searchUUID = function(time, uuid) {
		$.ajax({
			url: 'http://192.168.66.254:8000',
			data: {
				time: time,
				uuid: uuid
			},
			type: 'get',
			dataType: 'text',
			success: function(data) {
				$.getOperationList(data);
			}
		});
	};
	$.getOperationList = function(data) {
		data = JSON.parse(data);
		if (!data || data.length === 0) {
			alert('无相关记录');
			return;
		}
		var list = [];
		for (var i in data) {
			var li = $.getOperationType(data[i]);
			list.push(li);
		}
		$('#ol_list').append(list.join(''));
	};
	$.getOperationType = function(list) {
		var html = '<li>';
		var type = list.type;
		switch (type) {
			case 0:
				html += '播放:' + list.name;
				break;
			case 1:
				html += '暂停:' + list.name;
				break;
			case 2:
				html += '点击设彩铃:' + list.name;
				break;
			case 3:
				html += '接收短信:' + list.name + '  tel:' + list.tel;
				break;
			case 4:
				html += '设置彩铃:' + list.name + '  tel:' + list.tel;
				break;
			case 5:
				html += '搜索:' + list.key;
				break;
			case 6:
				html += '页面:' + list.path;
				break;
			case 7:
				html += '程序升级:' + list.version;
				break;
			case 8:
				html += '点击appstore评论:';
				break;
			case 9:

				break;
			case 10:

				break;
			case 11:
				html += '获取随机码:' + list.name + '  tel:' + list.tel;
				break;
			case 12:
				html += '反馈信息:' + unescape(list.word) + '  tel:' + unescape(list.tel);
				break;
			case 13:
				html += '退订:' + list.tel;
				break;
			case 14:
				html += '记录地理位置:' + list.region;
				break;
			case 15:
				html += '记录手机空间';
				break;
			case 16:
				html += '下载铃声:' + list.name;
				break;
			default:
		}
		html += '</li>';
		return html;
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
	$.updateType = function(type) {
		var chart = $('#container').highcharts();
		var series = chart.series;
		for (var i in series) {
			series[i].update({
				type: type
			});
		}
	};
}(jQuery, window));