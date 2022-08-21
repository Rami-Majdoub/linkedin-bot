require('dotenv').config();

const Client = require("linkedin-private-api").Client;

const username = process.env.EMAIL;// as string;
const password = process.env.PASSWORD;// as string;

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({ username, password });
  
  // Search for React development jobs in Tunisia
  const jobsScroller = await client.search.searchJobs({
    keywords: 'frontend',
    filters: { location: 'Tunisia' },
    limit: 50,
    skip: 0,
  });

  const jobs = await jobsScroller.scrollNext();
  jobs.forEach(
  	job => console.log(
  		job.hitInfo?.jobPosting?.companyDetails?.company?.name?.padEnd(20, " ")
  		+ job.hitInfo?.jobPosting?.title
  	)
  )

})();
