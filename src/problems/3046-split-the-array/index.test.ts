import { describe, expect, it } from "bun:test";
import { splitTheArray as isPossibleToSplit } from ".";

describe("3046. Split the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPossibleToSplit([1, 1, 2, 2, 3, 4])).toBeTrue();
		expect(isPossibleToSplit([1, 1, 1, 1])).toBeFalse();
	});
});
