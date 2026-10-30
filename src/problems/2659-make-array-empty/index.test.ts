import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeArrayEmpty as countOperationsToEmptyArray } from ".";

/** Simulates the operations. */
const byBruteForce = (nums: number[]): number => {
	const queue = [...nums];
	let operations = 0;
	while (queue.length > 0) {
		const first = queue.shift() ?? 0;
		if (first !== Math.min(first, ...queue)) queue.push(first);
		operations++;
	}
	return operations;
};

describe("2659. Make Array Empty", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOperationsToEmptyArray([3, 4, -1])).toBe(5);
		expect(countOperationsToEmptyArray([1, 2, 4, 3])).toBe(5);
		expect(countOperationsToEmptyArray([1, 2, 3])).toBe(3);
	});

	it("matches simulating on random inputs", () => {
		const random = createRandom(2659);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), -20, 20))];
			expect(countOperationsToEmptyArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
