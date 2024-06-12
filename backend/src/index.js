const express = require('express');
const routes = require('./routes');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));
app.use(routes);

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
} catch (error) {
    console.log(error);
}

