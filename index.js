let express = require('express');
let cors = require('cors');
let app = express();
let port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];


// Endpoint 1: Add an Item to the Cart

function addItemToCart(productId, name, price, quantity) {
  cart.push ({productId, name, price, quantity});
  return cart;
}
app.get('/cart/add', (req , res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItemToCart(productId, name,price ,quantity);
  res.json(result);
})

//Endpoint 2: Edit Quantity of an Item in the Cart

function editItem(cart, productId, quantity){
   for(let i =0; i< cart.length; i++){
     if(cart[i].productId === productId){
       cart[i].quantity = quantity;
     }
   }
  return cart;
}

app.get('/cart/edit', (req,res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editItem(cart, productId, quantity);
  res.json(result);
})

//Endpoint 3: Delete an Item from the Cart

function deleteById(cart, productId){
  return cart.productId !== productId;
  }

app.get('/cart/delete', (req,res) => {
  let productId = parseInt(req.query.productId);
    let result = cart.filter(cart => deleteById(cart, productId));
  cart = result;
  res.json(result);
})

// Endpoint 4: Read Items in the Cart 

app.get('/cart', (req , res) => {
  res.json(cart)
}) 

// Endpoint 5: Calculate Total Quantity of Items in the Cart 

function totalQuantity(cart){
  let sum = 0;
  for(let i = 0; i<cart.length; i++){
    sum += cart[i].quantity;
  }
  return sum;
}

app.get('/cart/total-quantity', (req , res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity: result });
})


//Endpoint 6: Calculate Total Price of Items in the Cart

function totalPrice(cart){
  let sum = 0;
    for(let i = 0; i<cart.length; i++){
      sum += cart[i].price * cart[i].quantity;
    }
    return sum;
  }

  app.get('/cart/total-price', (req , res) => {
    let result = totalPrice(cart);
    res.json({ totalPrice: result });
  })

app.listen(port,() =>{
  console.log(`Server is running on http://localhost:${port}`);
})