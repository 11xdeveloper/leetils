import { describe, expect, it } from "bun:test";
import { deepMergeOfTwoObjects } from ".";

describe("2755. Deep Merge of Two Objects", () => {
	it("solves the examples from the problem statement", () => {
		expect(deepMergeOfTwoObjects({ a: 1, c: 3 }, { a: 2, b: 2 })).toEqual({
			a: 2,
			c: 3,
			b: 2,
		});
		expect(
			deepMergeOfTwoObjects(
				{ a: 1, b: { c: [1, [2, 7], 5], d: 2 } },
				{ a: 1, b: { c: [6, [6], [9]], e: 3 } },
			),
		).toEqual({ a: 1, b: { c: [6, [6, 7], [9]], d: 2, e: 3 } });
		expect(deepMergeOfTwoObjects(true, null)).toBeNull();
		expect(
			deepMergeOfTwoObjects({ a: "1" }, { a: { b: "2" }, c: "3" }),
		).toEqual({
			a: { b: "2" },
			c: "3",
		});
		expect(deepMergeOfTwoObjects([{}, 2, 3], [[], 5])).toEqual([[], 5, 3]);
	});

	it("leaves its inputs alone", () => {
		const a = { x: { y: 1 } };
		deepMergeOfTwoObjects(a, { x: { y: 2 } });
		expect(a).toEqual({ x: { y: 1 } });
	});
});
