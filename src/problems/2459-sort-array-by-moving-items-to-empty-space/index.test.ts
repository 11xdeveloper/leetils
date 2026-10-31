import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortArrayByMovingItemsToEmptySpace as sortArray } from ".";

/** Breadth-first search over arrangements. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	const goals = new Set([
		Array.from({ length: n }, (_, i) => i).join(","),
		[...Array.from({ length: n - 1 }, (_, i) => i + 1), 0].join(","),
	]);
	const seen = new Set([nums.join(",")]);
	let level = [nums];
	for (let moves = 0; ; moves++) {
		if (level.some((state) => goals.has(state.join(",")))) return moves;
		const next: number[][] = [];
		for (const state of level) {
			const space = state.indexOf(0);
			for (let i = 0; i < n; i++) {
				if (i === space) continue;
				const moved = [...state];
				[moved[space], moved[i]] = [moved[i] ?? 0, 0];
				const key = moved.join(",");
				if (seen.has(key)) continue;
				seen.add(key);
				next.push(moved);
			}
		}
		level = next;
	}
};

describe("2459. Sort Array by Moving Items to Empty Space", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortArray([4, 2, 0, 3, 1])).toBe(3);
		expect(sortArray([1, 2, 3, 4, 0])).toBe(0);
		expect(sortArray([1, 0, 2, 4, 3])).toBe(2);
	});

	it("matches a search over arrangements on random permutations", () => {
		const random = createRandom(2459);
		for (let run = 0; run < 60; run++) {
			const n = random.int(2, 6);
			const nums = Array.from({ length: n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			expect(sortArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
