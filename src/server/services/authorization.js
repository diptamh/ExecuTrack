import jsforce from "jsforce";

class Authorization {
  constructor(instance_url) {
    const baseOauth = {
      loginUrl: instance_url,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri:
        connected_app[
          process.env.PRODUCTION == "true" ? "redirect_uri" : "dev_redirect_uri"
        ],
    };

    this.oauth2 = new jsforce.OAuth2(baseOauth);
  }

  // step 1
  getAuthorizationUrl(state) {
    return this.oauth2.getAuthorizationUrl({
      scope: "api web refresh_token",
      immediate: false,
      state,
    });
  }

  // step 2
  async completeCallback(code) {
    const conn = new jsforce.Connection({ oauth2: this.oauth2 });
    const { accessToken, instanceUrl, refreshToken } = await conn.authorize(
      code
    );
    this.conn = conn;
    return { accessToken, instanceUrl, refreshToken };
  }

  // step 3
  getConnection() {
    return this.conn;
  }
}

export default Authorization;
