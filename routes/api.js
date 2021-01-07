const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Routes
router.get('/', (req, res) => {
  Comment.find({  })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', daerrorta);
    });
});

router.post('/save', (req, res) => {
  console.log('Body: ', req.body);
  const data = req.body;

  const newComment = new Comment(data);

  newComment.save((error) => {
    if(error){
      res.status(500).json({ msg: 'Internal server errors'});
      return;
    }
    return res.json({  // Code 200 by default
      msg: 'Data has been received from client.'
    })
  });


  
})


module.exports = router;