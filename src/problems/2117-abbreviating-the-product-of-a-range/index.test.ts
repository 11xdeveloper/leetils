import { describe, expect, it } from "bun:test";
import { abbreviatingTheProductOfARange as abbreviateProduct } from ".";

describe("2117. Abbreviating the Product of a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(abbreviateProduct(1, 4)).toBe("24e0");
		expect(abbreviateProduct(2, 11)).toBe("399168e2");
		expect(abbreviateProduct(371, 375)).toBe("7219856259e3");
	});

	it("abbreviates long products", () => {
		// 15! = 1307674368000.
		expect(abbreviateProduct(1, 15)).toBe("1307674368e3");
		// 20! = 2432902008176640000.
		expect(abbreviateProduct(1, 20)).toBe("24329...17664e4");
		expect(abbreviateProduct(1, 10_000)).toMatch(/^28462\.\.\.\d{5}e2499$/);
	});
});
