import { describe, expect, it } from "bun:test";
import { minimumCostToSetCookingTime as minCostSetTime } from ".";

describe("2162. Minimum Cost to Set Cooking Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCostSetTime(1, 2, 1, 600)).toBe(6);
		expect(minCostSetTime(0, 1, 2, 76)).toBe(6);
	});

	it("handles the largest time and leading zeros", () => {
		// 99:99 = 6039 seconds is the only way.
		expect(minCostSetTime(9, 100, 1, 6039)).toBe(4);
		// 1 second is typed as "1".
		expect(minCostSetTime(0, 5, 1, 1)).toBe(6);
	});
});
