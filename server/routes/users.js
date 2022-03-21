const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
          return res.json({
              loginSuccess: false,
              message: "Auth failed, email not found"
          });

      user.comparePassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
              return res.json({ loginSuccess: false, message: "Wrong password" });

          user.generateToken((err, user) => {
              if (err) return res.status(400).send(err);
              res.cookie("x_authExp", user.tokenExp);
              res
                  .cookie("x_auth", user.token)
                  .status(200)
                  .json({
                      loginSuccess: true, userId: user._id
                  });
          });
      });
  });
});

//role 0 => 일반유저 role 0이 아니면 관리자
router.get('/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.roll === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true
      })
    })
})

module.exports = router;