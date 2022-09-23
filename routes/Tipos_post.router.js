const express = require('express');
var faker = require('faker');
const router = express.Router();

//Consulta compleja TO DI
router.get('/get/tipos_post/Avisos/', async (req, res) =>{
    const tpost_avisos = [];
    const {size} = req.query;
   for (let index = 0; index < size; index++) {
    tpost_avisos.push({
            Convocatorias: {
                texto : faker.lorem.text(),
                fecha : faker.date.past(),
                active : faker.datatype.boolean()
            },
            Tramites: {
                texto : faker.lorem.text(),
                fecha : faker.date.past(),
                active : faker.datatype.boolean()
            },
            Comunicados: {
                texto : faker.lorem.text(),
                fecha : faker.date.past(),
                active : faker.datatype.boolean()
            },
        });
    }
    res.json(tpost_avisos);
});

router.get('/get/tipos_post/Eventos/', async (req, res) =>{
    const tpost_avisos = [];
    const {size} = req.query;
   for (let index = 0; index < size; index++) {
    tpost_avisos.push({
            Deportivos: {
                texto : faker.lorem.text(),
                fecha : faker.date.past(),
                active : faker.datatype.boolean()
            },
            Culturales: {
                texto : faker.lorem.text(),
                fecha : faker.date.past(),
                active : faker.datatype.boolean()
            },
        });
    }
    res.json(tpost_avisos);
});

module.exports = router;