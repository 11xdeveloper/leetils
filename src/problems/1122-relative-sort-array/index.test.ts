import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { relativeSortArray } from ".";

/** Sorts by position in arr2, with values missing from it after, by value. */
const byBruteForce = (arr1: number[], arr2: number[]): number[] =>
	arr1.toSorted((a, b) => {
		const [i, j] = [arr2.indexOf(a), arr2.indexOf(b)];
		if (i !== -1 && j !== -1) return i - j;
		if (i !== -1 || j !== -1) return i !== -1 ? -1 : 1;
		return a - b;
	});

describe("1122. Relative Sort Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]),
		).toEqual([2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19]);
		expect(relativeSortArray([28, 6, 22, 8, 44, 17], [22, 28, 8, 6])).toEqual([
			22, 28, 8, 6, 17, 44,
		]);
	});

	it("matches sorting by position on random inputs", () => {
		const random = createRandom(1122);
		for (let run = 0; run < 300; run++) {
			const arr1 = random.array(random.int(1, 20), 0, 15);
			const arr2 = [...new Set(arr1)].filter(() => random.next() < 0.5);
			expect(relativeSortArray(arr1, arr2)).toEqual(byBruteForce(arr1, arr2));
		}
	});
});
