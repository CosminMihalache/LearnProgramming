const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/googleAI');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Add context to the prompt
    const prompt = `You are a helpful AI assistant for an educational platform that teaches programming and AI. 
    Respond to the following message in a friendly and informative way: ${message}`;
    
    const aiResponse = await generateResponse(prompt);
    
    res.json({
      message: aiResponse,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Eroare internă de server',
      message: 'Ne pare rău, a apărut o eroare. Vă rugăm să încercați din nou.'
    });
  }
});

module.exports = router; 