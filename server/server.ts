// import  {repos}  from "./db";
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
    repos = reply.send(response.payload);
    console.log(repos);
    return repos;
  } catch (error) {
    console.error(error);
    reply.code(500).send('Internal Server Error');
  }
});

// interface requestId extends RequestGenericInterface {
//     Params: {
//       id: number
//     }
// }

// server.get<requestId>('/repositories/:id', async (request, reply) => {
//     const { id } = request.params;
//     const repo = repos.find(element => element.id == id);
//     if (repo) {
//         return repo;
//     } else {
//         let errObj = {error: `Repository = ${id} was not found`};
//         reply.code(404).send(errObj);
//         return
//     }
//   })



interface requestQry extends RequestGenericInterface {
    Querystring: {
      id: number,
      name: string
    }
}

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
        const repo  = repos.find((element: { name: string; }) => element.name == name);
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

server.listen({ port: 9500 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})