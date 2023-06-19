import { sign, verify } from 'jsonwebtoken';

function generateToken(payload) {
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: '6h'
  });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export default {
  generateToken,
  verifyToken
};
