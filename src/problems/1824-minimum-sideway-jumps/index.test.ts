import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSidewayJumps as minSideJumps } from ".";

/** 0-1 breadth-first search over (point, lane). */
const byBruteForce = (obstacles: number[]): number => {
	const n = obstacles.length - 1;
	const dist = new Map([["0,2", 0]]);
	const deque: [number, number][] = [[0, 2]];
	while (deque.length > 0) {
		const [point, lane] = deque.shift() ?? [0, 2];
		const d = dist.get(`${point},${lane}`) ?? 0;
		if (point === n) return d;
		const moves: [number, number, number][] = [[point + 1, lane, 0]];
		for (let other = 1; other <= 3; other++)
			if (other !== lane) moves.push([point, other, 1]);
		for (const [p, l, cost] of moves) {
			if (obstacles[p] === l) continue;
			const key = `${p},${l}`;
			if ((dist.get(key) ?? Infinity) <= d + cost) continue;
			dist.set(key, d + cost);
			if (cost === 0) deque.unshift([p, l]);
			else deque.push([p, l]);
		}
	}
	return -1;
};

describe("1824. Minimum Sideway Jumps", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSideJumps([0, 1, 2, 3, 0])).toBe(2);
		expect(minSideJumps([0, 1, 1, 3, 3, 0])).toBe(0);
		expect(minSideJumps([0, 2, 1, 0, 3, 0])).toBe(2);
	});

	it("matches a 0-1 breadth-first search on random roads", () => {
		const random = createRandom(1824);
		for (let run = 0; run < 300; run++) {
			const obstacles = [0, ...random.array(random.int(1, 12), 0, 3), 0];
			expect(minSideJumps(obstacles)).toBe(byBruteForce(obstacles));
		}
	});
});
