const { google } = require("googleapis");
const User = require('../models/userModel');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI 
);


const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];


const redirectToGoogleLogin = () => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    return authUrl; 
  } catch (error) {
    console.error("Error in redirectToGoogleLogin:", error);
  }
};

const handleTokens = async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code); 
    oauth2Client.setCredentials(tokens); 

   
    oauth2Client.on("tokens", (tokens) => {
      console.log('New Access Token:', tokens.access_token);
    });

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  } catch (error) {
    console.error("Error in handleTokens:", error);
    throw error; 
  }
};


const userInfo = async (access_token) => {
  try {
    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.email; 
    } else {
      throw new Error('Failed to fetch user info');
    }
  } catch (error) {
    console.error("Error in userInfo:", error);
    throw error; 
  }
};


const saveUser = async (access_token, refresh_token, email) => {
  try {
    const user = new User({
      access_token,
      refresh_token,
      email,
    });
    await user.save(); 
    console.log('User saved:', user);
  } catch (error) {
    console.error("Error in saveUser:", error);
  }
};


const authorizationFlow = async (code) => {
  try {
    const { access_token, refresh_token } = await handleTokens(code); 
    const email = await userInfo(access_token); 
    await saveUser(access_token, refresh_token, email); 
  } catch (error) {
    console.error("Error in authorizationFlow:", error);
  }
};


module.exports = { redirectToGoogleLogin, authorizationFlow };
