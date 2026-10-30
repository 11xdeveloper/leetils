import { describe, expect, it } from "bun:test";
import { type ListNode, listFromArray } from "../../structures/list-node";
import { splitACircularLinkedList as splitCircularLinkedList } from ".";

const circular = (values: number[]): ListNode | null => {
	const head = listFromArray(values);
	let tail = head;
	while (tail?.next) tail = tail.next;
	if (tail) tail.next = head;
	return head;
};

/** Reads a circular list once around, failing if it doesn't close. */
const around = (head: ListNode | null): number[] => {
	const values: number[] = [];
	for (let node = head; node; node = node.next) {
		values.push(node.val);
		if (node.next === head) return values;
		if (values.length > 100) throw new Error("not circular");
	}
	return values;
};

describe("2674. Split a Circular Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitCircularLinkedList(circular([1, 5, 7])).map(around)).toEqual([
			[1, 5],
			[7],
		]);
		expect(splitCircularLinkedList(circular([2, 6, 1, 5])).map(around)).toEqual(
			[
				[2, 6],
				[1, 5],
			],
		);
	});

	it("splits lists of every small length", () => {
		for (let n = 2; n <= 9; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			const half = Math.ceil(n / 2);
			expect(splitCircularLinkedList(circular(values)).map(around)).toEqual([
				values.slice(0, half),
				values.slice(half),
			]);
		}
	});
});
