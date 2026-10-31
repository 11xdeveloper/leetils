import { describe, expect, it } from "bun:test";
import { curry } from ".";

describe("2632. Curry", () => {
	const sum = (a: number, b: number, c: number) => a + b + c;

	it("solves the examples from the problem statement", () => {
		expect((curry(sum)(1) as Function)(2)(3)).toBe(6);
		expect((curry(sum)(1, 2) as Function)(3)).toBe(6);
		expect((curry(sum)() as Function)()(1, 2, 3)).toBe(6);
		expect(curry(() => 42)()).toBe(42);
	});

	it("lets partial applications be reused", () => {
		const add1 = curry(sum)(1) as (...args: unknown[]) => unknown;
		expect(add1(2, 3)).toBe(6);
		expect(add1(10, 20)).toBe(31);
	});
});
