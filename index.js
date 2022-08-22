require('dotenv').config();

const Client = require("linkedin-private-api").Client;

const argv = require('minimist')(process.argv.slice(2));
console.log(argv);

if(argv.job == undefined){
  console.log("argument job is required (--job=\"frontend\")");
  return ;
}

const username = process.env.EMAIL;// as string;
const password = process.env.PASSWORD;// as string;

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({ username, password });
  
  // Search for React development jobs in Tunisia
  const jobsScroller = await client.search.searchJobs({
    keywords: argv.job,
    filters: { location: argv.location || 'Tunisia' },
    limit: argv.count || 10,
    skip: argv.skip || 0,
  });

  const jobs = await jobsScroller.scrollNext();
  jobs.forEach(
  	job => console.log(
  		(job.hitInfo?.jobPosting?.companyDetails?.company?.name || "").padEnd(25, " ")
  		+ job.hitInfo?.jobPosting?.title
  	)
  )

})();
