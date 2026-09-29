import type { ListNode } from "../../structures/list-node";

const reverse = (head: ListNode | null): ListNode | null => {
	let reversed: ListNode | null = null;
	let node = head;
	while (node) {
		const next: ListNode | null = node.next;
		node.next = reversed;
		reversed = node;
		node = next;
	}
	return reversed;
};

/**
 * 234. Palindrome Linked List
 *
 * Returns whether a linked list's values read the same forwards and
 * backwards.
 *
 * Finds the middle with slow and fast pointers, reverses the second half in
 * place and compares it with the first half, then reverses it back so the
 * list is left as it was. Uses constant extra space, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/palindrome-linked-list/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * palindromeLinkedList(listFromArray([1, 2, 2, 1])); // true
 */
export const palindromeLinkedList = (head: ListNode | null): boolean => {
	let slow = head;
	let fast = head;
	while (fast?.next?.next) {
		slow = slow?.next ?? null;
		fast = fast.next.next;
	}
	if (!slow) return true;

	const secondHalf = reverse(slow.next);
	let isPalindrome = true;
	for (let a = head, b = secondHalf; b; a = a?.next ?? null, b = b.next) {
		if (a?.val !== b.val) {
			isPalindrome = false;
			break;
		}
	}

	slow.next = reverse(secondHalf);
	return isPalindrome;
};
