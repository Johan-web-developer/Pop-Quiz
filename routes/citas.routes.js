// importacion de librerias
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bases = process.env.DB;
require('dotenv').config();

router.get('/fecha_especifica', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const citasCollection = db.collection('cita');

        const fechaEspecifica = new Date('2023-09-15T10:00:00.000Z');
        const citas = await citasCollection.find({ cit_fecha: fechaEspecifica }).toArray();


        res.json(citas);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/citas_confirmadas_proximas', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const citasCollection = db.collection('cita');

        const ahora = new Date('2023-09-18T11:15:00.000+00:00');

        const citasConfirmadasProximas = await citasCollection.find({ cit_estadoCita: 'Confirmada', cit_fecha: ahora }).toArray();

        res.json(citasConfirmadasProximas);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/citas_en_fecha_especifica', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const citasCollection = db.collection('cita');

        const fechaEspecifica = new Date('2023-09-16T14:30:00.000+00:00'); 

        const citasEnFechaEspecifica = await citasCollection.find({
            cit_fecha: {
                $gte: new Date(fechaEspecifica.getFullYear(), fechaEspecifica.getMonth(), fechaEspecifica.getDate()),
                $lt: new Date(fechaEspecifica.getFullYear(), fechaEspecifica.getMonth(), fechaEspecifica.getDate() + 1)
            }
        }).toArray();
        res.json(citasEnFechaEspecifica);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;