import { describe, expect, it } from "bun:test";
import { minimumNumberOfPushesToTypeWordII as minimumPushes } from ".";

describe("3016. Minimum Number of Pushes to Type Word II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPushes("abcde")).toBe(5);
		expect(minimumPushes("xyzxyzxyzxyz")).toBe(12);
		expect(minimumPushes("aabbccddeeffgghhiiiiii")).toBe(24);
	});
});
