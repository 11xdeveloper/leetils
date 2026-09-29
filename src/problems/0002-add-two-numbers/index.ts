import { ListNode } from "../../structures/list-node";

/**
 * 2. Add Two Numbers
 *
 * Adds two non-negative integers stored as linked lists of digits in reverse
 * order (ones digit first), and returns the sum in the same form.
 *
 * Walks both lists together like column addition, carrying into the next
 * digit.
 *
 * @see https://leetcode.com/problems/add-two-numbers/
 * @difficulty Medium
 * @timeComplexity O(max(m, n))
 * @spaceComplexity O(max(m, n)) for the returned list
 *
 * @example
 * addTwoNumbers(listFromArray([2, 4, 3]), listFromArray([5, 6, 4])); // 7 -> 0 -> 8
 */
export const addTwoNumbers = (
	l1: ListNode | null,
	l2: ListNode | null,
): ListNode | null => {
	const dummy = new ListNode();
	let tail = dummy;
	let a = l1;
	let b = l2;
	let carry = 0;

	while (a !== null || b !== null || carry > 0) {
		const sum = (a?.val ?? 0) + (b?.val ?? 0) + carry;
		carry = Math.floor(sum / 10);
		tail.next = new ListNode(sum % 10);
		tail = tail.next;
		a = a?.next ?? null;
		b = b?.next ?? null;
	}

	return dummy.next;
};
