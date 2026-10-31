import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { closestEqualElementQueries as solveQueries } from ".";

describe("3488. Closest Equal Element Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(solveQueries([1, 3, 1, 4, 1, 3, 2], [0, 3, 5])).toEqual([2, -1, 3]);
		expect(solveQueries([1, 2, 3, 4], [0, 1, 2, 3])).toEqual([-1, -1, -1, -1]);
	});

	it("matches checking every index on random arrays", () => {
		const random = createRandom(3488);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 3);
			const n = nums.length;
			const queries = nums.map((_, i) => i);
			const expected = queries.map((q) => {
				let best = -1;
				nums.forEach((v, i) => {
					if (i === q || v !== nums[q]) return;
					const d = Math.min(Math.abs(i - q), n - Math.abs(i - q));
					if (best === -1 || d < best) best = d;
				});
				return best;
			});
			expect(solveQueries(nums, queries)).toEqual(expected);
		}
	});
});
