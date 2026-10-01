import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { deleteNodeInALinkedList } from ".";

const deleteAt = (values: number[], index: number): number[] => {
	const head = listFromArray(values);
	let node = head;
	for (let i = 0; i < index; i++) node = node?.next ?? null;
	if (node) expect(deleteNodeInALinkedList(node)).toBeUndefined();
	return listToArray(head);
};

describe("237. Delete Node in a Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(deleteAt([4, 5, 1, 9], 1)).toEqual([4, 1, 9]);
		expect(deleteAt([4, 5, 1, 9], 2)).toEqual([4, 5, 9]);
	});

	it("deletes every position except the last", () => {
		const values = [1, 2, 3, 4, 5, 6];
		for (let index = 0; index < values.length - 1; index++) {
			expect(deleteAt(values, index)).toEqual(values.toSpliced(index, 1));
		}
	});
});
