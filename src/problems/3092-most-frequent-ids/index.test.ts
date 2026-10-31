import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mostFrequentIds } from ".";

describe("3092. Most Frequent IDs", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostFrequentIds([2, 3, 2, 1], [3, 2, -3, 1])).toEqual([3, 3, 2, 2]);
		expect(mostFrequentIds([5, 5, 3], [2, -2, 1])).toEqual([2, 0, 1]);
	});

	it("matches recounting after each step", () => {
		const random = createRandom(3092);
		for (let run = 0; run < 200; run++) {
			const counts = new Map<number, number>();
			const nums: number[] = [];
			const freq: number[] = [];
			const expected: number[] = [];
			for (let i = random.int(1, 12); i > 0; i--) {
				const id = random.int(1, 4);
				const current = counts.get(id) ?? 0;
				const change = random.int(-current, 3) || 1;
				counts.set(id, current + change);
				nums.push(id);
				freq.push(change);
				expected.push(Math.max(0, ...counts.values()));
			}
			expect(mostFrequentIds(nums, freq)).toEqual(expected);
		}
	});
});
