import { describe, expect, it } from "bun:test";
import { minimumNumberOfChairsInAWaitingRoom as minimumChairs } from ".";

describe("3168. Minimum Number of Chairs in a Waiting Room", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumChairs("EEEEEEE")).toBe(7);
		expect(minimumChairs("ELELEEL")).toBe(2);
		expect(minimumChairs("ELEELEELLL")).toBe(3);
	});
});
