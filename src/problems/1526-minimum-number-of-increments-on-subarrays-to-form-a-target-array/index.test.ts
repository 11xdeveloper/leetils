import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfIncrementsOnSubarraysToFormATargetArray as minNumberOperations } from ".";

/** Repeatedly lowers each maximal run of positive values by one. */
const byBruteForce = (target: number[]): number => {
	const current = [...target];
	let operations = 0;
	for (let i = 0; i < current.length; ) {
		if ((current[i] ?? 0) === 0) {
			i++;
			continue;
		}
		for (let j = i; j < current.length && (current[j] ?? 0) > 0; j++)
			current[j] = (current[j] ?? 0) - 1;
		operations++;
	}
	return operations;
};

describe("1526. Minimum Number of Increments on Subarrays to Form a Target Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumberOperations([1, 2, 3, 2, 1])).toBe(3);
		expect(minNumberOperations([3, 1, 1, 2])).toBe(4);
		expect(minNumberOperations([3, 1, 5, 4, 2])).toBe(7);
	});

	it("matches peeling off runs on random inputs", () => {
		const random = createRandom(1526);
		for (let run = 0; run < 300; run++) {
			const target = random.array(random.int(1, 10), 1, 6);
			expect(minNumberOperations(target)).toBe(byBruteForce(target));
		}
	});
});
