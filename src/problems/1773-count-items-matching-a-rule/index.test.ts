import { describe, expect, it } from "bun:test";
import { countItemsMatchingARule as countMatches } from ".";

describe("1773. Count Items Matching a Rule", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countMatches(
				[
					["phone", "blue", "pixel"],
					["computer", "silver", "lenovo"],
					["phone", "gold", "iphone"],
				],
				"color",
				"silver",
			),
		).toBe(1);
		expect(
			countMatches(
				[
					["phone", "blue", "pixel"],
					["computer", "silver", "phone"],
					["phone", "gold", "iphone"],
				],
				"type",
				"phone",
			),
		).toBe(2);
	});
});
