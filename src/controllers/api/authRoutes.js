const passport = require("passport");
const { isTokenBlacklisted, blacklistedTokens } = require('../config/passportConfig');

exports.getLogin = (req, res) => {
  req.flash("error", "");
  res.render("login");
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, { customer, token }, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!customer) {
      req.flash("error", info.message);
      return res.redirect("/auth/login");
    }

    // Ensure req.logIn is called to serialize the customer into the session
    req.logIn(customer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Authentication successful:", req.customer);

      // Send the token in the response
      res.status(200).json({ token });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  console.log('Logout route called');
  console.log('Token in headers:', req.headers.authorization);
  console.log('customer before logout:', req.customer);

  // Extract the token from the Authorization header
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.split(' ')[1];

    // Check if the token is blacklisted
    if (!isTokenBlacklisted(token)) {
      // Add the token to the blacklist
      blacklistedTokens.add(token);  
      console.log('Token added to blacklist:', token);
    } else {
      console.log('Token already blacklisted:', token);
    }

    console.log('Session before session destroy:', req.session);

    // Clear customer data in the current session
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('customer after logout:', req.customer);
      req.session.destroy();
      console.log('customer after session destroy:', req.customer);

      return res.status(200).json({ message: 'Logout successful' });
    });

  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};