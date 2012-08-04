/* Pere Orga <pere@orga.cat>, 2012 */

$(function() {

  var inc       = 0;
  var count     = 0;
  var didScroll = false;
  var $input    = $('#inputsearch');
  var $llista   = $('#llista');

  function get_contact_json(limit) {
    var async_check = limit || ++count;
    $.getJSON('?n=' + encodeURIComponent($input.val()) + '&l=' + limit, function(data) {
      var display = limit === 0 ? '>' : ' style="display:none">';
      var temp    = '';
      $.each(data, function(key, val) {
        temp += '<li' + display + val.n + '<div style="text-align:right">' + val.t + '</div></li>';
      });
      if (limit === 0) {             // keyup
        if (async_check !== count) { // not the last keyup, quit
          return;
        } 
        $llista.html('');
      }
      $llista.append(temp).listview('refresh');
    });
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
      if ($(window).scrollTop() && $(window).scrollTop()+200 > $(document).height()-$(window).height()) {
        inc += 25;
        get_contact_json(inc);
        $('li:hidden').show(); // http://jsperf.com/hidden-selector-vs-other
      }
    }
  }, 250);

  get_contact_json(0);
  $input.focus();
});
