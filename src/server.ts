import 'dotenv/config';
import { fastify } from 'fastify';

import fastifyMultipart from '@fastify/multipart';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';
import { env } from './env.ts';
import { getRoomsRoute } from './HTTP/Routes/getrooms.ts';
import { createRoomRoute } from './HTTP/Routes/create-room.ts';
import { getRoomQuestions } from './db/schema/get-room-questions.ts';
import { createQuestionRoute } from './HTTP/Routes/create-question.ts';
import { uploadAudioRoute } from './HTTP/Routes/upload-audio-route.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});
app.register(fastifyMultipart);
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'OK';
});
app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT });
