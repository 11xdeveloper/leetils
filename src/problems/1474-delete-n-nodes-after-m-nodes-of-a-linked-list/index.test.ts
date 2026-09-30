import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { deleteNNodesAfterMNodesOfALinkedList as deleteNodes } from ".";

describe("1474. Delete N Nodes After M Nodes of a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			listToArray(
				deleteNodes(
					listFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
					2,
					3,
				),
			),
		).toEqual([1, 2, 6, 7, 11, 12]);
		expect(
			listToArray(
				deleteNodes(listFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 1, 3),
			),
		).toEqual([1, 5, 9]);
	});

	it("matches filtering by position on random lists", () => {
		const random = createRandom(1474);
		for (let run = 0; run < 300; run++) {
			const values = Array.from({ length: random.int(1, 20) }, (_, i) => i + 1);
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			expect(listToArray(deleteNodes(listFromArray(values), m, n))).toEqual(
				values.filter((_, i) => i % (m + n) < m),
			);
		}
	});
});
