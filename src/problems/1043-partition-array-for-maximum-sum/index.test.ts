import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionArrayForMaximumSum as maxSumAfterPartitioning } from ".";

describe("1043. Partition Array for Maximum Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3)).toBe(84);
		expect(maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)).toBe(
			83,
		);
		expect(maxSumAfterPartitioning([1], 1)).toBe(1);
	});

	it("matches trying every set of cuts on random inputs", () => {
		const random = createRandom(1043);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 10), 0, 20);
			const k = random.int(1, 4);
			let best = 0;
			for (let cuts = 0; cuts < 1 << (arr.length - 1); cuts++) {
				const pieces: number[][] = [[]];
				for (const [i, value] of arr.entries()) {
					pieces.at(-1)?.push(value);
					if (cuts & (1 << i)) pieces.push([]);
				}
				if (pieces.every((piece) => piece.length <= k))
					best = Math.max(
						best,
						pieces.reduce(
							(sum, piece) => sum + Math.max(...piece) * piece.length,
							0,
						),
					);
			}
			expect(maxSumAfterPartitioning(arr, k)).toBe(best);
		}
	});
});
