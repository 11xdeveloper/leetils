import { describe, expect, it } from "bun:test";
import { checkIfDigitsAreEqualInStringAfterOperationsI as hasSameDigits } from ".";

describe("3461. Check If Digits Are Equal in String After Operations I", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasSameDigits("3902")).toBeTrue();
		expect(hasSameDigits("34789")).toBeFalse();
	});
});
