const express = require('express');
const routes = require('./routes/v1');
const { errors } = require('celebrate');

const app = express();

app.use(express.static('dist'));
app.use('/api/v1', routes);
app.use(errors());

app.listen(process.env.PORT || 8080, () => console.log(`✅ listening on port ${process.env.PORT || 8080}!`));
