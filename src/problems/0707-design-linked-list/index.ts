/**
 * 707. Design Linked List
 *
 * A linked list with `get(index)` (-1 if out of range), `addAtHead`,
 * `addAtTail`, `addAtIndex` (at `index === length` it appends; past that it
 * does nothing) and `deleteAtIndex` (ignored if out of range).
 *
 * A singly linked list with a sentinel head node and a length count, so
 * every operation walks from the sentinel to the node before `index`.
 *
 * @see https://leetcode.com/problems/design-linked-list/
 * @difficulty Medium
 * @timeComplexity O(index) per operation, O(n) for addAtTail
 * @spaceComplexity O(n)
 *
 * @example
 * const list = new DesignLinkedList();
 * list.addAtHead(1);
 * list.addAtTail(3);
 * list.addAtIndex(1, 2); // 1 → 2 → 3
 * list.get(1); // 2
 */
export class DesignLinkedList {
	readonly #sentinel: ListItem = { val: 0, next: null };
	#length = 0;

	get(index: number): number {
		if (index < 0 || index >= this.#length) return -1;
		return this.#before(index).next?.val ?? -1;
	}

	addAtHead(val: number): void {
		this.addAtIndex(0, val);
	}

	addAtTail(val: number): void {
		this.addAtIndex(this.#length, val);
	}

	addAtIndex(index: number, val: number): void {
		if (index < 0 || index > this.#length) return;
		const previous = this.#before(index);
		previous.next = { val, next: previous.next };
		this.#length++;
	}

	deleteAtIndex(index: number): void {
		if (index < 0 || index >= this.#length) return;
		const previous = this.#before(index);
		previous.next = previous.next?.next ?? null;
		this.#length--;
	}

	/** The node before position `index`, which may be the sentinel. */
	#before(index: number): ListItem {
		let node = this.#sentinel;
		for (let i = 0; i < index && node.next; i++) node = node.next;
		return node;
	}
}

interface ListItem {
	val: number;
	next: ListItem | null;
}
