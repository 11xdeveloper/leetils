import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfWaysToReconstructATree as checkWays } from ".";

/** Tries every parent assignment and checks the ancestor pairs. */
const byBruteForce = (pairs: number[][]): number => {
	const nodes = [...new Set(pairs.flat())];
	const wanted = new Set(
		pairs.map(([x = 0, y = 0]) => `${Math.min(x, y)},${Math.max(x, y)}`),
	);
	let ways = 0;
	const parent = new Map<number, number | null>();
	const assign = (i: number) => {
		if (ways > 1) return;
		if (i === nodes.length) {
			const roots = nodes.filter((node) => parent.get(node) === null);
			if (roots.length !== 1) return;
			const found = new Set<string>();
			for (const node of nodes) {
				const seen = new Set<number>();
				for (
					let up = parent.get(node) ?? null;
					up !== null;
					up = parent.get(up) ?? null
				) {
					if (seen.has(up)) return;
					seen.add(up);
					found.add(`${Math.min(node, up)},${Math.max(node, up)}`);
				}
			}
			if (
				found.size === wanted.size &&
				[...found].every((pair) => wanted.has(pair))
			)
				ways++;
			return;
		}
		const node = nodes[i] ?? 0;
		for (const choice of [null, ...nodes.filter((other) => other !== node)]) {
			parent.set(node, choice);
			assign(i + 1);
		}
	};
	assign(0);
	return Math.min(ways, 2);
};

describe("1719. Number Of Ways To Reconstruct A Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkWays([
				[1, 2],
				[2, 3],
			]),
		).toBe(1);
		expect(
			checkWays([
				[1, 2],
				[2, 3],
				[1, 3],
			]),
		).toBe(2);
		expect(
			checkWays([
				[1, 2],
				[2, 3],
				[2, 4],
				[1, 5],
			]),
		).toBe(0);
	});

	it("matches trying every tree on random inputs", () => {
		const random = createRandom(1719);
		for (let run = 0; run < 400; run++) {
			const n = random.int(2, 5);
			const pairs: number[][] = [];
			for (let x = 1; x <= n; x++)
				for (let y = x + 1; y <= n; y++)
					if (random.int(0, 2) > 0) pairs.push([x, y]);
			if (pairs.length === 0) continue;
			expect(checkWays(pairs)).toBe(byBruteForce(pairs));
		}
	});
});
