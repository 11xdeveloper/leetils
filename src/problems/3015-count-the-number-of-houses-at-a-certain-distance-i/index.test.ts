import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfHousesAtACertainDistanceI as countOfPairs } from ".";

/** Breadth-first search from every house. */
const byBruteForce = (n: number, x: number, y: number): number[] => {
	const adjacent: number[][] = Array.from({ length: n + 1 }, () => []);
	for (let i = 1; i < n; i++) {
		adjacent[i]?.push(i + 1);
		adjacent[i + 1]?.push(i);
	}
	if (x !== y) {
		adjacent[x]?.push(y);
		adjacent[y]?.push(x);
	}
	const result = new Array<number>(n).fill(0);
	for (let start = 1; start <= n; start++) {
		const distance = new Array<number>(n + 1).fill(-1);
		distance[start] = 0;
		const queue = [start];
		for (let q = 0; q < queue.length; q++) {
			const node = queue[q] ?? 0;
			for (const next of adjacent[node] ?? [])
				if (distance[next] === -1) {
					distance[next] = (distance[node] ?? 0) + 1;
					queue.push(next);
				}
		}
		for (let j = 1; j <= n; j++)
			if (j !== start) {
				const d = (distance[j] ?? 0) - 1;
				result[d] = (result[d] ?? 0) + 1;
			}
	}
	return result;
};

describe("3015. Count the Number of Houses at a Certain Distance I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfPairs(3, 1, 3)).toEqual([6, 0, 0]);
		expect(countOfPairs(5, 2, 4)).toEqual([10, 8, 2, 0, 0]);
		expect(countOfPairs(4, 1, 1)).toEqual([6, 4, 2, 0]);
	});

	it("matches breadth-first search on random streets", () => {
		const random = createRandom(3015);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 15);
			const x = random.int(1, n);
			const y = random.int(1, n);
			expect(countOfPairs(n, x, y)).toEqual(byBruteForce(n, x, y));
		}
	});
});
