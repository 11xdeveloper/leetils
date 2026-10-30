import { describe, expect, it } from "bun:test";
import { checkIfAllAsAppearsBeforeAllBs as checkString } from ".";

describe("2124. Check if All A's Appears Before All B's", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkString("aaabbb")).toBeTrue();
		expect(checkString("abab")).toBeFalse();
		expect(checkString("bbb")).toBeTrue();
	});
});
