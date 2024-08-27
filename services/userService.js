const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const SECRET_KEY = '123456789asdjkfhsdfeury3ury3284yy32rhdoicksdmhrp2iuhefbdv'; 
const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  const existingUser = await UserRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  console.log(userData, hashedPassword)
  return await UserRepository.createUser({...userData, password: hashedPassword});
};


const fetchUser = async(username) => {
  const user = await UserRepository.findUserById(username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

const findById = async (id) => {
  const user = await UserRepository.findUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const authenticateUser = async (username, password) => {
    const user = await UserRepository.findUserByUsername(username);
    if (!user) throw new Error('User not found');
  
    console.log(password, user.password)
    const hashedPassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    console.log(isPasswordValid)
    if (!isPasswordValid) throw new Error('Invalid password');
  
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    console.log(SECRET_KEY)
    return token;
  };
  
  const verifyToken = async (token) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new Error('Invalid token');
    }
  };


const loginUser = async (username, password) => {
    const user = await UserRepository.findUserByUsername(username);
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid username or password');
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  
    return { user, token };
  };

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  verifyToken,
  fetchUser,
  findById
};
