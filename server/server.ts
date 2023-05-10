import  {repos}  from "./db";
import fastify, {RequestGenericInterface} from "fastify";
import cors from '@fastify/cors';


const server = fastify()

server.register(cors, {
    origin: "*"
})

server.get('/repositories', async (request, reply) => {
  return repos;
})

interface requestId extends RequestGenericInterface {
    Params: {
      id: number
    }
}

server.get<requestId>('/repositories/:id', async (request, reply) => {
    const { id } = request.params;
    const repo = repos.find(element => element.id == id);
    if (repo) {
        return repo;
    } else {
        let errObj = {error: `Repository = ${id} was not found`};
        reply.code(404).send(errObj);
        return
    }
  })



interface requestQry extends RequestGenericInterface {
    Querystring: {
      id: number,
      name: string
    }
}

server.get<requestQry>('/search', async (request, reply) => {
    const { id,name } = request.query;
    
    if (id){
        const repo = repos.find(element => element.id == id);
        if (repo) {
            return [repo];
        } else {
            let errObj = {error: `Repository = ${id} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else if (name){
        const repo  = repos.find(element => element.repo == name);
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