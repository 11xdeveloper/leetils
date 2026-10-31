import { describe, expect, it } from "bun:test";
import { concatenateArrayWithReverse as concatWithReverse } from ".";

describe("3925. Concatenate Array With Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatWithReverse([1, 2, 3])).toEqual([1, 2, 3, 3, 2, 1]);
		expect(concatWithReverse([1])).toEqual([1, 1]);
	});
});
