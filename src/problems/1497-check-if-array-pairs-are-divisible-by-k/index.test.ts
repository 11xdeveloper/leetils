import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfArrayPairsAreDivisibleByK as canArrange } from ".";

/** Pairs the first element with every possible partner, recursively. */
const byBruteForce = (arr: number[], k: number): boolean => {
	if (arr.length === 0) return true;
	const [first = 0, ...rest] = arr;
	return rest.some(
		(value, i) =>
			(((first + value) % k) + k) % k === 0 &&
			byBruteForce(
				rest.filter((_, j) => j !== i),
				k,
			),
	);
};

describe("1497. Check If Array Pairs Are Divisible by k", () => {
	it("solves the examples from the problem statement", () => {
		expect(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5)).toBeTrue();
		expect(canArrange([1, 2, 3, 4, 5, 6], 7)).toBeTrue();
		expect(canArrange([1, 2, 3, 4, 5, 6], 10)).toBeFalse();
	});

	it("handles negative numbers and the middle remainder", () => {
		expect(canArrange([-1, 1, -4, 4], 5)).toBeTrue();
		expect(canArrange([3, 3, 1, 1], 6)).toBeFalse();
		expect(canArrange([3, 3, 3, 3], 6)).toBeTrue();
	});

	it("matches trying every pairing on random inputs", () => {
		const random = createRandom(1497);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(2 * random.int(1, 4), -10, 10);
			const k = random.int(1, 6);
			expect(canArrange(arr, k)).toBe(byBruteForce(arr, k));
		}
	});
});
