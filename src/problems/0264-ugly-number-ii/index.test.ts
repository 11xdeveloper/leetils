import { describe, expect, it } from "bun:test";
import { uglyNumber } from "../0263-ugly-number";
import { uglyNumberII } from ".";

describe("264. Ugly Number II", () => {
	it("solves the examples from the problem statement", () => {
		expect(uglyNumberII(10)).toBe(12);
		expect(uglyNumberII(1)).toBe(1);
	});

	it("matches checking every number with Ugly Number", () => {
		const expected: number[] = [];
		for (let x = 1; expected.length < 500; x++)
			if (uglyNumber(x)) expected.push(x);
		for (const [i, value] of expected.entries())
			expect(uglyNumberII(i + 1)).toBe(value);
	});

	it("handles the constraint of 1690", () => {
		expect(uglyNumberII(1690)).toBe(2123366400);
	});
});
