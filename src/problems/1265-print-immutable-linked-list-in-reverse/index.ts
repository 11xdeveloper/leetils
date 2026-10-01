/** The interface LeetCode provides for reading the immutable list. */
interface ImmutableListNode {
	printValue(): void;
	getNext(): ImmutableListNode | null;
}

/**
 * 1265. Print Immutable Linked List in Reverse
 *
 * Prints the values of an immutable linked list from last to first, using
 * only `printValue()` and `getNext()`.
 *
 * Square-root decomposition, for the follow-up's sublinear space: counts
 * the list, remembers every `√n`th node as a checkpoint, then goes through
 * the blocks from the last, collecting each block's nodes and printing them
 * backwards.
 *
 * @see https://leetcode.com/problems/print-immutable-linked-list-in-reverse/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(√n)
 *
 * @example
 * printImmutableLinkedListInReverse(head); // prints 4, 3, 2, 1 for the list 1 → 2 → 3 → 4
 */
export const printImmutableLinkedListInReverse = (
	head: ImmutableListNode | null,
): void => {
	let length = 0;
	for (let node = head; node; node = node.getNext()) length++;
	const block = Math.max(1, Math.ceil(Math.sqrt(length)));
	const checkpoints: ImmutableListNode[] = [];
	let index = 0;
	for (let node = head; node; node = node.getNext()) {
		if (index % block === 0) checkpoints.push(node);
		index++;
	}
	for (let b = checkpoints.length - 1; b >= 0; b--) {
		const nodes: ImmutableListNode[] = [];
		let node = checkpoints[b] ?? null;
		for (let i = 0; i < block && node; i++) {
			nodes.push(node);
			node = node.getNext();
		}
		for (let i = nodes.length - 1; i >= 0; i--) nodes[i]?.printValue();
	}
};
