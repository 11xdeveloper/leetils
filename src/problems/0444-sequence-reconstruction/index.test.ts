import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { sequenceReconstruction } from ".";

const isSubsequence = (short: number[], long: number[]): boolean => {
	let i = 0;
	for (const value of long) if (value === short[i]) i++;
	return i === short.length;
};

/** Whether nums is the only permutation of 1..n containing every sequence. */
const byBruteForce = (nums: number[], sequences: number[][]): boolean =>
	permutations(nums.toSorted((a, b) => a - b))
		.filter((candidate) =>
			sequences.every((sequence) => isSubsequence(sequence, candidate)),
		)
		.map((candidate) => candidate.join())
		.join("|") === nums.join();

describe("444. Sequence Reconstruction", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			sequenceReconstruction(
				[1, 2, 3],
				[
					[1, 2],
					[1, 3],
				],
			),
		).toBeFalse();
		expect(sequenceReconstruction([1, 2, 3], [[1, 2]])).toBeFalse();
		expect(
			sequenceReconstruction(
				[1, 2, 3],
				[
					[1, 2],
					[1, 3],
					[2, 3],
				],
			),
		).toBeTrue();
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(444);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 5);
			const nums = Array.from({ length: n }, (_, i) => i + 1).toSorted(
				() => random.next() - 0.5,
			);
			const sequences = Array.from({ length: random.int(1, 4) }, () =>
				nums.filter(() => random.int(0, 2) > 0),
			).filter((sequence) => sequence.length > 0);
			if (sequences.length === 0) continue;
			expect(sequenceReconstruction(nums, sequences)).toBe(
				byBruteForce(nums, sequences),
			);
		}
	});
});
