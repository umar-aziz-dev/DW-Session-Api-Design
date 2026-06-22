import express from 'express';

const router = express.Router();

//  Sample users 
const users = [
  { id: 1, name: 'Umar Aziz', email: 'umar10022004@gmail.com' },
  { id: 2, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 4, name: 'Alice Johnson', email: 'Alice@gmail.com' }];

// GET all users
router.get('/', (req, res) => {

  // Users with changed field name from v1 
  const usersV2 = users.map(user => ({
    userId: user.id,
    fullName: user.name,
    emailAddress: user.email
  }));
  res.status(200).json(usersV2);
});

export default router;