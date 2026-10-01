import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { detectPatternOfLengthMRepeatedKOrMoreTimes as containsPattern } from ".";

/** Checks every starting position by comparing blocks. */
const byBruteForce = (arr: number[], m: number, k: number): boolean => {
	for (let start = 0; start + m * k <= arr.length; start++) {
		const block = arr.slice(start, start + m).join();
		let repeats = true;
		for (let r = 1; r < k; r++)
			if (arr.slice(start + r * m, start + (r + 1) * m).join() !== block)
				repeats = false;
		if (repeats) return true;
	}
	return false;
};

describe("1566. Detect Pattern of Length M Repeated K or More Times", () => {
	it("solves the examples from the problem statement", () => {
		expect(containsPattern([1, 2, 4, 4, 4, 4], 1, 3)).toBeTrue();
		expect(containsPattern([1, 2, 1, 2, 1, 1, 1, 3], 2, 2)).toBeTrue();
		expect(containsPattern([1, 2, 1, 2, 1, 3], 2, 3)).toBeFalse();
	});

	it("matches comparing blocks on random inputs", () => {
		const random = createRandom(1566);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(2, 12), 1, 2);
			const [m, k] = [random.int(1, 3), random.int(2, 4)];
			expect(containsPattern(arr, m, k)).toBe(byBruteForce(arr, m, k));
		}
	});
});
