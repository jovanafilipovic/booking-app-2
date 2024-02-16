const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ msg: "Pogrešan email ili lozinka", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({ msg: "Pogrešan email ili lozinka", status: false });

    // Ukoliko su email i lozinka validni
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({userId: user._id}, secretKey, {
      expiresIn: "1h",  // definisali smo da token istice nakon 1h
    })

    delete user.password;
    return res.json({ status: true, user, token });

  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET_KEY;

  if(!token) {
    return res.status(401).json({msg: "Token missing, authorization denied."});
  }

  try {

    const decoded = jwt.verify(token, secretKey);
    res.userId = decoded.userId;
    next();
    
  } catch(ex) {
    return res.status(401).json({msg: "Token is not valid"});
  }
}

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
