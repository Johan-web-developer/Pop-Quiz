// importacion de librerias
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bases = process.env.DB;
require('dotenv').config();


router.get('/medicos_cardiologia', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const medicosCollection = db.collection('medico');

        const medicosCardiologia = await medicosCollection.find({ med_especialidad : 'Cardiología' }).toArray();

        res.json(medicosCardiologia);
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/medico_especifico', async (req, res) => {
    try {
        const client = new MongoClient(bases, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('EPS-Campus');
        const citasCollection = db.collection('cita');
        const medicosCollection = db.collection('medico');

        const medicoEspecifico = await medicosCollection.findOne({ med_nroMatriculaProfesional: '123456' });

        const citasConMedicoEspecifico = await citasCollection.find({ med_nombreCompleto: medicoEspecifico }).toArray();

        const pacientesIds = citasConMedicoEspecifico.map(cita => cita.pacienteId);

        const pacientesCollection = db.collection('usuario');
        const pacientes = await pacientesCollection.find({ usu_nombre: 'Juan'}).toArray();

        res.json({ medico: medicoEspecifico, pacientes });
        client.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;