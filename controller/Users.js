const bcrypt = require("bcryptjs");
const { Users } = require("../models/Users");
exports.registerUser = async (req, res) => {
  if (req.session.isuserAuth) {
    res.redirect("/");
  }
  try {
    const { useremail, userpass, confirmpass } = req.body;
    const isExist = await Users.findOne({ useremail: useremail });
    if (isExist) {
      throw new Error("User is Already Exists!");
    }
    if (userpass !== confirmpass) {
      throw new Error("Password and Confirm Password not matched");
    }
    const hashPass = await bcrypt.hash(userpass.trim(), 12);
    req.body.userpass = hashPass;
    const newUser = new Users(req.body);
    const response = await newUser.save();
    res.status(201).json({ Success: "User is successfully Created" });
  } catch (err) {
    console.log("Messages : " + err.message);
    res.status(400).json({ ERROR: err.message });
  }
};

// user login
exports.loginUser = async (req, res) => {
  try {
    req.session = req.session || {};
    const { useremail, password } = req.body;
    const isUserExist = await Users.findOne({ useremail: useremail });
    if (!isUserExist) {
      throw new Error("User is not Exists");
    }
    isPassMatch = await bcrypt.compare(password, isUserExist.userpass);
    if (!isPassMatch) {
      throw new Error("Invalid Password");
    }
    req.session.isuserAuth = true;
    req.session.username = isUserExist.username;
    res.status(200).json({ Success: "user login" });
  } catch (err) {
    console.log("UserLoginError : " + err.message);
    res.status(400).json({ ERROR: err.message });
  }
};
exports.restricted = (req, res) => {
  res.send("restricted");
};

// userVerified
exports.isuserAuth = (req, res, next) => {
  if (req.session.isuserAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Logout
exports.userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    return res.redirect("/");
  });
};
