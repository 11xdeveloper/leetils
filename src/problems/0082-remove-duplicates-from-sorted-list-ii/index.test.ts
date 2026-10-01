import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { removeDuplicatesFromSortedListII } from ".";

const remove = (values: number[]): number[] =>
	listToArray(removeDuplicatesFromSortedListII(listFromArray(values)));

const byCounting = (values: number[]): number[] =>
	values.filter((value) => values.indexOf(value) === values.lastIndexOf(value));

describe("82. Remove Duplicates from Sorted List II", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([1, 2, 3, 3, 4, 4, 5])).toEqual([1, 2, 5]);
		expect(remove([1, 1, 1, 2, 3])).toEqual([2, 3]);
	});

	it("handles an empty list and a list of only duplicates", () => {
		expect(remove([])).toEqual([]);
		expect(remove([1, 1, 2, 2])).toEqual([]);
	});

	it("matches keeping values that appear once on random sorted lists", () => {
		const random = createRandom(82);
		for (let run = 0; run < 500; run++) {
			const values = random
				.array(random.int(0, 15), -3, 3)
				.toSorted((a, b) => a - b);
			expect(remove(values)).toEqual(byCounting(values));
		}
	});
});
