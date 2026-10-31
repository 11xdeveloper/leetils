import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { finalArrayStateAfterKMultiplicationOperationsII as getFinalState } from ".";

/** Simulates every operation with exact integers. */
const byBruteForce = (
	nums: number[],
	k: number,
	multiplier: number,
): number[] => {
	const values = nums.map(BigInt);
	for (let step = 0; step < k; step++) {
		let smallest = 0;
		values.forEach((v, i) => {
			if (v < (values[smallest] ?? 0n)) smallest = i;
		});
		values[smallest] = (values[smallest] ?? 0n) * BigInt(multiplier);
	}
	return values.map((v) => Number(v % 1_000_000_007n));
};

describe("3266. Final Array State After K Multiplication Operations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(getFinalState([2, 1, 3, 5, 6], 5, 2)).toEqual([8, 4, 6, 5, 6]);
		expect(getFinalState([100000, 2000], 2, 1000000)).toEqual([
			999999307, 999999993,
		]);
	});

	it("matches simulating every operation on random arrays", () => {
		const random = createRandom(3266);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), 1, 20);
			const k = random.int(1, 40);
			const multiplier = random.int(1, 4);
			expect(getFinalState(nums, k, multiplier)).toEqual(
				byBruteForce(nums, k, multiplier),
			);
		}
	});

	it("handles huge k", () => {
		const result = getFinalState([1, 2, 3], 1e9, 2);
		expect(result).toHaveLength(3);
		expect(result.every((v) => v >= 0 && v < 1_000_000_007)).toBeTrue();
	});
});
