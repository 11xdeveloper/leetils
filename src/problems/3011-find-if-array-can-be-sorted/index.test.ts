import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findIfArrayCanBeSorted } from ".";

/** Bubble sort with the allowed swaps only. */
const byBruteForce = (nums: number[]): boolean => {
	const bits = (v: number) => v.toString(2).replaceAll("0", "").length;
	const arr = [...nums];
	for (let pass = 0; pass < arr.length; pass++)
		for (let i = 0; i + 1 < arr.length; i++) {
			const [a = 0, b = 0] = [arr[i], arr[i + 1]];
			if (a > b && bits(a) === bits(b)) [arr[i], arr[i + 1]] = [b, a];
		}
	return arr.every((v, i) => i === 0 || (arr[i - 1] ?? 0) <= v);
};

describe("3011. Find if Array Can Be Sorted", () => {
	it("solves the examples from the problem statement", () => {
		expect(findIfArrayCanBeSorted([8, 4, 2, 30, 15])).toBeTrue();
		expect(findIfArrayCanBeSorted([1, 2, 3, 4, 5])).toBeTrue();
		expect(findIfArrayCanBeSorted([3, 16, 8, 4, 2])).toBeFalse();
	});

	it("matches restricted bubble sort on random arrays", () => {
		const random = createRandom(3011);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 20);
			expect(findIfArrayCanBeSorted(nums)).toBe(byBruteForce(nums));
		}
	});
});
