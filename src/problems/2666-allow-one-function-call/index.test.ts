import { describe, expect, it } from "bun:test";
import { allowOneFunctionCall } from ".";

describe("2666. Allow One Function Call", () => {
	it("solves the examples from the problem statement", () => {
		const sum = allowOneFunctionCall(
			(a: number, b: number, c: number) => a + b + c,
		);
		expect([sum(1, 2, 3), sum(2, 3, 6)]).toEqual([6, undefined]);
		const product = allowOneFunctionCall(
			(a: number, b: number, c: number) => a * b * c,
		);
		expect([product(5, 7, 4), product(2, 3, 6), product(4, 6, 8)]).toEqual([
			140,
			undefined,
			undefined,
		]);
	});
});
