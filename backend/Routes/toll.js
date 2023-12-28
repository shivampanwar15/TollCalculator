const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/calculatetoll', async (req, res) => {
    try {
      const { startinglocation, destination, milage, vehicletype } = req.query;
      const tollGuruOptions = {
        method: 'POST',
        url: 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints',
        headers: {
          'content-type': 'application/json',
          'x-api-key': 't7p898BNQD8JMHfjbG6TLnTgR7JPGrfm',
        },
        data: {
          from: { address: startinglocation, lat: null, lng: null },
          to: { address: destination, lat: null , lng: null },
          waypoints: [],
          serviceProvider: 'here',
          vehicle: {
            type: vehicletype,
            weight: { value: 2, unit: 'tonnes' },
            height: { value: 7.5, unit: 'meter' },
            length: { value: 7.5, unit: 'meter' },
            axles: 4,
            emissionClass: 'euro_5',
          },
        },
      };
      
    
        // Use axios to make the request to TollGuru API
        const response = await axios(tollGuruOptions);
    
    // Send the API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
