import { describe, expect, it } from "bun:test";
import { fibonacciNumber as fib } from ".";

describe("509. Fibonacci Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(fib(2)).toBe(1);
		expect(fib(3)).toBe(2);
		expect(fib(4)).toBe(3);
	});

	it("gives the first values and the largest within the constraints", () => {
		expect(Array.from({ length: 11 }, (_, n) => fib(n))).toEqual([
			0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55,
		]);
		expect(fib(30)).toBe(832040);
	});
});
