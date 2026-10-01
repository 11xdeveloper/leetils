import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumEqualFrequency as maxEqualFreq } from ".";

/** Tries removing each element of each prefix. */
const byBruteForce = (nums: number[]): number => {
	for (let length = nums.length; length > 0; length--) {
		const prefix = nums.slice(0, length);
		for (let skip = 0; skip < length; skip++) {
			const counts = new Map<number, number>();
			prefix.forEach((num, i) => {
				if (i !== skip) counts.set(num, (counts.get(num) ?? 0) + 1);
			});
			if (new Set(counts.values()).size <= 1) return length;
		}
	}
	return 0;
};

describe("1224. Maximum Equal Frequency", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxEqualFreq([2, 2, 1, 1, 5, 3, 3, 5])).toBe(7);
		expect(maxEqualFreq([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5])).toBe(13);
	});

	it("handles a single repeated value", () => {
		expect(maxEqualFreq([1, 1, 1, 1])).toBe(4);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1224);
		for (let run = 0; run < 400; run++) {
			const nums = random.array(random.int(2, 12), 1, 4);
			expect(maxEqualFreq(nums)).toBe(byBruteForce(nums));
		}
	});
});
