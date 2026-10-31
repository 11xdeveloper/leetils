import { describe, expect, it } from "bun:test";
import { maximumNumberOfGroupsEnteringACompetition as maximumGroups } from ".";

describe("2358. Maximum Number of Groups Entering a Competition", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumGroups([10, 6, 12, 7, 3, 5])).toBe(3);
		expect(maximumGroups([8, 8])).toBe(1);
	});
});
