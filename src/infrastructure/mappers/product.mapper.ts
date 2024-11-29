import { API_URL } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import type { TesloProduct } from "../interfaces/teslo-products.responses";

export class ProductMapper {
  static tesloProductToEntity( tesloProduct: TesloProduct ):Product{
    const { id, title, price, description, slug, stock, sizes, gender, tags, images } = tesloProduct
    
    return {
      id,
      title,
      price,
      description,
      slug,
      stock,
      sizes,
      gender,
      tags,
      images: images.map(image => `${ API_URL }/files/product/${ image }`)
    }
  } 
}