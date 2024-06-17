const express = require('express');
const axios = require('axios');
const cors = require('cors');
const keywordToUrls = require('./data');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const shortenUrl = async (url) => {
  try {
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    return response.data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    return url;  
  }
};

app.get('/urls/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const urls = keywordToUrls[keyword];
  if (urls) {
    try {
      const shortenedUrls = await Promise.all(urls.map(url => shortenUrl(url)));
      res.json(shortenedUrls);
    } catch (error) {
      res.status(500).send('Error shortening URLs');
    }
  } else {
    res.status(404).send('Keyword not found');
  }
});

app.get('/download', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const response = await axios.get(url, {
      responseType: 'text'
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error downloading content');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});