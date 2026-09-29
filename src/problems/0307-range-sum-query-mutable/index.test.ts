import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeSumQueryMutable } from ".";

describe("307. Range Sum Query - Mutable", () => {
	it("solves the example from the problem statement", () => {
		const sums = new RangeSumQueryMutable([1, 3, 5]);
		expect(sums.sumRange(0, 2)).toBe(9);
		sums.update(1, 2);
		expect(sums.sumRange(0, 2)).toBe(8);
	});

	it("matches an array on random updates and queries", () => {
		const random = createRandom(307);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 20), -100, 100);
			const sums = new RangeSumQueryMutable(nums);
			for (let step = 0; step < 50; step++) {
				if (random.int(0, 1) === 0) {
					const index = random.int(0, nums.length - 1);
					const val = random.int(-100, 100);
					sums.update(index, val);
					nums[index] = val;
				} else {
					const left = random.int(0, nums.length - 1);
					const right = random.int(left, nums.length - 1);
					expect(sums.sumRange(left, right)).toBe(
						nums.slice(left, right + 1).reduce((a, b) => a + b, 0),
					);
				}
			}
		}
	});
});
