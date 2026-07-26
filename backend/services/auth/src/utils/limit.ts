import { err, redis, tryCatch } from "@gothalo/shared";

const limit=tryCatch(async(req ,res ,next)=>{
     const ip =req.ip
     const key=`rate:limit:${ip}`
     const request=await redis.incr(key)
     if(request===1){
        await redis.expire(key,60)
     }
     if(request>5){
        const ttl=await redis.ttl(key)
        return err(res,`Rate limit exceeded. Try again in ${ttl} seconds.`)

         
     }
     else{
        next()
     }
})

export{limit}