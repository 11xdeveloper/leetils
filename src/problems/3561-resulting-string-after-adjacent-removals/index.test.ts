import { describe, expect, it } from "bun:test";
import { resultingStringAfterAdjacentRemovals as resultingString } from ".";

describe("3561. Resulting String After Adjacent Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(resultingString("abc")).toBe("c");
		expect(resultingString("adcb")).toBe("");
		expect(resultingString("zadb")).toBe("db");
	});
});
