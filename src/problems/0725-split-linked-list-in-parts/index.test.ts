import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { splitLinkedListInParts as splitListToParts } from ".";

describe("725. Split Linked List in Parts", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			splitListToParts(listFromArray([1, 2, 3]), 5).map(listToArray),
		).toEqual([[1], [2], [3], [], []]);
		expect(
			splitListToParts(listFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 3).map(
				listToArray,
			),
		).toEqual([
			[1, 2, 3, 4],
			[5, 6, 7],
			[8, 9, 10],
		]);
	});

	it("gives parts that concatenate back and differ in length by at most one, longest first", () => {
		const random = createRandom(725);
		for (let run = 0; run < 1000; run++) {
			const values = random.array(random.int(0, 20), 0, 99);
			const k = random.int(1, 8);
			const parts = splitListToParts(listFromArray(values), k).map(listToArray);
			expect(parts).toHaveLength(k);
			expect(parts.flat()).toEqual(values);
			const lengths = parts.map((part) => part.length);
			expect(lengths).toEqual(lengths.toSorted((a, b) => b - a));
			expect((lengths[0] ?? 0) - (lengths.at(-1) ?? 0)).toBeLessThanOrEqual(1);
		}
	});
});
