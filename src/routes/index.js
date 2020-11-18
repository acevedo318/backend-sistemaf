const express = require('express');
const router = express.Router();
const pool = require('../database');
const Producto = require('../models/producto');

router.get('/', async (req, res) => {

    res.render('index');
    //res.render('index');
});

router.get('/facturas', async (req, res) => {

    let facturas;

    try {
        facturas = await pool.query('SELECT * FROM venta');
        for (let index = 0; index < facturas.length; index++) {
            facturas[index].isvalido = Boolean(facturas[index].isvalido);
            
        }
    } catch (error) {

    }


    res.render('facturas', { facturas });

});

router.get('/facturas/add', async (req, res) => {

    let facturas, productos;
    let facturaid = 0;

    try {
        facturas = await pool.query('SELECT * FROM venta');
        productos = await pool.query('SELECT * FROM producto');
        facturaid = "FN-" + (facturas[facturas.length-1].id + 1);

    } catch (error) {

    }
    const productosJS = JSON.stringify(productos).toString();

    res.render('facturasAdd', { facturas, facturaid, productos, productosJS });

});

router.post('/facturas/add', async (req, res) => {

    console.log(req.body);
    let productos;
    let insertid = 0;
    let suma = Number(0);

    const venta = {
        id_cliente: req.body.id_cliente,
        total: 0,
        isvalido: true
    }

    try {
        productos = await pool.query('SELECT * FROM producto');
        console.log(productos);
        const result = await pool.query('INSERT INTO venta SET ? ', venta);
        insertid = result.insertId;
    } catch (error) {
        console.log(error);
    }

    const conceptos = [];

    if (Array.isArray(req.body.id)) {

        let producId = 0;
        let preciouni = 0;

        for (let index = 0; index < req.body.id.length; index++) {
            const elementa = Number(req.body.id[index]);

            for (let index2 = 0; index2 < productos.length; index2++) {
                const element = productos[index2];

                if (element.id === elementa) {
                    producId = Number(index2);
                    preciouni = element.preciounitario;
                }
            }

            conceptos[index] = {
                id_venta: insertid,
                id_producto: elementa,
                cantidad: req.body.cantidad[index],
                preciounitario: productos[producId].precio,
                importe: (Number(req.body.cantidad[index]) * Number(productos[producId].precio))
            }
            suma += conceptos[index].importe;

        }

    } else {
        let producId = 0;

        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];

            if (element.id === req.body.id) {
                producId = index;
            }
        }
        conceptos[0] = {
            id_venta: insertid,
            id_producto: req.body.id,
            cantidad: req.body.cantidad,
            preciounitario: productos[producId].precio,
            importe: (Number(req.body.cantidad) * Number(productos[producId].precio))
        }

        console.log(conceptos);
        suma += conceptos[0].importe;
    }



    try {

        conceptos.forEach(async (element) => {
            const result = await pool.query('INSERT INTO concepto SET ? ', element);
        });

        const result = await pool.query('UPDATE venta SET TOTAL=' + suma + ' WHERE id=' + insertid);

    } catch (error) {
        console.log(error);
    }


    res.redirect('/facturas/validar/'+insertid);



});

router.get('/facturas/validar/:id', async (req, res) => {

    const factura = (await pool.query('SELECT * FROM venta where id='+req.params.id))[0];
    let conceptos = await pool.query('SELECT * FROM concepto where id_venta='+req.params.id);

    const productos = await pool.query('SELECT * FROM producto');
    let i = 0;
    conceptos.forEach(element => {

        for (let index = 0; index < productos.length; index++) {
            const elemento = productos[index];
            if(element.id_producto === elemento.id){
                conceptos[i].nombre = elemento.nombre;
            }
            
            
        }
        i++;
    });

    const isvalido = !Boolean(factura.isvalido); 
    

    res.render('facturaventa', {factura,conceptos,isvalido});

});

router.get('/productos', async (req, res) => {


    let productos = [];
    await pool.query('SELECT * FROM producto').then(result => {
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            productos[index] = new Producto(element.id,element.nombre,element.precio,element.costo);
           
        }
    });
    
    res.render('productos', {productos});

});

router.get('/facturas/validado/:id', async (req,res) => {
    const result = await pool.query('UPDATE venta SET isvalido=' + false + ' WHERE id=' + req.params.id);
    res.redirect('/facturas');
});

router.get('/impresionesvalidas', async (req,res) => {
    let facturas;

    try {
        facturas = await pool.query('SELECT * FROM venta where isvalido=0 AND fecha >= CURDATE()');
        for (let index = 0; index < facturas.length; index++) {
            facturas[index].isvalido = Boolean(facturas[index].isvalido);
            
        }
    } catch (error) {

    }

    const imprimir = true;

    res.render('facturas', { facturas , imprimir});
});


module.exports = router;