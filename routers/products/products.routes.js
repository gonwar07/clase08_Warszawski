const express = require('express');
const { products } = require('../../data/data');

const router = express.Router();

// /api/products
router.get('/', (req, res) => {
    res.json(products);
  });
  
  // api/products/:id
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === +id);
    if (!product) {
      return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    }
    return res.json({ success: true, result: product });
  });
  
  // api/products
  router.post('/', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if ( !title ||  !price || !thumbnail) {
      return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
      id: products.length + 1,
      title,
      price,
      thumbnail
    };
    products.push(newProduct);
    return res.json({ success: true, result: newProduct });
  });
  
  // api/products/:id
  router.put('/:id', (req, res) => {
    const { params: { id }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = products.findIndex((product) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    const newProduct = {
      ...products[productIndex],
      title,
      price,
      thumbnail
    };
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct});
  });
  
  // api/products/:id
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${id} does not exist!`});
    products.splice(productIndex, 1);
    return res.json({ success: true, result: 'product correctly eliminated' });
  });
  
  
  module.exports = router;