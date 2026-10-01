import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distributeRepeatingIntegers as canDistribute } from ".";

/** Assigns each customer to some value in turn. */
const byBruteForce = (nums: number[], quantity: number[]): boolean => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const left = [...counts.values()];
	const assign = (i: number): boolean => {
		if (i === quantity.length) return true;
		for (let v = 0; v < left.length; v++) {
			if ((left[v] ?? 0) < (quantity[i] ?? 0)) continue;
			left[v] = (left[v] ?? 0) - (quantity[i] ?? 0);
			const done = assign(i + 1);
			left[v] = (left[v] ?? 0) + (quantity[i] ?? 0);
			if (done) return true;
		}
		return false;
	};
	return assign(0);
};

describe("1655. Distribute Repeating Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(canDistribute([1, 2, 3, 4], [2])).toBeFalse();
		expect(canDistribute([1, 2, 3, 3], [2])).toBeTrue();
		expect(canDistribute([1, 1, 2, 2], [2, 2])).toBeTrue();
	});

	it("matches assigning customers directly on random inputs", () => {
		const random = createRandom(1655);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 4);
			const quantity = random.array(random.int(1, 5), 1, 5);
			expect(canDistribute(nums, quantity)).toBe(byBruteForce(nums, quantity));
		}
	});
});
