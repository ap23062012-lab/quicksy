const adminMiddleware = (req, res, next) => {
  // We assume authMiddleware has already run and added req.user
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = adminMiddleware;