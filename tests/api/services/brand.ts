import CRUDService from "../base";

interface Brand {
  id: number;
  brand: string;
}

class BrandService extends CRUDService {
  static path = `brandsList`;   
}

export default BrandService; 