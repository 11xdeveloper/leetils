import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { majorityElementII } from ".";

const byCounting = (nums: number[]): number[] =>
	[...new Set(nums)].filter(
		(value) => nums.filter((num) => num === value).length > nums.length / 3,
	);

describe("229. Majority Element II", () => {
	it("solves the examples from the problem statement", () => {
		expect(majorityElementII([3, 2, 3])).toEqual([3]);
		expect(majorityElementII([1])).toEqual([1]);
		expect(majorityElementII([1, 2]).toSorted()).toEqual([1, 2]);
	});

	it("returns nothing when no value is frequent enough", () => {
		expect(majorityElementII([1, 2, 3])).toEqual([]);
	});

	it("handles the candidates' starting values appearing in the input", () => {
		expect(majorityElementII([0, 0, 0])).toEqual([0]);
		expect(majorityElementII([1, 1, 1])).toEqual([1]);
	});

	it("matches counting every value on random inputs", () => {
		const random = createRandom(229);
		for (let run = 0; run < 2000; run++) {
			const nums = random.array(random.int(1, 15), -2, 3);
			expect(majorityElementII(nums).toSorted()).toEqual(
				byCounting(nums).toSorted(),
			);
		}
	});
});
