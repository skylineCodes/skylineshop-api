import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Kelsin Joe',
    email: 'kelsin@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Dale Billy',
    email: 'dale@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;