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
    id: '1', // corrigido: string
    name: 'Product',
    price: 10,
    category: 'C1',
    rating: 1,
    // sequelize properties (opcionalmente mockados, se necessários)
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
    toJSON: jest.fn(),
  } as unknown as Product;

  const createProductDto: CreateProductDto = {
    name: 'Product',
    price: 10,
    category: 'C1',
    rating: 1,
  };

  const updateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    price: 20,
    category: 'C2',
    rating: 5,
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
            update: jest.fn().mockResolvedValue({ ...mockProduct, ...updateProductDto }),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
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
  });

  it('should return one product by ID', async () => {
    const result = await productsController.findOne('1');
    expect(result).toBe(mockProduct);
  });

  it('should update a product by ID', async () => {
    const result = await productsController.update('1', updateProductDto);
    expect(result).toEqual({ ...mockProduct, ...updateProductDto });
  });

  it('should remove a product by ID', async () => {
    const result = await productsController.remove('1');
    expect(result).toEqual({ deleted: true });
  });
});
