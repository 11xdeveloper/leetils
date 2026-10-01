import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { oddEvenLinkedList } from ".";

const regroup = (values: number[]): number[] =>
	listToArray(oddEvenLinkedList(listFromArray(values)));

describe("328. Odd Even Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(regroup([1, 2, 3, 4, 5])).toEqual([1, 3, 5, 2, 4]);
		expect(regroup([2, 1, 3, 5, 6, 4, 7])).toEqual([2, 3, 6, 7, 1, 5, 4]);
	});

	it("matches filtering by position for every length up to 20", () => {
		for (let n = 0; n <= 20; n++) {
			const values = Array.from({ length: n }, (_, i) => i + 1);
			expect(regroup(values)).toEqual([
				...values.filter((_, i) => i % 2 === 0),
				...values.filter((_, i) => i % 2 === 1),
			]);
		}
	});
});
