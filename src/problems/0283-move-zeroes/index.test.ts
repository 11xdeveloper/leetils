import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { moveZeroes } from ".";

const moved = (values: number[]): number[] => {
	const nums = [...values];
	expect(moveZeroes(nums)).toBeUndefined();
	return nums;
};

describe("283. Move Zeroes", () => {
	it("solves the examples from the problem statement", () => {
		expect(moved([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0]);
		expect(moved([0])).toEqual([0]);
	});

	it("matches a stable filter on random inputs", () => {
		const random = createRandom(283);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), -2, 3);
			const nonZero = nums.filter((n) => n !== 0);
			expect(moved(nums)).toEqual([
				...nonZero,
				...new Array(nums.length - nonZero.length).fill(0),
			]);
		}
	});
});
