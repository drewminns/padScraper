# Pad Scraper

Scrapes Craigslist and Kijiji for apartment listings below $2000 in the follow neighbourhoods.

Set to scrape Toronto listings below $2000 that match a query in the following neighbourhoods

* Roncesvalles
* High Park
* Junction
* Parkdale
* Trinity Bellwoods

Built janky as fuck but it works. high five. <3

Go nuts and fork it. Improve it to the max yo.

## How to use

Navigate to the app folder and run `npm install`. Once everything is aces, run `gulp` and the app will automatically open in the browser.

### Changing Cities and price limit

To change cities and price, modify the url used for both Kijiji and Craigslist in the `path.js` file accordingly.

```
api.cLinks.push('http://toronto.craigslist.ca/search/apa?maxAsk=2000&bedrooms=1&query=' + cStr);
api.kLinks.push('http://www.kijiji.ca/b-1-bedroom-apartments-condos/city-of-toronto/' + kStr + '/k0c212l1700273?price=__2000');
```

### Changing Hoods

To change the hoods, update the `api.hoods` array in `path.js`.

example:

```
api.hoods = [ 'lakeshore','distillery','queen east','rosedale'];
```

## Credits

No way this would even happen without [x-ray](https://github.com/lapwinglabs/x-ray). Will update the use the new build someday,

In the mean time, get a sweet apartment.
