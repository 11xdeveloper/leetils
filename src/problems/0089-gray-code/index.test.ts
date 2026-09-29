import { describe, expect, it } from "bun:test";
import { grayCode } from ".";

const bitsSet = (value: number): number =>
	value.toString(2).replaceAll("0", "").length;

describe("89. Gray Code", () => {
	it("solves the examples from the problem statement", () => {
		expect(grayCode(2)).toEqual([0, 1, 3, 2]);
		expect(grayCode(1)).toEqual([0, 1]);
	});

	it("is a valid Gray code for every n up to the constraint of 16", () => {
		for (let n = 1; n <= 16; n++) {
			const sequence = grayCode(n);
			expect(sequence).toHaveLength(2 ** n);
			expect(sequence[0]).toBe(0);
			expect(new Set(sequence).size).toBe(sequence.length);
			for (const [i, value] of sequence.entries()) {
				expect(value).toBeLessThan(2 ** n);
				const next = sequence[(i + 1) % sequence.length] ?? 0;
				expect(bitsSet(value ^ next)).toBe(1);
			}
		}
	});
});
