import express from 'express';
// import authMiddleware from './middleware/auth.js';
// ***********  Versioning ***************** 
import userRoutes from './modules/users/routes.js';
import v1UserRoutes from './modules/users/v1/routes.js';


const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ********************  Header  ****************************
app.get('/headers',(req, res) => {
  // Accessing request headers
  const headers = req.headers;
  console.log('Request Headers:', headers); 

  // Setting response headers
  res.setHeader('X-Custom-Header', 'CustomValue');
  res.status(200).json({ message: 'Headers example', headers });
});

app.use(express.json());

import productRoutes from './modules/products/routes.js';
app.use('/products', productRoutes);

app.use('/api/users', userRoutes);
app.use('/api/v1/users', v1UserRoutes);

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

/**
 * Swagger definition
 */
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Demo",
      version: "1.0.0",
      description: "Simple API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/**/*.js"]
});

/**
 * Swagger route
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


