const YOUTUBE_API_KEY = process.env.YOUTUBE_DATA_API_KEY;
const axios = require('axios');

module.exports.getDataFromYOUTUBE = async (req, res) => {
  const {q} = req.query;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await axios.get (url);
    res.status (200).json ({
      success: true,
      result: response.data.items,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    res.status (500).json ({success: false, message: error.message});
  }
};
