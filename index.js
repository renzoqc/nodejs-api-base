const express = require ('express');
//const faker = require ('faker');
const cors = require ('cors');
const routerApi = require ('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require ('./middlewares/error.handler');

const app = express();
const port = 3000;


app.use(express.json());
/*
const whitelist = ['http://localhost:8080', 'https://muapp.co'];
const options ={
  origin :(origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
*/
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta po');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

/*
app.get('/products', (req, res) => {
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
  res.json(products);
});

app.get('products/filter', (req, res) => {
  res.send('Yo soy un filter');
});



app.get('/products/:id', (req, res)=>{
  const { id } = req.params;
  res.json(
    {
      id,
      name: 'Product 2',
      prince: 2000
    });
});

*/

/*
app.get('/users', (req, res)=>{
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

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
  const { categoryId, productId}=req.params;
  res.json(
    {
    categoryId,
    productId,
  });
});
*/


app.listen(port, () => {
  console.log('Mi port '+ port);
});
