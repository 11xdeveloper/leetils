import { describe, expect, it } from "bun:test";
import { superEggDrop } from ".";

/** The classic DP: the worst case over every floor to drop from next. */
const byMinimax = (k: number, n: number): number => {
	const memo = new Map<string, number>();
	const solve = (eggs: number, floors: number): number => {
		if (floors === 0) return 0;
		if (eggs === 1) return floors;
		const key = `${eggs},${floors}`;
		const known = memo.get(key);
		if (known !== undefined) return known;
		let best = Number.POSITIVE_INFINITY;
		for (let floor = 1; floor <= floors; floor++)
			best = Math.min(
				best,
				1 + Math.max(solve(eggs - 1, floor - 1), solve(eggs, floors - floor)),
			);
		memo.set(key, best);
		return best;
	};
	return solve(k, n);
};

describe("887. Super Egg Drop", () => {
	it("solves the examples from the problem statement", () => {
		expect(superEggDrop(1, 2)).toBe(2);
		expect(superEggDrop(2, 6)).toBe(3);
		expect(superEggDrop(3, 14)).toBe(4);
	});

	it("matches the minimax DP for small buildings", () => {
		for (let k = 1; k <= 4; k++)
			for (let n = 1; n <= 60; n++)
				expect(superEggDrop(k, n)).toBe(byMinimax(k, n));
	});

	it("handles the largest inputs", () => {
		expect(superEggDrop(100, 10_000)).toBe(14);
		expect(superEggDrop(1, 10_000)).toBe(10_000);
	});
});
