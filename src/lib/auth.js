module.exports = {
    isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.render("/signin");
    },
    isNotLoggedIn(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      return res.render("/perfil");
    },
  };
  