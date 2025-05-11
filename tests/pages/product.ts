import { APIService } from '../api/base';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: {
      usertype: string;
    };
    category: string;
  };
}

class ProductService extends APIService {
  static property = "api";
  static path = "productsList";
  static status = "active";

  /**
   * Get all products list
   */
  static async getAllProducts() {
    return await this.fetch(`${this.property}/${this.path}`, {});
  }

  /**
   * Get product by ID
   */
  static async getProductById(id: string | number) {
    return await this.fetch(`${this.path}/${id}`, {});
  }

  /**
   * Search products
   */
  static async searchProducts(query: string) {
    return await this.fetch(`${this.path}/searchProduct`, { search_product: query });
  }
}

export default ProductService; 