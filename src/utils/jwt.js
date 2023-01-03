import jwt from 'jsonwebtoken'

export default {
  sign: (payload) => jwt.sign(payload, 'olma'),
  verify: (token) => jwt.verify(token, 'olma'),
};
