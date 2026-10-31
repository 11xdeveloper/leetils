import { describe, expect, it } from "bun:test";
import { maximumGapBetweenStations as maximumGap } from ".";

describe("4026. Maximum Gap Between Stations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumGap("aa", "aaaa")).toBe(3);
		expect(maximumGap("xyz", "xyzz")).toBe(2);
		expect(maximumGap("cbc", "cbcdbc")).toBe(4);
	});

	it("is 0 for one worker", () => {
		expect(maximumGap("a", "bab")).toBe(0);
	});
});
