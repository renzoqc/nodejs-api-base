const express = require ('express');
const faker = require ('faker');

const router2 = express.Router();

router2.get('/', (req, res)=>{
  const { limit, offset } = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No hay parametros....');
  }
});

module.exports = router2;
