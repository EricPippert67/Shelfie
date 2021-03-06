require('dotenv').config();
const express = require('express');
const massive = require('massive');
const {SERVER_PORT, SERVER_CONNECTION} = process.env;
const app = express();
const port = SERVER_PORT;
const ctrl = require('./controller')

app.use(express.json())

massive({
    connectionString: SERVER_CONNECTION,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
.catch(err => console.log(err));

app.get('/api/inventory', ctrl.getInventory)
app.get('/api/inventory/:id', ctrl.getProduct)
app.post('/api/inventory', ctrl.createProduct)
app.delete('/api/inventory/:id', ctrl.deleteProduct)
app.put('/api/inventory/:id', ctrl.editProduct)

app.listen(port, () => console.log(`server is finally running ${port}`))
