import { ListNode } from "../../structures/list-node";

/**
 * 445. Add Two Numbers II
 *
 * Adds two non-negative integers stored as linked lists of digits, most
 * significant first, and returns the sum in the same form. The input lists
 * are not modified, as the follow-up asks.
 *
 * Pushes both lists' digits onto stacks so they come off least significant
 * first, then adds them column by column with a carry, building the result
 * from its last node towards its head.
 *
 * @see https://leetcode.com/problems/add-two-numbers-ii/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * addTwoNumbersII(listFromArray([7, 2, 4, 3]), listFromArray([5, 6, 4])); // 7 -> 8 -> 0 -> 7
 */
export const addTwoNumbersII = (
	l1: ListNode | null,
	l2: ListNode | null,
): ListNode | null => {
	const digits = (head: ListNode | null): number[] => {
		const stack: number[] = [];
		for (let node = head; node; node = node.next) stack.push(node.val);
		return stack;
	};
	const a = digits(l1);
	const b = digits(l2);

	let head: ListNode | null = null;
	let carry = 0;
	while (a.length > 0 || b.length > 0 || carry > 0) {
		const sum = (a.pop() ?? 0) + (b.pop() ?? 0) + carry;
		carry = Math.floor(sum / 10);
		head = new ListNode(sum % 10, head);
	}

	return head;
};
