import { describe, expect, it } from "bun:test";
import { numberOfSubarraysWithLcmEqualToK as subarrayLCM } from ".";

describe("2470. Number of Subarrays With LCM Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarrayLCM([3, 6, 2, 7, 1], 6)).toBe(4);
		expect(subarrayLCM([3], 2)).toBe(0);
	});
});
