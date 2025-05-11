import CRUDService from "../base";

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

class ProductService extends CRUDService {
  // static property = "product";
  static path = "productsList";
}

export default ProductService; 