const METERED_ENDPOINTS = ["/api/v1/salesforce"];

class Metered {
  constructor() {
    this.handle = this.handle.bind(this); // Bind the context of 'handle' method to the 'Metered' class
  }

  async handle(req, res, next) {
    console.info("ℹ️ ", new Date().toISOString(), ":", req.path);
    if (this.isMeteredEndpoint(req.path)) {
      // if it's a metered endpoint, check if the user is authenticated
      if (req.session && req.session.passport && req.session.passport.user) {
        req.session.save();
      } else {
        return res.status(401).send({
          message: "You are not logged in.",
        });
      }
    }

    next();
  }

  isMeteredEndpoint(path) {
    let isMetered = false;
    METERED_ENDPOINTS.forEach((endpoint) => {
      if (path.startsWith(endpoint)) {
        isMetered = true;
      }
    });
    return isMetered;
  }
}

module.exports = new Metered();
