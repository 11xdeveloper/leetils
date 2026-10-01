import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { topKFrequentElements as topK } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("347. Top K Frequent Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(topK([1, 1, 1, 2, 2, 3], 2))).toEqual([1, 2]);
		expect(topK([1], 1)).toEqual([1]);
		expect(sorted(topK([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2))).toEqual([1, 2]);
	});

	it("matches sorting by count on random inputs with a unique answer", () => {
		const random = createRandom(347);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), -5, 5);
			const counts = new Map<number, number>();
			for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
			const byCount = [...counts].toSorted((a, b) => b[1] - a[1]);
			const k = random.int(1, byCount.length);
			// Skip inputs where the kth and (k+1)th values tie, which have no unique answer.
			if (k < byCount.length && byCount[k - 1]?.[1] === byCount[k]?.[1])
				continue;
			expect(sorted(topK(nums, k))).toEqual(
				sorted(byCount.slice(0, k).map(([num]) => num)),
			);
		}
	});
});
