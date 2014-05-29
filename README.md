Lilly
=====

Lilly (because it's a "link list" and "lili" looks weird) is a minimalistic "read it later" web application. I created this little app because I was not happy with keeping articles "stared" or unread in my feed reader nor with storing emails in my inbox. Browser bookmarks are nicer, but still not synchronized between all my devices.

![screenshot](https://raw.githubusercontent.com/denschub/lilly/master/_docs/interface.png)

([GIF me some action](https://raw.githubusercontent.com/denschub/lilly/master/_docs/action.gif))

What it will do
---------------

* Handle drop-events to allow a simple "drag a link into the app" actions.
* Store the links into a JSON file which could get used for almost everything.
* Fetch `<title>`s to provide a little bit more meaningful list items.
* Works on your mobile device!

What it won't do
----------------

* User authentication. Use your webservers configs to protect the app.
* Fetch any metadata besides the title.
* Work on weird browsers (IE10 and older, I'm looking at you!)

Setup
-----

1. `npm install`
2. `cd public/assets/css/; scss main.scss:main.css`
3. `node lillyserv.js -l [listen-ip] -p [listen-port]`
4. Config your webserver to serve files from `public/` and proxy requests for `/backend/*` to the nodejs instance
5. Open your browser, open the Lilly instance, ignore the red flash (that's just because the storage file wasn't found, which is okay if this is the first start...) and add your first link.

Categories
----------

I created four categories (tech, article, entertain, other) because that's what I'm usually dealing with. However, these are not static, you can customize them by modifying the array in `main.js`. The names will be used as keys inside the stored JSON and they will get placed in the URL hash, so please just use chars you would also use for files on webservers... I use [Font Awesome](http://fontawesome.io/), so take a look at their docs to see which icons are available

Credits and License
-------------------

My stuff is released under an MIT license, see `LICENSE` for more information. In addition to the code I write myself, I'm using [Underscore.js](http://underscorejs.org), [Backbones event machine](http://backbonejs.org) and [React](https://facebook.github.io/react/). See the source files for licensing information.

Ideas
-----

In further versions, one could add

* better error handlings
* the possibility to sort links by drag'n'dropping them
* a way to search through all the links
* [add your idea here!]

Disclaimer
----------

I wrote Lilly to make my daily business of reading articles and news a bit easier. It may not fit your needs. But if you have an idea for improvement, I'll gladly merge your pull request.
