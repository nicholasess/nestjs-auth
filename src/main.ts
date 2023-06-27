import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import { setQueryStringList } from './utils/setQueryStringList';

const logger: Logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('Kindr3 Documentation')
    .setVersion('1.0')
    .build();

  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(setQueryStringList());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(appPort, () => {
    logger.log(`The server is listening on PORT ${appPort}`);
  });
}
bootstrap();
