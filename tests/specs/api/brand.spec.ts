import BrandService from "tests/api/services/brand.service";

test.describe("Brand API Tests", () => {
  test.beforeAll(async () => {
    await BrandService.init("https://automationexercise.com");
  });
  test("API 3: Get All Brands List", async () => {
    // Get all brands
    const response = await BrandService.fetch();
    expect(response.responseCode).toBe(200);

    // Verify brands array exists and is not empty
    expect(response.brands).toBeDefined();
    expect(Array.isArray(response.brands)).toBe(true);
    expect(response.brands.length).toBeGreaterThan(0);

    // Verify first brands structure
    const firstProduct = response.brands[0];
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("brand");
  });
  test("API 4: PUT To All Brands List", async () => {
    try {
      // Try to update brands list (should fail)
      const response = await BrandService.update("", {});
    } catch (error: any) {
      // Verify the error response
      expect(error.message).toContain("405");
      expect(error.message).toContain("This request method is not supported");
    }
  });
});
