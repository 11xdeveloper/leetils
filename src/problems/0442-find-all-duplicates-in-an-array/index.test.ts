import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findAllDuplicatesInAnArray as findDuplicates } from ".";

const sorted = (values: number[]): number[] => values.toSorted((a, b) => a - b);

describe("442. Find All Duplicates in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]))).toEqual([2, 3]);
		expect(findDuplicates([1, 1, 2])).toEqual([1]);
		expect(findDuplicates([1])).toEqual([]);
	});

	it("leaves the array as it started", () => {
		const nums = [4, 3, 2, 7, 8, 2, 3, 1];
		findDuplicates(nums);
		expect(nums).toEqual([4, 3, 2, 7, 8, 2, 3, 1]);
	});

	it("matches counting on random inputs", () => {
		const random = createRandom(442);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 15);
			// Pick some values to repeat and fill the rest with distinct values.
			const values = Array.from({ length: n }, (_, i) => i + 1).toSorted(
				() => random.next() - 0.5,
			);
			const repeats = random.int(0, Math.floor(n / 2));
			const nums = [
				...values.slice(0, n - repeats),
				...values.slice(0, repeats),
			].toSorted(() => random.next() - 0.5);
			const expected = sorted([
				...new Set(nums.filter((v, i) => nums.indexOf(v) !== i)),
			]);
			expect(sorted(findDuplicates([...nums]))).toEqual(expected);
		}
	});
});
