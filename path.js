var xray = require('x-ray');
var api = {};

api.xc = xray,
api.xk = xray,
api.data = [],
api.cLinks = [],
api.kLinks = [];
api.hoods = [ 'roncesvalles','queen west','high park','trinity bellwoods','parkdale'];

api.home = function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
};

api.getListings = function(req, res) {

		if (api.data.length > 10) {
			api.data = [];
		}

		for (var i=0; i < api.hoods.length; i++) {

			var cStr = api.hoods[i].replace(/\s/g, '+'),
					kStr = api.hoods[i].replace(/\s/g, '-');
			api.cLinks.push('http://toronto.craigslist.ca/search/apa?maxAsk=2000&bedrooms=1&query=' + cStr);
	  	api.kLinks.push('http://www.kijiji.ca/b-1-bedroom-apartments-condos/city-of-toronto/' + kStr + '/k0c212l1700273?price=__2000');

	  	api.xc(api.cLinks[i])
	  	  .select([{
	  	    $root: '.row',
	  	    title: '.hdrlnk',
	  	    link: 'a.hdrlnk[href]',
	  	    price: '.price',
	  	    location: '.pnr small',
	  	    image: 'img.thumb[src]'
	  	  }])
	  	  .paginate('a.button.next[href]')
	  	  .limit(3)
	  	  // .write('output.json');
	  	  .run(function (err, fb) {
	  	    // body...
	  	    // console.log(fb)
	  	    api.data.push(fb);
	  	  });

  	  api.xk(api.kLinks[i])
  	    .select([{
  	      $root: '.regular-ad',
  	      path: kStr,
  	      title: '.description',
  	      link: '.description a[href]',
  	      price: '.price',
  	      location: '.pnr small',
  	      image: '.multiple-images img[src]'
  	    }])
  	    .paginate('.pagination a:nth-last-child(2)')
  	    .limit(1)
  	    .run(function (err, fb) {
  	      // body...
  	      api.data.push(fb);
  	    });
		}

		if (api.data.length > 5) {
			res.jsonp(api.data)
			// console.log(data.length);
		}

};

module.exports = api;