import { describe, expect, it } from "bun:test";
import { Heap } from "../../internal/heap";
import { createRandom } from "../../testing/random";
import { minimumCostToMakeTwoBinaryStringsEqual as minimumCost } from ".";

/** Dijkstra over every pair of strings. */
const byBruteForce = (
	s: string,
	t: string,
	flip: number,
	swap: number,
	cross: number,
): number => {
	const n = s.length;
	const start = Number.parseInt(s + t, 2);
	const best = new Map([[start, 0]]);
	const heap = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, start]]);
	const bit = (x: number, i: number) => (x >> (2 * n - 1 - i)) & 1;
	const set = (x: number, i: number, v: number) =>
		bit(x, i) === v ? x : x ^ (1 << (2 * n - 1 - i));
	while (heap.size > 0) {
		const [cost, x] = heap.pop() ?? [0, 0];
		if (cost > (best.get(x) ?? 0)) continue;
		if (x >> n === (x & ((1 << n) - 1))) return cost;
		const moves: [number, number][] = [];
		for (let i = 0; i < 2 * n; i++)
			moves.push([x ^ (1 << (2 * n - 1 - i)), flip]);
		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++)
				for (const offset of [0, n]) {
					const [a, b] = [bit(x, i + offset), bit(x, j + offset)];
					moves.push([set(set(x, i + offset, b), j + offset, a), swap]);
				}
			const [a, b] = [bit(x, i), bit(x, i + n)];
			moves.push([set(set(x, i, b), i + n, a), cross]);
		}
		for (const [y, c] of moves)
			if (cost + c < (best.get(y) ?? Number.POSITIVE_INFINITY)) {
				best.set(y, cost + c);
				heap.push([cost + c, y]);
			}
	}
	return -1;
};

describe("3800. Minimum Cost to Make Two Binary Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost("01000", "10111", 10, 2, 2)).toBe(16);
		expect(minimumCost("001", "110", 2, 100, 100)).toBe(6);
		expect(minimumCost("1010", "1010", 5, 5, 5)).toBe(0);
	});

	it("matches searching every pair of strings", () => {
		const random = createRandom(3800);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 4);
			const [s, t] = [random.string(n, "01"), random.string(n, "01")];
			const [f, w, c] = [random.int(1, 9), random.int(1, 9), random.int(1, 9)];
			expect(minimumCost(s, t, f, w, c)).toBe(byBruteForce(s, t, f, w, c));
		}
	});
});
