const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7f73b19ac1a74cc4ae46f870b4b1c18c'
   });


   const handleAPI = (req, res) => {
       app.models
          .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
          .then(data => {
              res.json(data)
          }).catch(err => res.status(400).json('Unale to fetch api'))
   }
  
const handleImage = (req, res, db) => {
    const {id}  = req.body;
     db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
            
        })
        .catch(err => res.status(400).json('Unable to get entries'));
    
}

module.exports ={
    handleImage: handleImage,
    handleAPI: handleAPI
}