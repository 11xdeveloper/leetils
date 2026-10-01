import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfTimesBinaryStringIsPrefixAligned as numTimesAllBlue } from ".";

/** Checks the actual bit string after each flip. */
const byBruteForce = (flips: number[]): number => {
	const bits = new Array<number>(flips.length).fill(0);
	let count = 0;
	flips.forEach((bit, i) => {
		bits[bit - 1] = 1;
		if (bits.every((b, j) => b === (j <= i ? 1 : 0))) count++;
	});
	return count;
};

describe("1375. Number of Times Binary String Is Prefix-Aligned", () => {
	it("solves the examples from the problem statement", () => {
		expect(numTimesAllBlue([3, 2, 4, 1, 5])).toBe(2);
		expect(numTimesAllBlue([4, 1, 2, 3])).toBe(1);
	});

	it("matches checking the bits on random permutations", () => {
		const random = createRandom(1375);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const flips = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			expect(numTimesAllBlue(flips)).toBe(byBruteForce(flips));
		}
	});
});
