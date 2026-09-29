import { RandomListNode } from "../../structures/random-list-node";

/**
 * 138. Copy List with Random Pointer
 *
 * Returns a deep copy of a linked list whose nodes also have a `random`
 * pointer to any node in the list, or `null`. The copy's pointers all point
 * into the copy.
 *
 * Weaves each copy in right after its original, so an original's `random`
 * node is always followed by that node's copy. That sets every copy's
 * `random` pointer without a map. Then the two lists are separated again,
 * leaving the original as it was.
 *
 * @see https://leetcode.com/problems/copy-list-with-random-pointer/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned copy
 *
 * @example
 * randomListToArray(copyListWithRandomPointer(randomListFromArray([[7, null], [13, 0]])));
 * // [[7, null], [13, 0]]
 */
export const copyListWithRandomPointer = (
	head: RandomListNode | null,
): RandomListNode | null => {
	for (let node = head; node; node = node.next?.next ?? null) {
		node.next = new RandomListNode(node.val, node.next);
	}

	for (let node = head; node; node = node.next?.next ?? null) {
		const copy = node.next;
		if (copy) copy.random = node.random?.next ?? null;
	}

	const copyHead = head?.next ?? null;
	for (let node = head; node; node = node.next) {
		const copy = node.next;
		if (!copy) break;
		node.next = copy.next;
		copy.next = copy.next?.next ?? null;
	}

	return copyHead;
};
