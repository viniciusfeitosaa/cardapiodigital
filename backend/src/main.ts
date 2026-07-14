import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Configuração do Swagger (API Documentation)
  const config = new DocumentBuilder()
    .setTitle('Cardápio Digital API')
    .setDescription('API para sistema de cardápio digital multi-tenant')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticação e autorização')
    .addTag('tenants', 'Gerenciamento de empresas/tenants')
    .addTag('users', 'Gerenciamento de usuários')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api-docs`);
}
bootstrap();
