import { describe, expect, it } from "bun:test";
import { numberOfCenteredSubarrays as centeredSubarrays } from ".";

describe("3804. Number of Centered Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(centeredSubarrays([-1, 1, 0])).toBe(5);
		expect(centeredSubarrays([2, -3])).toBe(2);
	});
});
