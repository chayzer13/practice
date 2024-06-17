const keywordToUrls = {
    'finance': ['https://api.coindesk.com/v1/bpi/currentprice.json'],
    'music': ['https://rss.itunes.apple.com/api/v1/us/apple-music/hot-tracks/all/10/explicit.json'],
    'technology': ['https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml'],
    'travel': ['https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml']
  };

  module.exports = keywordToUrls;