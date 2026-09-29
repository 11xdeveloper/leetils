import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { containsDuplicateII } from ".";

const byBruteForce = (nums: number[], k: number): boolean =>
	nums.some((num, i) => nums.slice(i + 1, i + 1 + k).includes(num));

describe("219. Contains Duplicate II", () => {
	it("solves the examples from the problem statement", () => {
		expect(containsDuplicateII([1, 2, 3, 1], 3)).toBeTrue();
		expect(containsDuplicateII([1, 0, 1, 1], 1)).toBeTrue();
		expect(containsDuplicateII([1, 2, 3, 1, 2, 3], 2)).toBeFalse();
	});

	it("never matches with k of 0", () => {
		expect(containsDuplicateII([1, 1], 0)).toBeFalse();
	});

	it("matches checking every nearby pair on random inputs", () => {
		const random = createRandom(219);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), 0, 6);
			const k = random.int(0, 6);
			expect(containsDuplicateII(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
