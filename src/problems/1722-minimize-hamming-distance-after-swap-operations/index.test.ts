import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeHammingDistanceAfterSwapOperations as minimumHammingDistance } from ".";

/** Searches every arrangement reachable by the swaps. */
const byBruteForce = (
	source: number[],
	target: number[],
	swaps: number[][],
): number => {
	const start = source.join(",");
	const seen = new Set([start]);
	const queue = [source];
	let best = Infinity;
	for (let i = 0; i < queue.length; i++) {
		const current = queue[i] ?? [];
		best = Math.min(
			best,
			current.filter((value, j) => value !== target[j]).length,
		);
		for (const [a = 0, b = 0] of swaps) {
			const next = [...current];
			[next[a], next[b]] = [current[b] ?? 0, current[a] ?? 0];
			const key = next.join(",");
			if (seen.has(key)) continue;
			seen.add(key);
			queue.push(next);
		}
	}
	return best;
};

describe("1722. Minimize Hamming Distance After Swap Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumHammingDistance(
				[1, 2, 3, 4],
				[2, 1, 4, 5],
				[
					[0, 1],
					[2, 3],
				],
			),
		).toBe(1);
		expect(minimumHammingDistance([1, 2, 3, 4], [1, 3, 2, 4], [])).toBe(2);
		expect(
			minimumHammingDistance(
				[5, 1, 2, 4, 3],
				[1, 5, 4, 2, 3],
				[
					[0, 4],
					[4, 2],
					[1, 3],
					[1, 4],
				],
			),
		).toBe(0);
	});

	it("matches searching every arrangement on random inputs", () => {
		const random = createRandom(1722);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 6);
			const [source, target] = [random.array(n, 1, 3), random.array(n, 1, 3)];
			const swaps =
				n < 2
					? []
					: Array.from({ length: random.int(0, 4) }, () => {
							const a = random.int(0, n - 2);
							return [a, random.int(a + 1, n - 1)];
						});
			expect(minimumHammingDistance(source, target, swaps)).toBe(
				byBruteForce(source, target, swaps),
			);
		}
	});
});
