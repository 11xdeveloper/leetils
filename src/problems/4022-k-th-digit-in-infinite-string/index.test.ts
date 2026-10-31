import { describe, expect, it } from "bun:test";
import { kThDigitInInfiniteString as kthDigit } from ".";

describe("4022. K-th Digit in Infinite String", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthDigit(4)).toBe(4);
		expect(kthDigit(15)).toBe(7);
		expect(kthDigit(11)).toBe(9);
	});

	it("matches building the string", () => {
		let s = "123456789";
		for (let b = 1; s.length < 50000; b++) {
			const block = Array.from({ length: 10 }, (_, i) => 10 * b + i);
			s += (b % 2 === 0 ? block : block.reverse()).join("");
		}
		for (let k = 1; k <= s.length; k += 7)
			expect(kthDigit(k)).toBe(Number(s[k - 1]));
	});
});
