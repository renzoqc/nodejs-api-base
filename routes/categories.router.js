const express = require ('express');
const faker = require ('faker');

const router3 = express.Router();

router3.get('/:categoryId/products/:productId', (req, res)=>{
  const { categoryId, productId}=req.params;
  res.json(
    {
    categoryId,
    productId,
  });
});

module.exports = router3;
