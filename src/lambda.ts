import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Habilitar CORS si es necesario
  app.enableCors();

  await app.init();
  return serverlessExpress({ app: expressApp });
}

// Función que maneja la promesa correctamente
async function createServerIfNeeded(): Promise<Handler> {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer;
}

// ✅ Handler corregido sin el error de ESLint
export const handler: Handler = async (event, context, callback) => {
  try {
    const server = await createServerIfNeeded();
    return server(event, context, callback);
  } catch (error) {
    callback(error);
  }
};
