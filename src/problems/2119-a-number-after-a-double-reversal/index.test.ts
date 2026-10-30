import { describe, expect, it } from "bun:test";
import { aNumberAfterADoubleReversal as isSameAfterReversals } from ".";

describe("2119. A Number After a Double Reversal", () => {
	it("solves the examples from the problem statement", () => {
		expect(isSameAfterReversals(526)).toBeTrue();
		expect(isSameAfterReversals(1800)).toBeFalse();
		expect(isSameAfterReversals(0)).toBeTrue();
	});
});
