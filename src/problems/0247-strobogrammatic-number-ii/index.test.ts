import { describe, expect, it } from "bun:test";
import { strobogrammaticNumber } from "../0246-strobogrammatic-number";
import { strobogrammaticNumberII } from ".";

describe("247. Strobogrammatic Number II", () => {
	it("solves the examples from the problem statement", () => {
		expect(strobogrammaticNumberII(2)).toEqual(["11", "69", "88", "96"]);
		expect(strobogrammaticNumberII(1)).toEqual(["0", "1", "8"]);
	});

	it("matches checking every number of each length up to 6 digits", () => {
		for (let n = 1; n <= 6; n++) {
			const first = n === 1 ? 0 : 10 ** (n - 1);
			const expected: string[] = [];
			for (let x = first; x < 10 ** n; x++) {
				if (strobogrammaticNumber(String(x))) expected.push(String(x));
			}
			expect(strobogrammaticNumberII(n).toSorted()).toEqual(expected);
		}
	});

	it("handles the constraint of 14 digits", () => {
		const numbers = strobogrammaticNumberII(14);
		expect(numbers).toHaveLength(4 * 5 ** 6);
		for (const number of numbers.slice(0, 1000)) {
			expect(number).toHaveLength(14);
			expect(strobogrammaticNumber(number)).toBeTrue();
		}
	});
});
