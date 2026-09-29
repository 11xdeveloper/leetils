import { describe, expect, it } from "bun:test";
import { type TreeNode, treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues, inorderValues } from "../../testing/trees";
import { convertBinarySearchTreeToSortedDoublyLinkedList as convert } from ".";

/** Walks the circular list both ways, checking it closes up. */
const read = (
	head: TreeNode | null,
): [forward: number[], backward: number[]] => {
	if (!head) return [[], []];
	const forward: number[] = [];
	let node = head;
	do {
		forward.push(node.val);
		node = node.right ?? head;
	} while (node !== head);
	const backward: number[] = [];
	node = head.left ?? head;
	do {
		backward.push(node.val);
		node = node.left ?? head;
	} while (node !== head.left);
	return [forward, backward];
};

describe("426. Convert Binary Search Tree to Sorted Doubly Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(read(convert(treeFromArray([4, 2, 5, 1, 3])))).toEqual([
			[1, 2, 3, 4, 5],
			[5, 4, 3, 2, 1],
		]);
		expect(read(convert(treeFromArray([2, 1, 3])))[0]).toEqual([1, 2, 3]);
		expect(convert(null)).toBeNull();
	});

	it("links a single node to itself", () => {
		const head = convert(treeFromArray([7]));
		expect(head?.left).toBe(head);
		expect(head?.right).toBe(head);
	});

	it("builds a sorted circular list from random binary search trees", () => {
		const random = createRandom(426);
		for (let run = 0; run < 300; run++) {
			const root = bstFromValues(random.array(random.int(1, 30), -1000, 1000));
			const sorted = inorderValues(root);
			const [forward, backward] = read(convert(root));
			expect(forward).toEqual(sorted);
			expect(backward).toEqual(sorted.toReversed());
		}
	});
});
