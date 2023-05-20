import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        next(err);
      }

      req.user = user;
      next();
    });
  } else {
    return res.json({
      status: "error",
      message: "you are not authorized",
    });
  }
};

export const verfyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user?.isAdmin) {
      next();
    } else {
      next("error");
    }
  });
};

export const verfyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      next("error");
    }
  });
};
