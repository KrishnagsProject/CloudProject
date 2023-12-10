export class JobsService{
     async getJobs(email){
         await fetch("https://kbv2lyg353.execute-api.us-west-1.amazonaws.com/Production/jobs/"+email).
         then((res)=>res.json())
         .then((data)=>{ return data;})
     }
}
