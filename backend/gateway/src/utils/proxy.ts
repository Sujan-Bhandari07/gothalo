import proxy from "express-http-proxy"

export const proxywithheader=(serviceurl:string)=>{
    return proxy(serviceurl,{
        proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
            if (srcReq.user?._id) {
        proxyReqOpts.headers["user-id"] = srcReq.user._id.toString()
    }
    return proxyReqOpts
        }
    })
}