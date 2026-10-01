import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { mergeKSortedLists } from ".";

const merge = (lists: number[][]): number[] =>
	listToArray(mergeKSortedLists(lists.map(listFromArray)));

describe("23. Merge k Sorted Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			merge([
				[1, 4, 5],
				[1, 3, 4],
				[2, 6],
			]),
		).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
		expect(merge([])).toEqual([]);
		expect(merge([[]])).toEqual([]);
	});

	it("handles a single list and a mix of empty lists", () => {
		expect(merge([[1, 2, 3]])).toEqual([1, 2, 3]);
		expect(merge([[], [2], [], [1, 3], []])).toEqual([1, 2, 3]);
	});

	it("matches sorting all the values, for any number of lists", () => {
		let seed = 23;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let k = 0; k <= 17; k++) {
			const lists = Array.from({ length: k }, () =>
				Array.from({ length: next() % 6 }, () => (next() % 21) - 10).toSorted(
					(a, b) => a - b,
				),
			);
			expect(merge(lists)).toEqual(lists.flat().toSorted((a, b) => a - b));
		}
	});
});
