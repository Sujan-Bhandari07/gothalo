import { redis } from "@gothalo/shared"

const limits:Record<string,number>={
    chat:20,
    coding:5,
    ppt:5,
    search:5,
    pdf:5,
    vision:5,
    pdfrag:5,
    image:5
}


 const checkagentlimit=async(agent:string,id:string)=>{
    const max=limits[agent] ?? limits.chat
const key=`rate:${id}:${agent}`
const count =await redis.incr(key)
if(count == 1){
    await redis.expire(key,60) 
}
const ttl=await redis.ttl(key) 
if(count>max!){



    return {
        success:false,
        message:`You have reached the ${agent} limit (${max} requests/minute).Try again in ${ttl} `
    }
    
}else{
    return{
        success:true,
        message:"go ahead"
    }
}



 }

 export {checkagentlimit}