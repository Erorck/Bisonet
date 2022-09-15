const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.json({
        'success':true,
        'message':'Hola mundo',
        'Data': {
            "name": 'Felipe',
            "age": 3
        }
    });
});

app.listen(port, ()=>{
    console.log('Este es mi puerto ' + port);
});
