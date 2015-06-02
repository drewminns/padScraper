var pad = {};

pad.message = $('p.message');
pad.button = $('button.get');
pad.preload = $('.preload');

pad.find = function() {
  $.ajax({
    url: 'http://localhost:8080/api',
    type: 'GET',
    dataType: 'jsonp',
    timeout: 5000,
    success: function(data) {
      $('section.results').html('');
      pad.sort(data);
    },
    error: function(x, t, m) {
      if(t === "timeout") {
          pad.message.text('Scraper Timeout. Click Again');
          pad.button.show();
          pad.preload.hide();
      } else {
          alert(t);
      }
    }
  });
};

pad.sort = function (content) {
  $.each(content, function(i, h) {
    $.each(h, function(x, y) {
      var padtitle = y.title,
          padlink = y.link,
          padprice = y.price;
          padpic = y.image;
      if(y.location) {
        padlocation = y.location;
      } else {
        padlocation = 'No Location';
      }
      var obj = {
        title : padtitle,
        link : padlink,
        price: padprice,
        location : padlocation,
        image : padpic
      };
      pad.display(obj);
    });
  });
};

pad.display = function (data) {
  if (data.title.indexOf('Wanted') > 0 || data.title.indexOf('basement') > 0 || data.title.indexOf('Basement') > 0 || data.title.indexOf('bsmt') > 0 || data.title.indexOf('Lower Level') > 0 || data.title.indexOf('lower level') > 0) {
    console.log('basement');
  } else {
    var title = '<p class="title">' + data.title + '</p>',
        gps = '<p>' + data.location + '</p>',
        bills = '<p class="price">' + data.price + '</p>';
        if (!data.image) {
          var pic = '<div class="image" style="background-image: url(images/noimg.jpg)"></div>';
        } else {
          pic = '<div class="image" style="background-image: url(' + data.image + ')"></div>';
        }
    var build = '<a href="' + data.link + '" target="_blank"><article>' + pic + '<div class="content"><header><div class="priceList">' + bills + "</div>" + gps + '</header><div class="info">'  + title + '</div></div></article></a>';

    $('section.results').append(build);
    pad.preload.hide();
    pad.button.show();
  }
};

pad.init = function () {
  $('button.get').on('click', function () {
    pad.message.text('');
    pad.preload.show();
    $(this).hide();
    pad.find();
  });
};


$(function() {

  pad.init();

});