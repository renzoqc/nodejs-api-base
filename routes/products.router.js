const express = require ('express');
//const faker = require ('faker');
const  ProductsService = require('./../Services/product.service');
const  validatorHandler = require('./../middlewares/validator.handler');
const { createProducSchema, updateProducSchema, getProducSchema} = require('./../schemas/product.schema');


const router = express.Router();
const service = new ProductsService();


router.get('/', async(req, res) => {
/*
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {

    products.push({
      //numer: index+1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl()
    });

  }
*/


  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});



router.get('/:id',
  validatorHandler(getProducSchema, 'params'),
  async (req, res, next)=>{
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
        next(error);
    }
  /*
  if(id==='999'){
    res.status(404).json(
      {
      message: 'not found'
      });
  }else {
      res.status(200).json(
    {
      id,
      name: 'Product 2',
      prince: 2000
    });
  }
  */
  }
);

router.post('/',
validatorHandler(createProducSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
   /*
   {
    message:'created',
    data: body
  })
  */
});

router.patch('/:id',
validatorHandler(getProducSchema, 'params'),
validatorHandler(updateProducSchema, 'body'),
async (req, res) => {
  try {
    const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  res.json(product)
  } catch (error) {
    next(error);
  }
   /*
    {
    message:'update',
    data: body,
    id,
  });
  */
}
);

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
    /*{
    message:'delete',
    id,
  });
  */
});

module.exports = router;
