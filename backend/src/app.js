const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {errors} = require('celebrate');

const app = express();

/*inplementação não utilizada. Segurança*/
app.use(cors());
/* -------------------------------------*/
app.use(express.json()); 
app.use(routes);
app.use(errors())

app.listen(3333);