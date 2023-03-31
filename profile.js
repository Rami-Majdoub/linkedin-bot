require('dotenv').config();

const Client = require("linkedin-private-api").Client;

const username = process.env.EMAIL;// as string;
const password = process.env.PASSWORD;// as string;

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({ username, password });
  
  const peopleScroller = await client.search.searchPeople({
    keywords: 'rami majdoub'
  });
  const profiles = await peopleScroller.scrollNext();
  
  profiles.forEach(
  	({ profile }) => console.log(
  		profile.firstName
  		+ " "
  		+ profile.lastName
  		+ " @"
  		+ profile.publicIdentifier
  	)
  )

})();
