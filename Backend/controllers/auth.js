const { google } = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);


const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];


const redirectToGoogleLogin = () => {

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  // Return the URL for redirection
  return authUrl;
};

