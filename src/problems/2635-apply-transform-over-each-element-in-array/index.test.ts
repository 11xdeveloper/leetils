import { describe, expect, it } from "bun:test";
import { applyTransformOverEachElementInArray } from ".";

describe("2635. Apply Transform Over Each Element in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			applyTransformOverEachElementInArray([1, 2, 3], (n) => n + 1),
		).toEqual([2, 3, 4]);
		expect(
			applyTransformOverEachElementInArray([1, 2, 3], (n, i) => n + i),
		).toEqual([1, 3, 5]);
		expect(
			applyTransformOverEachElementInArray([10, 20, 30], () => 42),
		).toEqual([42, 42, 42]);
	});
});
