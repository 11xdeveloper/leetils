import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { removeLinkedListElements } from ".";

const remove = (values: number[], val: number): number[] =>
	listToArray(removeLinkedListElements(listFromArray(values), val));

describe("203. Remove Linked List Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(remove([1, 2, 6, 3, 4, 5, 6], 6)).toEqual([1, 2, 3, 4, 5]);
		expect(remove([], 1)).toEqual([]);
		expect(remove([7, 7, 7, 7], 7)).toEqual([]);
	});

	it("matches filtering on random lists", () => {
		const random = createRandom(203);
		for (let run = 0; run < 500; run++) {
			const values = random.array(random.int(0, 15), 1, 4);
			const val = random.int(1, 4);
			expect(remove(values, val)).toEqual(values.filter((v) => v !== val));
		}
	});
});
