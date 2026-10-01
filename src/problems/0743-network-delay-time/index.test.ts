import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { networkDelayTime } from ".";

/** Bellman–Ford: relax every edge n times. */
const byBellmanFord = (times: number[][], n: number, k: number): number => {
	const distance = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	distance[k] = 0;
	for (let round = 0; round < n; round++) {
		for (const [from = 0, to = 0, time = 0] of times)
			distance[to] = Math.min(distance[to] ?? 0, (distance[from] ?? 0) + time);
	}
	const longest = Math.max(...distance.slice(1));
	return longest === Number.POSITIVE_INFINITY ? -1 : longest;
};

describe("743. Network Delay Time", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			networkDelayTime(
				[
					[2, 1, 1],
					[2, 3, 1],
					[3, 4, 1],
				],
				4,
				2,
			),
		).toBe(2);
		expect(networkDelayTime([[1, 2, 1]], 2, 1)).toBe(1);
		expect(networkDelayTime([[1, 2, 1]], 2, 2)).toBe(-1);
	});

	it("matches Bellman–Ford on random graphs", () => {
		const random = createRandom(743);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const times = Array.from({ length: random.int(0, 15) }, () => [
				random.int(1, n),
				random.int(1, n),
				random.int(0, 10),
			]).filter(([a, b]) => a !== b);
			const k = random.int(1, n);
			expect(networkDelayTime(times, n, k)).toBe(byBellmanFord(times, n, k));
		}
	});
});
