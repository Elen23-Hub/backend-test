require('dotenv').config();
const fetch = require('node-fetch'); // Ensure fetch is available

// Controller function to handle the Clarifai API request
const handleApiCall = (req, res) => {
  const { input } = req.body;  // Get the image URL from the request body
  
  if (!input) {
    return res.status(400).json({ error: 'Image URL is required' });  // If no image URL is provided, return a 400 error
  }
  const raw = JSON.stringify({
    user_app_id: {
      user_id: 'elen23_cyberella',
      app_id: 'facerecognitionbrain',
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
      'Authorization': `Key ${process.env.CLARIFAI_PAT}`,  // Your Clarifai API Key
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


