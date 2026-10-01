import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { swappingNodesInALinkedList as swapNodes } from ".";

describe("1721. Swapping Nodes in a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(listToArray(swapNodes(listFromArray([1, 2, 3, 4, 5]), 2))).toEqual([
			1, 4, 3, 2, 5,
		]);
		expect(
			listToArray(swapNodes(listFromArray([7, 9, 6, 6, 7, 8, 3, 0, 9, 5]), 5)),
		).toEqual([7, 9, 6, 6, 8, 7, 3, 0, 9, 5]);
	});

	it("matches swapping array elements on random inputs", () => {
		const random = createRandom(1721);
		for (let run = 0; run < 200; run++) {
			const values = random.array(random.int(1, 10), 0, 99);
			const k = random.int(1, values.length);
			const expected = [...values];
			[expected[k - 1], expected[values.length - k]] = [
				values[values.length - k] ?? 0,
				values[k - 1] ?? 0,
			];
			expect(listToArray(swapNodes(listFromArray(values), k))).toEqual(
				expected,
			);
		}
	});
});
