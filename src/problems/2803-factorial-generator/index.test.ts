import { describe, expect, it } from "bun:test";
import { factorialGenerator } from ".";

describe("2803. Factorial Generator", () => {
	it("solves the examples from the problem statement", () => {
		expect([...factorialGenerator(5)]).toEqual([1, 2, 6, 24, 120]);
		expect([...factorialGenerator(2)]).toEqual([1, 2]);
		expect([...factorialGenerator(0)]).toEqual([1]);
	});
});
