import { describe, expect, it } from "bun:test";
import { minimumOperationsToReduceAnIntegerTo0 as minOperations } from ".";

/** Breadth-first search over values up to a bound. */
const byBruteForce = (limit: number): number[] => {
	const distance = Array.from({ length: limit + 1 }, () => -1);
	distance[0] = 0;
	const queue = [0];
	for (let i = 0; i < queue.length; i++) {
		const x = queue[i] ?? 0;
		for (let p = 1; p <= limit; p *= 2)
			for (const next of [x + p, x - p])
				if (next >= 0 && next <= limit && distance[next] === -1) {
					distance[next] = (distance[x] ?? 0) + 1;
					queue.push(next);
				}
	}
	return distance;
};

describe("2571. Minimum Operations to Reduce an Integer to 0", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations(39)).toBe(3);
		expect(minOperations(54)).toBe(3);
	});

	it("matches a breadth-first search for small numbers", () => {
		const distance = byBruteForce(1024);
		for (let n = 1; n <= 300; n++)
			expect(minOperations(n)).toBe(distance[n] ?? -1);
	});
});
