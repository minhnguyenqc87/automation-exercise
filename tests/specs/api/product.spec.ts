import ProductService from "tests/api/services/product.service";
import BrandService from "tests/api/services/brand.service";

test.describe("Product API Tests", () => {
  test.beforeAll(async () => {
    await ProductService.init("https://automationexercise.com");
  });
  test("API 1: Get All Products List", async () => {
    // Get all products
    const response = await ProductService.fetch();

    // Verify response status
    expect(response.responseCode).toBe(200);

    // Verify products array exists and is not empty
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);

    // Verify first product structure
    const firstProduct = response.products[0];
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("name");
    expect(firstProduct).toHaveProperty("price");
    expect(firstProduct).toHaveProperty("brand");
    expect(firstProduct).toHaveProperty("category");

    // Verify category structure
    expect(firstProduct.category).toHaveProperty("usertype");
    expect(firstProduct.category.usertype).toHaveProperty("usertype");
    expect(firstProduct.category).toHaveProperty("category");
  });
  test("API 2: POST To All Products List", async () => {
    // Get all products
    try {
      const response = await ProductService.create({});
    } catch (error: any) {
      // Verify the error response
      expect(error.message).toContain("405");
      expect(error.message).toContain("This request method is not supported");
    }
  });
});
