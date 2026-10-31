import { describe, expect, it } from "bun:test";
import { deepObjectFilter } from ".";

describe("2823. Deep Object Filter", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			deepObjectFilter([-5, -4, -3, -2, -1, 0, 1], (x) => (x as number) > 0),
		).toEqual([1]);
		expect(
			deepObjectFilter(
				{ a: 1, b: "2", c: 3, d: "4", e: 5, f: 6, g: { a: 1 } },
				(x) => typeof x === "string",
			),
		).toEqual({ b: "2", d: "4" });
		expect(
			deepObjectFilter(
				[-1, [-1, -1, 5, -1, 10], -1, [-1], [-5]],
				(x) => (x as number) > 0,
			),
		).toEqual([[5, 10]]);
		expect(
			deepObjectFilter([[[[5]]]], (x) => Array.isArray(x)),
		).toBeUndefined();
	});

	it("drops containers that start empty", () => {
		expect(deepObjectFilter({ a: {}, b: [], c: 1 }, () => true)).toEqual({
			c: 1,
		});
	});
});
