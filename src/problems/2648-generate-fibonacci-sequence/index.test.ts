import { describe, expect, it } from "bun:test";
import { generateFibonacciSequence } from ".";

const take = (n: number) => {
	const generator = generateFibonacciSequence();
	return Array.from({ length: n }, () => generator.next().value);
};

describe("2648. Generate Fibonacci Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(take(5)).toEqual([0, 1, 1, 2, 3]);
		expect(take(0)).toEqual([]);
	});

	it("keeps going", () => {
		expect(take(50).at(-1)).toBe(7778742049);
	});
});
