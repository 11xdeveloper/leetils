import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { partitionList } from ".";

const partition = (values: number[], x: number): number[] =>
	listToArray(partitionList(listFromArray(values), x));

describe("86. Partition List", () => {
	it("solves the examples from the problem statement", () => {
		expect(partition([1, 4, 3, 2, 5, 2], 3)).toEqual([1, 2, 2, 4, 3, 5]);
		expect(partition([2, 1], 2)).toEqual([1, 2]);
	});

	it("handles an empty list and lists entirely on one side", () => {
		expect(partition([], 0)).toEqual([]);
		expect(partition([1, 2], 5)).toEqual([1, 2]);
		expect(partition([5, 6], 1)).toEqual([5, 6]);
	});

	it("matches a stable filter on random inputs", () => {
		const random = createRandom(86);
		for (let run = 0; run < 500; run++) {
			const values = random.array(random.int(0, 15), -5, 5);
			const x = random.int(-6, 6);
			expect(partition(values, x)).toEqual([
				...values.filter((v) => v < x),
				...values.filter((v) => v >= x),
			]);
		}
	});
});
