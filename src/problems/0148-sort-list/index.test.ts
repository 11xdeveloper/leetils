import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { sortList } from ".";

const sort = (values: number[]): number[] =>
	listToArray(sortList(listFromArray(values)));

describe("148. Sort List", () => {
	it("solves the examples from the problem statement", () => {
		expect(sort([4, 2, 1, 3])).toEqual([1, 2, 3, 4]);
		expect(sort([-1, 5, 3, 4, 0])).toEqual([-1, 0, 3, 4, 5]);
		expect(sort([])).toEqual([]);
	});

	it("sorts a list at the constraint of 50,000 nodes", () => {
		const values = Array.from(
			{ length: 50_000 },
			(_, i) => (i * 7919) % 50_000,
		);
		expect(sort(values)).toEqual(values.toSorted((a, b) => a - b));
	});

	it("matches sorting an array on random inputs of every small length", () => {
		const random = createRandom(148);
		for (let run = 0; run < 500; run++) {
			const values = random.array(run % 40, -9, 9);
			expect(sort(values)).toEqual(values.toSorted((a, b) => a - b));
		}
	});
});
