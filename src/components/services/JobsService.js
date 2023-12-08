export class JobsService{
     async getJobs(email){
         await fetch("https://xrz0f1xcc1.execute-api.us-west-1.amazonaws.com/Production/jobs/"+email).
         then((res)=>res.json())
         .then((data)=>{ return data;})
     }
}
