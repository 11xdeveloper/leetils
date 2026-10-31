import { describe, expect, it } from "bun:test";
import { CalculatorWithMethodChaining as Calculator } from ".";

describe("2726. Calculator with Method Chaining", () => {
	it("solves the examples from the problem statement", () => {
		expect(new Calculator(10).add(5).subtract(7).getResult()).toBe(8);
		expect(new Calculator(2).multiply(5).power(2).getResult()).toBe(100);
		expect(() => new Calculator(20).divide(0).getResult()).toThrow(
			"Division by zero is not allowed",
		);
	});

	it("divides", () => {
		expect(new Calculator(7).divide(2).getResult()).toBe(3.5);
	});
});
