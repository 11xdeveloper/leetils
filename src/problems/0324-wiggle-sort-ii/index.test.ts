import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { wiggleSortII } from ".";

const isStrictWiggle = (nums: number[]): boolean =>
	nums.every(
		(num, i) =>
			i === 0 ||
			(i % 2 === 1 ? (nums[i - 1] ?? 0) < num : (nums[i - 1] ?? 0) > num),
	);

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("324. Wiggle Sort II", () => {
	it("solves the examples from the problem statement", () => {
		for (const input of [
			[1, 5, 1, 1, 6, 4],
			[1, 3, 2, 2, 3, 1],
		]) {
			const nums = [...input];
			expect(wiggleSortII(nums)).toBeUndefined();
			expect(isStrictWiggle(nums)).toBeTrue();
			expect(sorted(nums)).toEqual(sorted(input));
		}
	});

	it("keeps many equal values apart", () => {
		const nums = [4, 5, 5, 6];
		wiggleSortII(nums);
		expect(isStrictWiggle(nums)).toBeTrue();
	});

	it("wiggles random arrays that have a valid order", () => {
		const random = createRandom(324);
		for (let run = 0; run < 1000; run++) {
			// Build a valid wiggle, then shuffle it.
			const n = random.int(1, 15);
			const wiggle: number[] = [];
			for (let i = 0; i < n; i++) {
				const previous = wiggle.at(-1) ?? 50;
				wiggle.push(
					i === 0
						? random.int(0, 10)
						: i % 2 === 1
							? previous + random.int(1, 3)
							: previous - random.int(1, 3),
				);
			}
			const nums = wiggle.toSorted(() => random.next() - 0.5);
			wiggleSortII(nums);
			expect(isStrictWiggle(nums)).toBeTrue();
			expect(sorted(nums)).toEqual(sorted(wiggle));
		}
	});
});
