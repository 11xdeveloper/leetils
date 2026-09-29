import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RangeSumQueryImmutable } from ".";

describe("303. Range Sum Query - Immutable", () => {
	it("solves the example from the problem statement", () => {
		const sums = new RangeSumQueryImmutable([-2, 0, 3, -5, 2, -1]);
		expect(sums.sumRange(0, 2)).toBe(1);
		expect(sums.sumRange(2, 5)).toBe(-1);
		expect(sums.sumRange(0, 5)).toBe(-3);
	});

	it("matches adding up every range of random arrays", () => {
		const random = createRandom(303);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 15), -100, 100);
			const sums = new RangeSumQueryImmutable(nums);
			for (let left = 0; left < nums.length; left++) {
				for (let right = left; right < nums.length; right++) {
					expect(sums.sumRange(left, right)).toBe(
						nums.slice(left, right + 1).reduce((a, b) => a + b, 0),
					);
				}
			}
		}
	});
});
