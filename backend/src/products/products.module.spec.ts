// src/products/products.module.spec.ts

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request, { Response as SuperTestResponse } from 'supertest'; // Mantendo a correção do supertest
import {
  SequelizeModule,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ProductsModule } from './products.module'; // Este importa o ProductModule corrigido
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model'; // <--- ALTERADO AQUI (para corresponder ao nome e caminho do arquivo do modelo)

// A constante databaseConnection DEVE usar o 'Product' importado acima
const databaseConnection: SequelizeModuleOptions = {
  dialect: 'sqlite',
  omitNull: true,
  autoLoadModels: true, // Sequelize tentará carregar modelos
  synchronize: true,    // Sincroniza o schema - útil para testes com DB em memória
  logging: false,
  models: [Product],    // Certifique-se que este 'Product' é a classe importada e não undefined
};

const createProductDto: CreateProductDto = {
  name: 'Product1',
  price: 10,
  category: 'C1',
  rating: 1,
};

const updateProductDto: UpdateProductDto = {
  name: 'Product1-updated',
  price: 11,
  category: 'C2',
  rating: 2,
};

describe('ProductsModule (E2E)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(databaseConnection), // Usa a conexão com o Product model correto
        ProductsModule,                              // ProductsModule agora também usa o Product model correto
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  // ... o restante dos seus testes E2E (GET, POST, PUT, DELETE) ...
  // Lembre-se de que as callbacks do .expect() devem ter 'res: SuperTestResponse'

  it('GET /products should return an empty array initially', async () => {
    return request(httpServer)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect([]);
  });

  it('POST /products should create a new product', async () => {
    return request(httpServer)
      .post('/products')
      .send(createProductDto)
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res: SuperTestResponse) => { // Não esqueça de tipar o 'res'
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toEqual(createProductDto.name);
        expect(res.body.price).toEqual(createProductDto.price);
        expect(res.body.category).toEqual(createProductDto.category);
        expect(res.body.rating).toEqual(createProductDto.rating);
      });
  });

  // Adicione os tipos SuperTestResponse para os outros .expect() também
  // ... (PUT /products/:id) ...
  // ... (DELETE /products/:id) ...


  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});