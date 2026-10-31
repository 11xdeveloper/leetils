import { describe, expect, it } from "bun:test";
import { minimumArrayEnd as minEnd } from ".";

describe("3133. Minimum Array End", () => {
	it("solves the examples from the problem statement", () => {
		expect(minEnd(3, 4)).toBe(6);
		expect(minEnd(2, 7)).toBe(15);
	});

	it("matches building the array greedily", () => {
		for (let x = 1; x <= 20; x++)
			for (let n = 1; n <= 20; n++) {
				let value = x;
				for (let i = 1; i < n; i++) value = (value + 1) | x;
				expect(minEnd(n, x)).toBe(value);
			}
	});

	it("handles results beyond 32 bits", () => {
		expect(minEnd(1e8, 2 ** 26 - 1)).toBe((1e8 - 1) * 2 ** 26 + 2 ** 26 - 1);
	});
});
