import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { insertionSortList } from ".";

const sort = (values: number[]): number[] =>
	listToArray(insertionSortList(listFromArray(values)));

describe("147. Insertion Sort List", () => {
	it("solves the examples from the problem statement", () => {
		expect(sort([4, 2, 1, 3])).toEqual([1, 2, 3, 4]);
		expect(sort([-1, 5, 3, 4, 0])).toEqual([-1, 0, 3, 4, 5]);
	});

	it("handles empty, single-node and already sorted lists", () => {
		expect(sort([])).toEqual([]);
		expect(sort([1])).toEqual([1]);
		expect(sort([1, 2, 3])).toEqual([1, 2, 3]);
	});

	it("matches sorting an array on random inputs", () => {
		const random = createRandom(147);
		for (let run = 0; run < 500; run++) {
			const values = random.array(random.int(0, 20), -9, 9);
			expect(sort(values)).toEqual(values.toSorted((a, b) => a - b));
		}
	});
});
