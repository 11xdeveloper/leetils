import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfItIsAGoodArray as isGoodArray } from ".";

/** Searches for combinations reaching 1, within a window of small sums. */
const byBruteForce = (nums: number[]): boolean => {
	const reached = new Set([0]);
	const queue = [0];
	for (let i = 0; i < queue.length; i++) {
		const sum = queue[i] ?? 0;
		for (const num of nums) {
			for (const next of [sum + num, sum - num]) {
				if (Math.abs(next) > 200 || reached.has(next)) continue;
				reached.add(next);
				queue.push(next);
			}
		}
	}
	return reached.has(1);
};

describe("1250. Check If It Is a Good Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(isGoodArray([12, 5, 7, 23])).toBeTrue();
		expect(isGoodArray([29, 6, 10])).toBeTrue();
		expect(isGoodArray([3, 6])).toBeFalse();
	});

	it("handles a single number", () => {
		expect(isGoodArray([1])).toBeTrue();
		expect(isGoodArray([7])).toBeFalse();
	});

	it("matches searching for combinations on random inputs", () => {
		const random = createRandom(1250);
		for (let run = 0; run < 300; run++) {
			const factor = random.int(1, 3);
			const nums = random
				.array(random.int(1, 4), 1, 20)
				.map((num) => num * factor);
			expect(isGoodArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
