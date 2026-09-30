import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { nextGreaterNodeInLinkedList as nextLargerNodes } from ".";

describe("1019. Next Greater Node In Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextLargerNodes(listFromArray([2, 1, 5]))).toEqual([5, 5, 0]);
		expect(nextLargerNodes(listFromArray([2, 7, 4, 3, 5]))).toEqual([
			7, 0, 5, 5, 0,
		]);
	});

	it("matches scanning ahead on random lists", () => {
		const random = createRandom(1019);
		for (let run = 0; run < 1000; run++) {
			const values = random.array(random.int(1, 12), 1, 6);
			expect(nextLargerNodes(listFromArray(values))).toEqual(
				values.map((v, i) => values.slice(i + 1).find((w) => w > v) ?? 0),
			);
		}
	});
});
