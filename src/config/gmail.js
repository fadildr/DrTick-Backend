const { google } = require("googleapis");

const clientId =
  "195785235442-43eveaacrpih7cc1hsq6e3d0qqi9p2nv.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04yUv_1CXrnbbCgYIARAAGAQSNwF-L9IrTl6zo1uRSPl2l8UgLT72OV5qR4ujEnVRy56-g3Y35h7y_0zurmSTgwI4Cv3BEbAZTho";

const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(clientId, clientSecret);
OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

const accessToken = OAuth2Client.getAccessToken;

module.exports = {
  clientId,
  clientSecret,
  accessToken,
  refreshToken,
};
