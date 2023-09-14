// importacion de librerias
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bases = process.env.DB;
require('dotenv').config();

router.get('/orden_alfabetico', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const usuariosCollection = db.collection('usuario');
        const usuarios = await usuariosCollection.find().sort({ usu_nombre: 1 }).toArray();
        res.json(usuarios);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;