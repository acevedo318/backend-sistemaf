const { error } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM products WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});


router.get('/json/allproducts', async (req,res) => {

    const products = await pool.query('SELECT * FROM products');
    res.json(products);
});


module.exports = router;