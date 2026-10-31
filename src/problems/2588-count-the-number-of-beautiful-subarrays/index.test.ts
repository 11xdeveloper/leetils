import { describe, expect, it } from "bun:test";
import { countTheNumberOfBeautifulSubarrays as beautifulSubarrays } from ".";

describe("2588. Count the Number of Beautiful Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulSubarrays([4, 3, 1, 2, 4])).toBe(2);
		expect(beautifulSubarrays([1, 10, 4])).toBe(0);
	});
});
