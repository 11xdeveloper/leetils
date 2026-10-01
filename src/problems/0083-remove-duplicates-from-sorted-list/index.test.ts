import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { removeDuplicatesFromSortedList } from ".";

const remove = (values: number[]): number[] =>
	listToArray(removeDuplicatesFromSortedList(listFromArray(values)));

describe("83. Remove Duplicates from Sorted List", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([1, 1, 2])).toEqual([1, 2]);
		expect(remove([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
	});

	it("handles an empty list and a list of one value", () => {
		expect(remove([])).toEqual([]);
		expect(remove([4, 4, 4])).toEqual([4]);
	});

	it("matches a Set on random sorted lists", () => {
		const random = createRandom(83);
		for (let run = 0; run < 500; run++) {
			const values = random
				.array(random.int(0, 15), -3, 3)
				.toSorted((a, b) => a - b);
			expect(remove(values)).toEqual([...new Set(values)]);
		}
	});
});
