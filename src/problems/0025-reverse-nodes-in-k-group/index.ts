import { ListNode } from "../../structures/list-node";

/**
 * 25. Reverse Nodes in k-Group
 *
 * Reverses the nodes of a linked list `k` at a time and returns its head. If
 * fewer than `k` nodes are left at the end, they stay in order. As the
 * problem requires, the nodes themselves are moved rather than their values,
 * so the input list is modified.
 *
 * For each group, checks that `k` nodes remain, reverses them in place, and
 * reconnects the group between the node before it and the node after it.
 *
 * @see https://leetcode.com/problems/reverse-nodes-in-k-group/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseNodesInKGroup(listFromArray([1, 2, 3, 4, 5]), 2); // 2 -> 1 -> 4 -> 3 -> 5
 */
export const reverseNodesInKGroup = (
	head: ListNode | null,
	k: number,
): ListNode | null => {
	const dummy = new ListNode(0, head);
	let beforeGroup = dummy;

	for (;;) {
		let last: ListNode | null = beforeGroup;
		for (let i = 0; i < k && last !== null; i++) last = last.next;
		const first = beforeGroup.next;
		if (last === null || first === null) return dummy.next;

		const afterGroup = last.next;
		let previous = afterGroup;
		let current: ListNode | null = first;
		while (current !== afterGroup && current !== null) {
			const next: ListNode | null = current.next;
			current.next = previous;
			previous = current;
			current = next;
		}

		// The group's last node now comes first, and its first node comes last.
		beforeGroup.next = last;
		beforeGroup = first;
	}
};
