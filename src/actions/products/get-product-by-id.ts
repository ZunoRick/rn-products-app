import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import type { TesloProduct } from "../../infrastructure/interfaces/teslo-products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductById = async (id: string):Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`)
    return ProductMapper.tesloProductToEntity(data)
  } catch (error) {
    console.log(error);
    throw new Error(`Error getting product by ${id}`)
  }
}