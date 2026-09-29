import { describe, expect, it } from "bun:test";
import { uglyNumberII } from "../0264-ugly-number-ii";
import { superUglyNumber } from ".";

describe("313. Super Ugly Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(superUglyNumber(12, [2, 7, 13, 19])).toBe(32);
		expect(superUglyNumber(1, [2, 3, 5])).toBe(1);
	});

	it("matches Ugly Number II with the primes 2, 3 and 5", () => {
		for (let n = 1; n <= 500; n++)
			expect(superUglyNumber(n, [2, 3, 5])).toBe(uglyNumberII(n));
	});

	it("matches checking every number's prime factors", () => {
		const primes = [3, 7, 11];
		const hasOnly = (x: number) => {
			let rest = x;
			for (const p of primes) while (rest % p === 0) rest /= p;
			return rest === 1;
		};
		const expected: number[] = [];
		for (let x = 1; expected.length < 60; x++) if (hasOnly(x)) expected.push(x);
		for (const [i, value] of expected.entries())
			expect(superUglyNumber(i + 1, primes)).toBe(value);
	});
});
