import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { singleNumber } from ".";

describe("136. Single Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(singleNumber([2, 2, 1])).toBe(1);
		expect(singleNumber([4, 1, 2, 1, 2])).toBe(4);
		expect(singleNumber([1])).toBe(1);
	});

	it("handles negative numbers and zero", () => {
		expect(singleNumber([-3, 0, 0])).toBe(-3);
		expect(singleNumber([7, 0, 7])).toBe(0);
	});

	it("finds the single value in random shuffled pairs", () => {
		const random = createRandom(136);
		for (let run = 0; run < 300; run++) {
			const single = random.int(-30000, 30000);
			const pairs = random
				.array(random.int(0, 10), -30000, 30000)
				.filter((n) => n !== single);
			const nums = [...pairs, ...pairs, single].toSorted(
				() => random.next() - 0.5,
			);
			expect(singleNumber(nums)).toBe(single);
		}
	});
});
