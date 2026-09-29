import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { patchingArray } from ".";

/** Every sum from 1 to n can be made from some subset. */
const coversAll = (nums: number[], n: number): boolean => {
	const possible = new Set([0]);
	for (const num of nums)
		for (const sum of [...possible]) possible.add(sum + num);
	return Array.from({ length: n }, (_, i) => i + 1).every((x) =>
		possible.has(x),
	);
};

/** Tries adding more and more patches, checking every choice of values. */
const byBruteForce = (nums: number[], n: number): number => {
	for (let patches = 0; ; patches++) {
		const tryPatches = (
			count: number,
			from: number,
			added: number[],
		): boolean =>
			count === 0
				? coversAll([...nums, ...added], n)
				: Array.from({ length: n - from + 1 }, (_, i) => from + i).some(
						(value) => tryPatches(count - 1, value, [...added, value]),
					);
		if (tryPatches(patches, 1, [])) return patches;
	}
};

describe("330. Patching Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(patchingArray([1, 3], 6)).toBe(1);
		expect(patchingArray([1, 5, 10], 20)).toBe(2);
		expect(patchingArray([1, 2, 2], 5)).toBe(0);
	});

	it("handles the 32-bit limit without overflowing", () => {
		expect(patchingArray([], 2 ** 31 - 1)).toBe(31);
	});

	it("matches trying every set of patches on random inputs", () => {
		const random = createRandom(330);
		for (let run = 0; run < 150; run++) {
			const nums = random
				.array(random.int(0, 4), 1, 10)
				.toSorted((a, b) => a - b);
			const n = random.int(1, 15);
			expect(patchingArray(nums, n)).toBe(byBruteForce(nums, n));
		}
	});
});
