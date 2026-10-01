import { describe, expect, it } from "bun:test";
import { findTheMiddleIndexInArray as findMiddleIndex } from ".";

describe("1991. Find the Middle Index in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMiddleIndex([2, 3, -1, 8, 4])).toBe(3);
		expect(findMiddleIndex([1, -1, 4])).toBe(2);
		expect(findMiddleIndex([2, 5])).toBe(-1);
	});
});
