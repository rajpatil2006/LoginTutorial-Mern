const express = require('express');
const app = express();
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const bodyParser = require('body-parser');
const cors= require('cors');

require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 5000;

app.get('/ping' , (req,res)=>{
    res.send(`PONG`);
})

app.use(bodyParser.json());
app.use(cors());   //Any port no can request , we can configure method to allow req from specific port, header(for security)
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}.`);
}
)