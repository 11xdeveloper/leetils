import { describe, expect, it } from "bun:test";
import { nthDigit } from ".";

describe("400. Nth Digit", () => {
	it("solves the examples from the problem statement", () => {
		expect(nthDigit(3)).toBe(3);
		expect(nthDigit(11)).toBe(0);
	});

	it("matches writing out the sequence for the first 100,000 digits", () => {
		let sequence = "";
		for (let x = 1; sequence.length < 100_000; x++) sequence += x;
		for (let n = 1; n <= 100_000; n++)
			expect(nthDigit(n)).toBe(Number(sequence[n - 1]));
	});

	it("handles the largest 32-bit integer", () => {
		expect(nthDigit(2 ** 31 - 1)).toBe(2);
	});
});
