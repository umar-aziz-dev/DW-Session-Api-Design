import express from 'express';
import authMiddleware from './middleware/auth.js';




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

// ***********  Versioning ***************** 
import userRoutes from './modules/users/routes.js';
import v1UserRoutes from './modules/users/v1/routes.js';

app.use('/api/users', userRoutes);
app.use('/api/v1/users', v1UserRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});