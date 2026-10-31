import { describe, expect, it } from "bun:test";
import { maximizeGreatnessOfAnArray as maximizeGreatness } from ".";

describe("2592. Maximize Greatness of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeGreatness([1, 3, 5, 2, 1, 3, 1])).toBe(4);
		expect(maximizeGreatness([1, 2, 3, 4])).toBe(3);
	});
});
