import { describe, expect, it } from "bun:test";
import { circularPermutationInBinaryRepresentation as circularPermutation } from ".";

const expectValid = (n: number, start: number) => {
	const p = circularPermutation(n, start);
	expect(p).toHaveLength(2 ** n);
	expect(p[0]).toBe(start);
	expect(new Set(p).size).toBe(2 ** n);
	expect(p.every((value) => value >= 0 && value < 2 ** n)).toBeTrue();
	p.forEach((value, i) => {
		const bits = value ^ (p[(i + 1) % p.length] ?? 0);
		if (2 ** n > 1) expect(bits > 0 && (bits & (bits - 1)) === 0).toBeTrue();
	});
};

describe("1238. Circular Permutation in Binary Representation", () => {
	it("solves the examples from the problem statement", () => {
		expectValid(2, 3);
		expectValid(3, 2);
	});

	it("is valid for every start up to n = 6, and for n = 16", () => {
		for (let n = 1; n <= 6; n++)
			for (let start = 0; start < 2 ** n; start++) expectValid(n, start);
		expectValid(16, 12345);
	});
});
