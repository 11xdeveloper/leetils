import { describe, expect, it } from "bun:test";
import { minimumNonZeroProductOfTheArrayElements as minNonZeroProduct } from ".";

describe("1969. Minimum Non-Zero Product of the Array Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNonZeroProduct(1)).toBe(1);
		expect(minNonZeroProduct(2)).toBe(6);
		expect(minNonZeroProduct(3)).toBe(1512);
	});

	it("matches the exact product for small p", () => {
		for (let p = 1; p <= 6; p++) {
			const largest = 2n ** BigInt(p) - 1n;
			const exact = largest * (largest - 1n) ** (largest / 2n);
			expect(minNonZeroProduct(p)).toBe(Number(exact % 1_000_000_007n));
		}
	});

	it("handles p = 60", () => {
		expect(minNonZeroProduct(60)).toBeLessThan(1_000_000_007);
	});
});
