// import JWT from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     next("Auth Failed");
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = JWT.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: payload.userId };
//     next();
//   } catch (error) {
//     next("Auth Failed");
//   }
// };

// export default userAuth;

import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      throw new Error("Auth Header Missing");
    }

    if (!authHeader.startsWith("Bearer")) {
      throw new Error("Invalid Token Format");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token Missing");
    }

    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export default userAuth;
