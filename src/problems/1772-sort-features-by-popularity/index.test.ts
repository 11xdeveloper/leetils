import { describe, expect, it } from "bun:test";
import { sortFeaturesByPopularity as sortFeatures } from ".";

describe("1772. Sort Features by Popularity", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sortFeatures(
				["cooler", "lock", "touch"],
				["i like cooler cooler", "lock touch cool", "locker like touch"],
			),
		).toEqual(["touch", "cooler", "lock"]);
		expect(
			sortFeatures(["a", "aa", "b", "c"], ["a", "a aa", "a a a a a", "b a"]),
		).toEqual(["a", "aa", "b", "c"]);
	});
});
