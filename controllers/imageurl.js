const fetch = require('node-fetch'); // Ensure fetch is available

// Controller function to handle the Clarifai API request
const handleApiCall = (req, res) => {
  const { input } = req.body;  // Get the image URL from the request body
  
  if (!input) {
    return res.status(400).json({ error: 'Image URL is required' });  // If no image URL is provided, return a 400 error
  }

  // Clarifai API setup
  const PAT = 'f267ee1270f74435a126fb33851fb86c';  // Your Clarifai Personal Access Token
  const USER_ID = 'elen23_cyberella';
  const APP_ID = 'facerecognitionbrain';
  const MODEL_ID = 'face-detection';

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: input,  // Image URL received from frontend
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Key ${PAT}`,  // Your Clarifai API Key
    },
    body: raw,  // The JSON payload to send to the Clarifai API
  };

  // Making the request to Clarifai
  fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, requestOptions)
    .then((response) => response.json())  // Parse the response as JSON
    .then((result) => {
      if (result) {
        res.json(result);  // If the response is valid, send it back to the frontend
      } else {
        res.status(400).json('Unable to get a valid response from Clarifai');
      }
    })
    .catch((err) => {
      console.error('Error fetching from Clarifai API:', err);  // Log errors for debugging
      res.status(500).json('Error processing the API request');
    });
};

module.exports = {
  handleApiCall,
};


