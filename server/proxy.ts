import { FastifyHttpProxyOptions } from '@fastify/http-proxy'; 


export function GetGHProxySecureOptions(GHAccessToken: string | undefined) : FastifyHttpProxyOptions {
    return {
        upstream: 'https://api.github.com',
        prefix: 'ghsecure', 
        httpMethods: ['GET', 'POST'],
        replyOptions: {
            rewriteRequestHeaders: (origReq, headers) => {
                return {
                    ...headers,
                    authorization: `Bearer ${GHAccessToken}`
                }
            } 
        } 
    }
}

export function GetGHProxyOptions() : FastifyHttpProxyOptions {
    return {
        upstream: 'https://api.github.com',
        prefix: 'ghproxy', 
        httpMethods: ['GET', 'POST']
    }
}



