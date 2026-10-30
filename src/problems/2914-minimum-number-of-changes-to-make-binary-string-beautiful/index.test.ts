import { describe, expect, it } from "bun:test";
import { minimumNumberOfChangesToMakeBinaryStringBeautiful as minChanges } from ".";

describe("2914. Minimum Number of Changes to Make Binary String Beautiful", () => {
	it("solves the examples from the problem statement", () => {
		expect(minChanges("1001")).toBe(2);
		expect(minChanges("10")).toBe(1);
		expect(minChanges("0000")).toBe(0);
	});
});
