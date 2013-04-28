$(function() {

  var inc = 0;
  var count = 0;
  var didScroll = false;
  var $input = $('#inputsearch');
  var $list = $('#list');

  function get_contact_json(limit) {
    var async_check = limit || ++count;
    var url = 'api/entries';
    var search = encodeURIComponent($input.val());
    if (search) {
         url += '/' + search + '/' + limit;
    }

    $.getJSON(url, function(data) {
      var display = limit === 0 ? '>' : ' style="display:none">';
      var temp = '';
      var i = 0;
      $.each(data, function(key, val) {
        temp += '<li' + display + val.n + '<div style="text-align:right">' + val.p + '</div></li>';
        ++i;
      });
      if (limit === 0) {             // keyup
        if (async_check !== count) { // not the last keyup, quit
          return;
        }
        if (i === 25) {
            inc += 25;
            get_contact_json(inc);
        }
        $list.html('');
      }
      $list.append(temp).listview('refresh');
    });
    $('li:hidden').show(); // http://jsperf.com/hidden-selector-vs-other
  }

  $input.on('keyup change', function () {
    inc = 0;
    get_contact_json(0);
  });

  $(window).scroll(function() {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      if ($(window).scrollTop() && $(window).scrollTop() + 200 > $(document).height() - $(window).height()) {
        inc += 25;
        get_contact_json(inc);
      }
    }
  }, 250);

  get_contact_json(0);
  $input.focus();
});
