import { describe, expect, it } from "bun:test";
import { numberOfChangingKeys } from ".";

describe("3019. Number of Changing Keys", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfChangingKeys("aAbBcC")).toBe(2);
		expect(numberOfChangingKeys("AaAaAaaA")).toBe(0);
	});
});
