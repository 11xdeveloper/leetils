import { describe, expect, it } from "bun:test";
import { countTheNumberOfComputerUnlockingPermutations as countPermutations } from ".";

describe("3577. Count the Number of Computer Unlocking Permutations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPermutations([1, 2, 3])).toBe(2);
		expect(countPermutations([3, 3, 3, 4, 4, 4])).toBe(0);
	});

	it("reduces large factorials modulo 1e9+7", () => {
		expect(countPermutations(Array.from({ length: 21 }, (_, i) => i))).toBe(
			146326063,
		);
	});
});
