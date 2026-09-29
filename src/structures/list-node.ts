/**
 * A singly linked list node, matching the `ListNode` class LeetCode provides.
 */
export class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val?: number, next?: ListNode | null) {
		this.val = val ?? 0;
		this.next = next ?? null;
	}
}

/**
 * Builds a linked list from an array, the format LeetCode uses to show list
 * inputs. Returns `null` for an empty array.
 *
 * @example
 * listFromArray([2, 4, 3]); // 2 -> 4 -> 3
 */
export const listFromArray = (values: readonly number[]): ListNode | null => {
	const dummy = new ListNode();
	let tail = dummy;

	for (const value of values) {
		tail.next = new ListNode(value);
		tail = tail.next;
	}

	return dummy.next;
};

/**
 * Converts a linked list back into an array.
 *
 * @example
 * listToArray(listFromArray([2, 4, 3])); // [2, 4, 3]
 */
export const listToArray = (head: ListNode | null): number[] => {
	const values: number[] = [];

	for (let node = head; node !== null; node = node.next) {
		values.push(node.val);
	}

	return values;
};
