import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { movingStonesUntilConsecutiveII as numMovesStonesII } from ".";

/** Searches every sequence of moves, with memoisation on the positions. */
const bySearch = (stones: number[]): number[] => {
	const memo = new Map<string, number[]>();
	const explore = (positions: number[]): number[] => {
		const key = positions.join();
		const known = memo.get(key);
		if (known) return known;
		const [first = 0] = positions;
		const last = positions.at(-1) ?? 0;
		if (last - first + 1 === positions.length) return [0, 0];
		const results: number[][] = [];
		for (const end of [0, positions.length - 1]) {
			const rest = positions.filter((_, i) => i !== end);
			const [low = 0] = rest;
			const high = rest.at(-1) ?? 0;
			for (let p = low + 1; p < high; p++)
				if (!rest.includes(p))
					results.push(explore([...rest, p].sort((a, b) => a - b)));
		}
		const result = [
			1 + Math.min(...results.map((r) => r[0] ?? 0)),
			1 + Math.max(...results.map((r) => r[1] ?? 0)),
		];
		memo.set(key, result);
		return result;
	};
	return explore(stones.toSorted((a, b) => a - b));
};

describe("1040. Moving Stones Until Consecutive II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numMovesStonesII([7, 4, 9])).toEqual([1, 2]);
		expect(numMovesStonesII([6, 5, 4, 3, 10])).toEqual([2, 3]);
	});

	it("matches searching every sequence of moves on random stones", () => {
		const random = createRandom(1040);
		for (let run = 0; run < 200; run++) {
			const stones = [...new Set(random.array(random.int(3, 5), 1, 12))];
			if (stones.length < 3) continue;
			expect(numMovesStonesII(stones)).toEqual(bySearch(stones));
		}
	});
});
