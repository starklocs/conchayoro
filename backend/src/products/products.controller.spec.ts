// src/products/products.controller.spec.ts

import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getModelToken } from '@nestjs/sequelize';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  const mockProduct: Product = {
    id: 1, // Assumindo que o ID é number, ajuste para string se Product.id for string
    name: 'Test Product',
    price: 100,
    category: 'Electronics',
    rating: 5,
    $get: jest.fn(),
    $set: jest.fn(),
    $add: jest.fn(),
    $count: jest.fn(),
    $create: jest.fn(),
    $has: jest.fn(),
    $remove: jest.fn(),
    $reload: jest.fn(),
    $setAssociation: jest.fn(),
    $addAssociation: jest.fn(),
    $hasAssociation: jest.fn(),
    $removeAssociation: jest.fn(),
    $getAssociation: jest.fn(),
    $countAssociation: jest.fn(),
    $createAssociation: jest.fn(),
    toJSON: jest.fn(() => ({
      id: 1,
      name: 'Test Product',
      price: 100,
      category: 'Electronics',
      rating: 5,
    })),
  } as unknown as Product;

  const createProductDto: CreateProductDto = {
    name: 'New Product',
    price: 50,
    category: 'Books',
    rating: 4,
  };

  const updateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    price: 150,
    category: 'Home',
    rating: 3,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue({ ...mockProduct, ...updateProductDto, id: mockProduct.id }),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
            findByCriteria: jest.fn().mockResolvedValue([mockProduct]),
          },
        },
        {
          provide: getModelToken(Product),
          useValue: {},
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  it('should create a product', async () => {
    const result = await productsController.create(createProductDto);
    expect(result).toBe(mockProduct);
    expect(productsService.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should return all products', async () => {
    const result = await productsController.findAll();
    expect(result).toEqual([mockProduct]);
    expect(productsService.findAll).toHaveBeenCalled();
  });

  it('should return one product by ID', async () => {
    const id = mockProduct.id.toString();
    const result = await productsController.findOne(id);
    expect(result).toBe(mockProduct);
    expect(productsService.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a product by ID', async () => {
    const id = mockProduct.id.toString();
    const expectedUpdatedProduct = { ...mockProduct, ...updateProductDto, id: mockProduct.id };
    const result = await productsController.update(id, updateProductDto);
    expect(result).toEqual(expectedUpdatedProduct);
    expect(productsService.update).toHaveBeenCalledWith(id, updateProductDto);
  });

  it('should remove a product by ID', async () => {
    const id = mockProduct.id.toString();
    const result = await productsController.remove(id);
    expect(result).toEqual({ deleted: true });
    expect(productsService.remove).toHaveBeenCalledWith(id);
  });

  // -------- NOVO TESTE (findByCriteria) --------
  it('should return an array of products by criteria', async () => {
    const mockedResponseData = [mockProduct]; // Retorno esperado
    const criteria = { category: 'C1' }; // Critério de busca

    // MUDANÇA AQUI: use toEqual ou toStrictEqual para comparar arrays/objetos
    expect(await productsController.findByCriteria(criteria)).toEqual( // Alterado de toBe para toEqual
      mockedResponseData
    );
    expect(productsService.findByCriteria).toHaveBeenCalledWith(criteria);
  });
  // --------------------------------------------
});