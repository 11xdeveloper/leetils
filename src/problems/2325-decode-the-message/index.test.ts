import { describe, expect, it } from "bun:test";
import { decodeTheMessage as decodeMessage } from ".";

describe("2325. Decode the Message", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			decodeMessage(
				"the quick brown fox jumps over the lazy dog",
				"vkbs bs t suepuv",
			),
		).toBe("this is a secret");
		expect(
			decodeMessage(
				"eljuxhpwnyrdgtqkviszcfmabo",
				"zwx hnfx lqantp mnoeius ycgk vcnjrdb",
			),
		).toBe("the five boxing wizards jump quickly");
	});
});
