import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findLatestGroupOfSizeM as findLatestStep } from ".";

/** Rebuilds the bit string at every step. */
const byBruteForce = (arr: number[], m: number): number => {
	const bits = new Array<string>(arr.length).fill("0");
	let latest = -1;
	arr.forEach((position, step) => {
		bits[position - 1] = "1";
		if ((bits.join("").match(/1+/g) ?? []).some((run) => run.length === m))
			latest = step + 1;
	});
	return latest;
};

describe("1562. Find Latest Group of Size M", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLatestStep([3, 5, 1, 2, 4], 1)).toBe(4);
		expect(findLatestStep([3, 1, 5, 4, 2], 2)).toBe(-1);
	});

	it("matches rebuilding the string on random permutations", () => {
		const random = createRandom(1562);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const arr = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			const m = random.int(1, n);
			expect(findLatestStep(arr, m)).toBe(byBruteForce(arr, m));
		}
	});
});
