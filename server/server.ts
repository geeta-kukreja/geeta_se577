// import  {repos}  from "./db";
import fastify, {FastifyContext, HTTPMethods, RequestGenericInterface} from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";
import dotenv from 'dotenv';

import {GetGHProxySecureOptions, GetGHProxyOptions } from "./proxy";

import cors from '@fastify/cors';
import { json } from "stream/consumers";
// const got = require('got')

dotenv.config();
const server = fastify()

let repos: any =[];
let gists: any =[];

let proxyOptsSecure = GetGHProxySecureOptions(process.env.GH_ACCESS_TOKEN)
server.register(fastifyHttpProxy, proxyOptsSecure)

let proxyOpts = GetGHProxyOptions()
server.register(fastifyHttpProxy, proxyOpts)

server.register(cors, {
  origin: "*"
})

server.get('/myData', async (request, reply) => {
try {
  const response = await server.inject({
  method: 'GET',
  url: '/ghsecure/users/geeta-kukreja/repos'
});
  repos = JSON.parse(response.payload);
  for (const element of repos) {
      var result = await getLastcommit(element.name);
      var updatedMsg = "\""+result.toString()+"\" " + element.updated_at;
      element.updated_at = updatedMsg;
      // console.log(element.updated_at);
}

// for (const element of repos) {
//   var result = await getStarGazer(element.name);
//   var updatedMsg = "\""+result.toString()+"\"  " + element.updated_at;
//   element.updated_at = updatedMsg;
//   // console.log(element.updated_at);
// }
// repos.forEach(async(element: { name: string; updated_at: string; stargazers:string[] }) => {

// });

return repos;
 } catch (error) {
  console.error(error);
  reply.code(500).send('Internal Server Error');
}
});

server.get('/myGists', async (request, reply) => {
  try {
    const response = await server.inject({
    method: 'GET',
    url: '/ghsecure/users/geeta-kukreja/gists'
  });
    gists = JSON.parse(response.payload);
    for (const element of gists) {
      const firstKey = Object.keys(element.files)[0];
      const filename = element.files[firstKey].filename;
      console.log(filename)
      element.files = filename;
      // console.log(element.files[firstKey].type)
      // element.type = element.files[firstKey].type;
      // console.log(element.updated_at);
}
  return gists;
   } catch (error) {
    console.error(error);
    reply.code(500).send('Internal Server Error');
  }
  });


interface requestQry extends RequestGenericInterface {
  Querystring: {
id: number,
name: string
}
}
async function getLastcommit(repoName : string){
const response = await server.inject({
    method: 'GET',
    url: '/ghsecure/repos/geeta-kukreja/'+repoName+'/commits'
  });
  let commits = JSON.parse(response.payload);
  if(commits.length == 0 || commits[0] == undefined) 
    return "No commits found"
  else 
  return commits[0].commit['message'];
}

// async function getStarGazer(repoName : string){
//   const response = await server.inject({
//       method: 'GET',
//       url: '/ghsecure/repos/geeta-kukreja/'+repoName+'/commits'
//     });
//     let commits = JSON.parse(response.payload);
//     if(commits.length == 0 || commits[0] == undefined) 
//       return "No commits found"
//     else 
//     return commits[0].commit['message'];
//   }

// const Callcommit = async (repoName: { name: any; updated_at?: string; stargazers?: string[]; }) => {
 

// }

server.get<requestQry>('/search', async (request, reply) => {
    const response = await server.inject({
      method: 'GET',
      url: '/ghsecure/users/geeta-kukreja/repos'
    });
    repos = JSON.parse(response.payload);
    // repos = JSON.parse(repos)
    const { id,name } = request.query;
    if (id){
        const repo = repos.find((element: { id: number; }) => element.id == id);
        if (repo) {
            return [repo];
        } else {
            let errObj = {error: `Repository = ${id} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else if (name){
        const repo  = repos.find((element: { name: string; }) => element.name == name);
        if (repo) {
          return [repo];
      } else {
            let errObj = {error: `Repository = ${id} was not found with name = ${name} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else {
        let errObj = {error: "The /search API requires an id or Repo name query parameter"};
        reply.code(400).send(errObj);
        return
    }
  })

  server.get<requestQry>('/commits', async (request, reply) => { 
    const response = await server.inject({
      method: 'GET',
      url: '/ghsecure/users/geeta-kukreja/repos'
    });
    repos = JSON.parse(response.payload);
    // repos = JSON.parse(repos)
    const name = request.query;
    if (name){
        const repo  = repos.find((element: { name: string; }) => name == name);
        if (repo) {
          return [repo];
      } else {
            let errObj = {error: `Commits with name = ${name} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else {
        let errObj = {error: "The /search API requires Repo name query parameter"};
        reply.code(400).send(errObj);
        return
    }
  })

server.listen({ port: 9500 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})