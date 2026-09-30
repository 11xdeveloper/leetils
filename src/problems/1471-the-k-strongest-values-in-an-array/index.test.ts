import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theKStrongestValuesInAnArray as getStrongest } from ".";

/** Sorts everything by strength and takes the first k. */
const byBruteForce = (arr: number[], k: number): number[] => {
	const median =
		arr.toSorted((a, b) => a - b)[Math.floor((arr.length - 1) / 2)] ?? 0;
	return arr
		.toSorted((a, b) => Math.abs(b - median) - Math.abs(a - median) || b - a)
		.slice(0, k);
};

const sorted = (values: number[]) => values.toSorted((a, b) => a - b);

describe("1471. The k Strongest Values in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(getStrongest([1, 2, 3, 4, 5], 2))).toEqual([1, 5]);
		expect(getStrongest([1, 1, 3, 5, 5], 2)).toEqual([5, 5]);
		expect(sorted(getStrongest([6, 7, 11, 7, 6, 8], 5))).toEqual([
			6, 6, 7, 8, 11,
		]);
	});

	it("matches sorting by strength on random inputs", () => {
		const random = createRandom(1471);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), -10, 10);
			const k = random.int(1, arr.length);
			expect(sorted(getStrongest(arr, k))).toEqual(
				sorted(byBruteForce(arr, k)),
			);
		}
	});
});
