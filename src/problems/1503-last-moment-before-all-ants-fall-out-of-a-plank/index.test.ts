import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lastMomentBeforeAllAntsFallOutOfAPlank as getLastMoment } from ".";

/**
 * Simulates in half-unit steps (ants meet at whole or half positions),
 * turning both ants round when they meet and dropping ants at the ends.
 */
const byBruteForce = (n: number, left: number[], right: number[]): number => {
	let ants = [...left.map((p) => [2 * p, -1]), ...right.map((p) => [2 * p, 1])];
	let time = 0;
	while (ants.length > 0) {
		ants = ants.map(([p = 0, d = 0]) => [p + d, d]);
		time++;
		// Ants on the same spot after moving towards each other turn round.
		const byPosition = new Map<number, number[][]>();
		for (const ant of ants)
			byPosition.set(ant[0] ?? 0, [
				...(byPosition.get(ant[0] ?? 0) ?? []),
				ant,
			]);
		for (const group of byPosition.values()) {
			if (group.length === 2) for (const ant of group) ant[1] = -(ant[1] ?? 0);
		}
		ants = ants.filter(([p = 0]) => p > 0 && p < 2 * n);
	}
	return time / 2;
};

describe("1503. Last Moment Before All Ants Fall Out of a Plank", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLastMoment(4, [4, 3], [0, 1])).toBe(4);
		expect(getLastMoment(7, [], [0, 1, 2, 3, 4, 5, 6, 7])).toBe(7);
		expect(getLastMoment(7, [0, 1, 2, 3, 4, 5, 6, 7], [])).toBe(7);
	});

	it("handles ants already at the edge", () => {
		expect(getLastMoment(5, [0], [5])).toBe(0);
	});

	it("matches simulating the collisions on random planks", () => {
		const random = createRandom(1503);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const positions = [
				...new Set(random.array(random.int(1, n + 1), 1, n - 1)),
			].filter((p) => p > 0 && p < n);
			if (positions.length === 0) continue;
			const left = positions.filter(() => random.next() < 0.5);
			const right = positions.filter((p) => !left.includes(p));
			expect(getLastMoment(n, left, right)).toBe(byBruteForce(n, left, right));
		}
	});
});
