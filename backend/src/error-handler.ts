import { FastifyInstance } from 'fastify';
import { ClientError } from './errors/client-error';
import { ZodError } from 'zod';

type FastyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Invalid inpit', errors: error.flatten().fieldErrors });
  }
  if (error instanceof ClientError) {
    reply.status(400).send({ error: error.message });
  }
  return reply.status(500).send({ message: 'Internal server error' });
};
