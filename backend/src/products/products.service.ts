// src/products/products.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  create(createProductDto) {
    // lógica real ou mockada
  }

  findAll() {
    // lógica
  }

  findOne(id: number) {
    // lógica
  }

  update(id: number, dto) {
    // lógica
  }

  remove(id: number) {
    // lógica
  }
}
