import { describe, expect, it } from "bun:test";
import { findTheIndexOfPermutation as getPermutationIndex } from ".";

describe("3109. Find the Index of Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(getPermutationIndex([1, 2])).toBe(0);
		expect(getPermutationIndex([3, 1, 2])).toBe(4);
	});

	it("numbers every permutation of 5 in order", () => {
		const all: number[][] = [];
		const permute = (prefix: number[], rest: number[]): void => {
			if (rest.length === 0) all.push(prefix);
			rest.forEach((v, i) => {
				permute(
					[...prefix, v],
					rest.filter((_, j) => j !== i),
				);
			});
		};
		permute([], [1, 2, 3, 4, 5]);
		all.forEach((perm, i) => {
			expect(getPermutationIndex(perm)).toBe(i);
		});
	});
});
