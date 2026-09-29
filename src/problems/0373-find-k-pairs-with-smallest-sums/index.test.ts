import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findKPairsWithSmallestSums as kSmallestPairs } from ".";

describe("373. Find K Pairs with Smallest Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)).toEqual([
			[1, 2],
			[1, 4],
			[1, 6],
		]);
		expect(kSmallestPairs([1, 1, 2], [1, 2, 3], 2)).toEqual([
			[1, 1],
			[1, 1],
		]);
	});

	it("returns the smallest sums, as valid pairs, on random inputs", () => {
		const random = createRandom(373);
		for (let run = 0; run < 500; run++) {
			const a = random
				.array(random.int(1, 8), -10, 10)
				.toSorted((x, y) => x - y);
			const b = random
				.array(random.int(1, 8), -10, 10)
				.toSorted((x, y) => x - y);
			const k = random.int(1, a.length * b.length);
			const allSums = a
				.flatMap((x) => b.map((y) => x + y))
				.toSorted((x, y) => x - y);
			const pairs = kSmallestPairs(a, b, k);
			expect(pairs.map(([x = 0, y = 0]) => x + y)).toEqual(allSums.slice(0, k));
			// Each pair must use distinct positions; count how often each (x, y) value pair can occur.
			const available = new Map<string, number>();
			for (const x of a)
				for (const y of b)
					available.set(`${x},${y}`, (available.get(`${x},${y}`) ?? 0) + 1);
			for (const [x, y] of pairs) {
				const key = `${x},${y}`;
				expect(available.get(key) ?? 0).toBeGreaterThan(0);
				available.set(key, (available.get(key) ?? 0) - 1);
			}
		}
	});
});
