import { describe, expect, it } from "bun:test";
import { minimumAdditionToMakeIntegerBeautiful as makeIntegerBeautiful } from ".";

describe("2457. Minimum Addition to Make Integer Beautiful", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeIntegerBeautiful(16, 6)).toBe(4);
		expect(makeIntegerBeautiful(467, 6)).toBe(33);
		expect(makeIntegerBeautiful(1, 1)).toBe(0);
	});

	it("matches scanning upwards on small inputs", () => {
		const digitSum = (v: number): number =>
			[...String(v)].reduce((s, d) => s + Number(d), 0);
		for (let n = 1; n <= 300; n++) {
			for (let target = 1; target <= 10; target++) {
				let x = 0;
				while (digitSum(n + x) > target) x++;
				expect(makeIntegerBeautiful(n, target)).toBe(x);
			}
		}
	});
});
