import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import type { TesloProduct } from "../../infrastructure/interfaces/teslo-products.responses";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
  // console.log({ page, limit });

  try {
    const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * 10}&limit=${limit}`)
    const products = data.map( ProductMapper.tesloProductToEntity )

    // console.log(products[0]);
    
    return products
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products')
  }
}