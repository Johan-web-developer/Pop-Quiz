const express = require('express');
const router = express.Router();
const routerUsers = require('../routes/usuarios.routes');
const routerCita = require('../routes/citas.routes');
const routerMedico = require('../routes/medicos.routes');
const routerConsultorio = require('../routes/consultorios.routes');

class Server{
    constructor() {
        this.app = express();
        this.middleware();
        this.port = process.env.PORT;
        this.routes();
    }
    middleware() {
        this.app.use(express.json());
    }
    routes(){
        this.app.use('/api/pacientes', routerUsers);
        this.app.use('/api/citas', routerCita);
        this.app.use('/api/medicos', routerMedico);
        this.app.use('/api/consultorios', routerConsultorio);
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`)
        });
    }
}


module.exports = Server;