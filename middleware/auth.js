const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/userRepository");
const crypto = require("crypto");

const SECRET_KEY = "123456789asdjkfhsdfeury3ury3284yy32rhdoicksdmhrp2iuhefbdv";
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = await UserRepository.findUserById(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: "Not authorized" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = protect;
