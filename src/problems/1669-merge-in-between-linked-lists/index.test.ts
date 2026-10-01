import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { mergeInBetweenLinkedLists as mergeInBetween } from ".";

const merge = (list1: number[], a: number, b: number, list2: number[]) =>
	listToArray(mergeInBetween(listFromArray(list1), a, b, listFromArray(list2)));

describe("1669. Merge In Between Linked Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			merge([10, 1, 13, 6, 9, 5], 3, 4, [1000000, 1000001, 1000002]),
		).toEqual([10, 1, 13, 1000000, 1000001, 1000002, 5]);
		expect(
			merge(
				[0, 1, 2, 3, 4, 5, 6],
				2,
				5,
				[1000000, 1000001, 1000002, 1000003, 1000004],
			),
		).toEqual([0, 1, 1000000, 1000001, 1000002, 1000003, 1000004, 6]);
	});

	it("matches splicing arrays on random inputs", () => {
		const random = createRandom(1669);
		for (let run = 0; run < 300; run++) {
			const list1 = random.array(random.int(3, 10), 0, 99);
			const a = random.int(1, list1.length - 2);
			const b = random.int(a, list1.length - 2);
			const list2 = random.array(random.int(1, 5), 100, 199);
			expect(merge(list1, a, b, list2)).toEqual([
				...list1.slice(0, a),
				...list2,
				...list1.slice(b + 1),
			]);
		}
	});
});
