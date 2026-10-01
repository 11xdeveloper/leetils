import { describe, expect, it } from "bun:test";
import { movingStonesUntilConsecutive as numMovesStones } from ".";

/** Searches every sequence of moves: an end stone moves to any empty position between the ends. */
const bySearch = (a: number, b: number, c: number): number[] => {
	const memo = new Map<string, number[]>();
	const explore = (stones: number[]): number[] => {
		const [x = 0, y = 0, z = 0] = stones.toSorted((p, q) => p - q);
		const key = `${x},${y},${z}`;
		const known = memo.get(key);
		if (known) return known;
		const next: number[][] = [];
		for (let p = x + 1; p < z; p++) {
			if (p === y) continue;
			next.push(explore([p, y, z]), explore([x, y, p]));
		}
		const result =
			next.length === 0
				? [0, 0]
				: [
						1 + Math.min(...next.map((m) => m[0] ?? 0)),
						1 + Math.max(...next.map((m) => m[1] ?? 0)),
					];
		memo.set(key, result);
		return result;
	};
	return explore([a, b, c]);
};

describe("1033. Moving Stones Until Consecutive", () => {
	it("solves the examples from the problem statement", () => {
		expect(numMovesStones(1, 2, 5)).toEqual([1, 2]);
		expect(numMovesStones(4, 3, 2)).toEqual([0, 0]);
		expect(numMovesStones(3, 5, 1)).toEqual([1, 2]);
	});

	it("matches searching every sequence of moves for small positions", () => {
		for (let a = 1; a <= 12; a++) {
			for (let b = a + 1; b <= 12; b++)
				for (let c = b + 1; c <= 12; c++)
					expect(numMovesStones(c, a, b)).toEqual(bySearch(a, b, c));
		}
	});
});
