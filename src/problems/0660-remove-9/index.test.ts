import { describe, expect, it } from "bun:test";
import { remove9 as newInteger } from ".";

describe("660. Remove 9", () => {
	it("solves the examples from the problem statement", () => {
		expect(newInteger(9)).toBe(10);
		expect(newInteger(10)).toBe(11);
	});

	it("matches skipping numbers containing 9 up to n = 10,000", () => {
		let value = 0;
		for (let n = 1; n <= 10_000; n++) {
			do value++;
			while (String(value).includes("9"));
			expect(newInteger(n)).toBe(value);
		}
	});

	it("gives a 32-bit integer without a 9 for the largest input", () => {
		const result = newInteger(8e8);
		expect(result).toBeLessThan(2 ** 31);
		expect(String(result)).not.toContain("9");
		expect(newInteger(8e8 + 1)).toBeGreaterThan(result);
	});
});
