import { describe, expect, it } from "bun:test";
import { minimumNumberOfPushesToTypeWordI as minimumPushes } from ".";

describe("3014. Minimum Number of Pushes to Type Word I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPushes("abcde")).toBe(5);
		expect(minimumPushes("xycdefghij")).toBe(12);
	});

	it("handles all 26 letters", () => {
		expect(minimumPushes("abcdefghijklmnopqrstuvwxyz")).toBe(8 + 16 + 24 + 8);
	});
});
