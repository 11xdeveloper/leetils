import { describe, expect, it } from "bun:test";
import { canMakeArithmeticProgressionFromSequence as canMakeArithmeticProgression } from ".";

describe("1502. Can Make Arithmetic Progression From Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(canMakeArithmeticProgression([3, 5, 1])).toBeTrue();
		expect(canMakeArithmeticProgression([1, 2, 4])).toBeFalse();
	});

	it("handles constant and two-element arrays", () => {
		expect(canMakeArithmeticProgression([7, 7, 7])).toBeTrue();
		expect(canMakeArithmeticProgression([5, -9])).toBeTrue();
		expect(canMakeArithmeticProgression([1, 1, 2])).toBeFalse();
	});
});
