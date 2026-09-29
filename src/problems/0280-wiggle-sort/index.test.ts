import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wiggleSort } from ".";

const isWiggle = (nums: number[]): boolean =>
	nums.every(
		(num, i) =>
			i === 0 ||
			(i % 2 === 1 ? (nums[i - 1] ?? 0) <= num : (nums[i - 1] ?? 0) >= num),
	);

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("280. Wiggle Sort", () => {
	it("solves the examples from the problem statement", () => {
		const first = [3, 5, 2, 1, 6, 4];
		expect(wiggleSort(first)).toBeUndefined();
		expect(isWiggle(first)).toBeTrue();
		const second = [6, 6, 5, 6, 3, 8];
		wiggleSort(second);
		expect(isWiggle(second)).toBeTrue();
	});

	it("wiggles random arrays, keeping their values", () => {
		const random = createRandom(280);
		for (let run = 0; run < 1000; run++) {
			const original = random.array(random.int(1, 15), 0, 5);
			const nums = [...original];
			wiggleSort(nums);
			expect(isWiggle(nums)).toBeTrue();
			expect(sorted(nums)).toEqual(sorted(original));
		}
	});
});
