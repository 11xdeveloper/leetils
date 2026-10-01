import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeOneElementToMakeTheArrayStrictlyIncreasing as canBeIncreasing } from ".";

describe("1909. Remove One Element to Make the Array Strictly Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(canBeIncreasing([1, 2, 10, 5, 7])).toBeTrue();
		expect(canBeIncreasing([2, 3, 1, 2])).toBeFalse();
		expect(canBeIncreasing([1, 1, 1])).toBeFalse();
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1909);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 8), 1, 8);
			const expected = nums.some((_, k) => {
				const rest = nums.filter((_, i) => i !== k);
				return rest.every((v, i) => i === 0 || v > (rest[i - 1] ?? 0));
			});
			expect(canBeIncreasing(nums)).toBe(expected);
		}
	});
});
