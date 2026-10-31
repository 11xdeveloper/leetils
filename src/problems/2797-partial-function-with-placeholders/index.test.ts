import { describe, expect, it } from "bun:test";
import { partialFunctionWithPlaceholders as partial } from ".";

describe("2797. Partial Function with Placeholders", () => {
	it("solves the examples from the problem statement", () => {
		expect(partial((...args: unknown[]) => args, [2, 4, 6])(8, 10)).toEqual([
			2, 4, 6, 8, 10,
		]);
		expect(
			partial((...args: unknown[]) => args, [1, 2, "_", 4, "_", 6])(3, 5),
		).toEqual([1, 2, 3, 4, 5, 6]);
		expect(
			partial((a: number, b: number, c: number) => b + a - c, ["_", 5])(5, 20),
		).toBe(-10);
	});
});
