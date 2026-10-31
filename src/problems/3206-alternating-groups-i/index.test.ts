import { describe, expect, it } from "bun:test";
import { alternatingGroupsI as numberOfAlternatingGroups } from ".";

describe("3206. Alternating Groups I", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfAlternatingGroups([1, 1, 1])).toBe(0);
		expect(numberOfAlternatingGroups([0, 1, 0, 0, 1])).toBe(3);
	});
});
