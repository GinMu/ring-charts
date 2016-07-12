(function($, undefined) {
    $('.nav li').off('click').on('click', function() {
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
}(jQuery, window));
