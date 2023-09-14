// importacion de librerias
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bases = process.env.DB;
require('dotenv').config();

router.get('/medicos_con_consultorios', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const medicosCollection = db.collection('medico');
        const consultoriosCollection = db.collection('consultorio');

        const medicosConConsultorios = await medicosCollection.find([
            {
                $lookup: {
                    from: 'consultorio',
                    localField: 'cons_nombre',
                    as: 'consultorio'
                }
            },
            {
                $unwind: '$consultorio'
            }
        ]).toArray();

        res.json(medicosConConsultorios);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;