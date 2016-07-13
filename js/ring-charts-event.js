(function($, undefined) {
    $('#nav-data li').off('click').on('click', function() {
        $('#ring-charts').removeClass('hidden');
        var self = this;
        var type = self.getAttribute('type');
        $('li.active').removeClass('active');
        $(self).addClass('active');
        $('.shown').removeClass('shown').addClass('hidden');
        $('#' + type).removeClass('hidden').addClass('shown');
        var dropdownMenu = $('#' + type + '-title');
        var title = dropdownMenu.text();
        var filename = dropdownMenu.attr("filename");
        $.logCharts(type + '-title', title, filename);
    });
    $('#nav-region li').off('click').on('click',function(){
      $('#ring-charts').removeClass('hidden');
      var self = this;
      var type = self.getAttribute('type');
      $('li.active').removeClass('active');
      $(self).addClass('active');
      $('.shown').removeClass('shown').addClass('hidden');
      $('#' + type).removeClass('hidden').addClass('shown');
      var currentDate = new Date(+new Date() - 16 * 3600 * 1000).toISOString().substring(0,10);
			$('#dateTime').val(currentDate);
      $.logsMaps(currentDate);
    });
    $('#nav-uuid li').off('click').on('click',function(){
      $('#ring-charts').addClass('hidden');
      $('#ring-uuid').removeClass('hidden');
      var self = this;
      var type = self.getAttribute('type');
      $('li.active').removeClass('active');
      $(self).addClass('active');
      $('.shown').removeClass('shown').addClass('hidden');
      $('#' + type).removeClass('hidden').addClass('shown');
      var currentDate = new Date(+new Date() - 16 * 3600 * 1000).toISOString().substring(0,10);
      $('#uuid-dateTime').val(currentDate);
    });
    $('#uuid-query').off('click').on('click',function(){
      var time = $('#uuid-dateTime').val();
      var uuid = $('#uuid-text').val();
      if (!time || !uuid) {
        alert('请输入时间或UUID');
        return;
      }
      if ($('#ol_list li').length > 0) {
        $('#ol_list').empty();
      }
      $.searchUUID(time,uuid);
    });
    $("ul.dropdown-menu li").off("click").on("click", function() {
        var self = this;
        var type = self.getAttribute("type");
        var dropdownMenu = $('#' + type);
        var currentTitle = dropdownMenu.text();
        var title = self.getAttribute("text");
        var filename = self.getAttribute("filename");
        if (currentTitle === title) {
            return;
        }
        if (!$('#line').is(':checked')) {
            $('#line')[0].checked = true;
        }
        dropdownMenu.text(title);
        dropdownMenu.attr('filename', filename);
        $.logCharts(type, title, filename);
    });
    $('#number-title-data-labels,#percent-title-data-labels').off('click').on('click', function(e) {
        var checked = $(this).is(':checked');
        var labels = checked;
        var tracking = !labels;
        $.seriesUpdate(labels, tracking);
    });
    $(".radio-inline input").off('click').on('click', function() {
        var self = this;
        var type = this.value;
        $.updateType(type);
    });
    $('#query').off('click').on('click',function(){
			var date = $('#dateTime').val();
			$.logsMaps(date);
		});
}(jQuery, window));
