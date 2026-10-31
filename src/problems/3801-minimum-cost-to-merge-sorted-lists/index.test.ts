import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToMergeSortedLists as minMergeCost } from ".";

/** Tries every order of merges. */
const byBruteForce = (lists: number[][]): number => {
	const median = (a: number[]) => a[(a.length - 1) >> 1] ?? 0;
	const go = (current: number[][]): number => {
		if (current.length === 1) return 0;
		let best = Number.POSITIVE_INFINITY;
		for (let i = 0; i < current.length; i++)
			for (let j = i + 1; j < current.length; j++) {
				const [a = [], b = []] = [current[i], current[j]];
				const merged = [...a, ...b].sort((x, y) => x - y);
				const rest = current.filter((_, k) => k !== i && k !== j);
				best = Math.min(
					best,
					a.length +
						b.length +
						Math.abs(median(a) - median(b)) +
						go([...rest, merged]),
				);
			}
		return best;
	};
	return go(lists);
};

describe("3801. Minimum Cost to Merge Sorted Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minMergeCost([
				[1, 3, 5],
				[2, 4],
				[6, 7, 8],
			]),
		).toBe(18);
		expect(
			minMergeCost([
				[1, 1, 5],
				[1, 4, 7, 8],
			]),
		).toBe(10);
		expect(minMergeCost([[1], [3]])).toBe(4);
		expect(minMergeCost([[1], [1]])).toBe(2);
	});

	it("matches trying every merge order on random lists", () => {
		const random = createRandom(3801);
		for (let run = 0; run < 60; run++) {
			const lists = Array.from({ length: random.int(2, 5) }, () =>
				random.array(random.int(1, 4), -9, 9).sort((a, b) => a - b),
			);
			expect(minMergeCost(lists)).toBe(byBruteForce(lists));
		}
	});
});
