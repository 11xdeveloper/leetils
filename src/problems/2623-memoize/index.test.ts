import { describe, expect, it } from "bun:test";
import { memoize } from ".";

describe("2623. Memoize", () => {
	it("solves the examples from the problem statement", () => {
		let calls = 0;
		const sum = memoize((a: number, b: number) => {
			calls++;
			return a + b;
		});
		expect([sum(2, 2), sum(2, 2), sum(1, 2)]).toEqual([4, 4, 3]);
		expect(calls).toBe(2);

		calls = 0;
		const factorial = memoize((n: number): number => {
			calls++;
			return n <= 1 ? 1 : n * factorial(n - 1);
		});
		expect([factorial(2), factorial(3), factorial(2), factorial(3)]).toEqual([
			2, 6, 2, 6,
		]);
		expect(calls).toBe(3);
	});

	it("tells argument lists apart by order and count", () => {
		let calls = 0;
		const f = memoize((...args: number[]) => {
			calls++;
			return args.length;
		});
		f(1, 2);
		f(2, 1);
		f(12);
		f();
		f();
		expect(calls).toBe(4);
	});
});
