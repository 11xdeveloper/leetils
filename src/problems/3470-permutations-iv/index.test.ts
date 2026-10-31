import { describe, expect, it } from "bun:test";
import { permutationsIV as permute } from ".";

/** Lists the alternating permutations in order. */
const all = (n: number): number[][] => {
	const result: number[][] = [];
	const place = (current: number[], used: number): void => {
		if (current.length === n) {
			result.push(current);
			return;
		}
		for (let v = 1; v <= n; v++)
			if (
				!((used >> v) & 1) &&
				(current.length === 0 || (current.at(-1) ?? 0) % 2 !== v % 2)
			)
				place([...current, v], used | (1 << v));
	};
	place([], 0);
	return result;
};

describe("3470. Permutations IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(permute(4, 6)).toEqual([3, 4, 1, 2]);
		expect(permute(3, 2)).toEqual([3, 2, 1]);
		expect(permute(2, 3)).toEqual([]);
	});

	it("matches listing every permutation", () => {
		for (let n = 1; n <= 7; n++) {
			const list = all(n);
			for (let k = 1; k <= list.length + 1; k++)
				expect(permute(n, k)).toEqual(list[k - 1] ?? []);
		}
	});

	it("handles k up to 10^15", () => {
		expect(permute(100, 1e15)).toHaveLength(100);
	});
});
