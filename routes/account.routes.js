const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');

const db = require('../connection');
const sqlAcc = require('../sql/account');

const account = require('../middleware/account.middleware');
const error = require('../middleware/error.middleware');

const signToken = require('../functions/signToken');

// GET `v1/account/auth`
router.get(
  '/auth',
  account,
  async (req, res) => {
    try {
      const result = await db.one(sqlAcc.GET_EMAIL_BY_ID, req.token.id);
      return res.status(200).json(result);
    } catch (err) { 
      return res.status(500).json({ message: 'ОШИБКА' });
    }
  }
);

// POST `v1/account/login`
router.post(
  '/login', 
  [ 
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ],
  error,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await db.one(sqlAcc.GET_USER, email);

      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        return res.status(500).json({ msg: 'Error' });
      }

      const token = signToken(result.id);
      return res.status(200).json({ token, email });
    } catch (error) {
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

// POST `v1/account/registration`
router.post(
  '/registration', 
  [
    body('email', 'Error').normalizeEmail().isEmail(),
    body('password', 'Error').isLength({ min: 5 })
  ],
  error,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const isExist = await db.one(sqlAcc.CHECK_USER, email); 
      if (isExist.value) {
        return res.status(500).json({ msg: 'Пользователь существует' }); 
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await db.none(sqlAcc.ADD_USER, [email, hashedPassword]);

      const result = await db.one(sqlAcc.GET_ADDED);
      
      const token = signToken(result);
      return res.status(200).json({ token, email });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Error' });
    }
  }
);

module.exports = router;