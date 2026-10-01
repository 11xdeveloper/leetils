import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { removeDuplicatesFromAnUnsortedLinkedList as deleteDuplicatesUnsorted } from ".";

describe("1836. Remove Duplicates From an Unsorted Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			listToArray(deleteDuplicatesUnsorted(listFromArray([1, 2, 3, 2]))),
		).toEqual([1, 3]);
		expect(
			listToArray(deleteDuplicatesUnsorted(listFromArray([2, 1, 1, 2]))),
		).toEqual([]);
		expect(
			listToArray(
				deleteDuplicatesUnsorted(listFromArray([3, 2, 2, 1, 3, 2, 4])),
			),
		).toEqual([1, 4]);
	});

	it("matches filtering an array on random lists", () => {
		const random = createRandom(1836);
		for (let run = 0; run < 200; run++) {
			const values = random.array(random.int(1, 12), 1, 6);
			const expected = values.filter(
				(v) => values.indexOf(v) === values.lastIndexOf(v),
			);
			expect(
				listToArray(deleteDuplicatesUnsorted(listFromArray(values))),
			).toEqual(expected);
		}
	});
});
