import { describe, expect, it } from "bun:test";
import { sumMultiples } from ".";

describe("2652. Sum Multiples", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumMultiples(7)).toBe(21);
		expect(sumMultiples(10)).toBe(40);
		expect(sumMultiples(9)).toBe(30);
	});

	it("matches checking each integer", () => {
		for (let n = 1; n <= 300; n++) {
			let sum = 0;
			for (let x = 1; x <= n; x++)
				if (x % 3 === 0 || x % 5 === 0 || x % 7 === 0) sum += x;
			expect(sumMultiples(n)).toBe(sum);
		}
	});
});
