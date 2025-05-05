import { describe, expect, it } from "bun:test";
import { addTwoNumbers } from "./index";
import { ListNode } from "../../lib/ListNode";

// Helper function to create linked list from array
function createList(arr: number[]): ListNode | null {
	if (arr.length === 0) return null;
	const head = new ListNode(arr[0]);
	let current = head;
	for (let i = 1; i < arr.length; i++) {
		current.next = new ListNode(arr[i]);
		current = current.next;
	}
	return head;
}

// Helper function to convert linked list to array for easier testing
function listToArray(node: ListNode | null): number[] {
	const result: number[] = [];
	let current = node;
	while (current !== null) {
		result.push(current.val);
		current = current.next;
	}
	return result;
}

describe("addTwoNumbers", () => {
	it("should add two numbers correctly", () => {
		const l1 = createList([2, 4, 3]);
		const l2 = createList([5, 6, 4]);
		const result = addTwoNumbers(l1, l2);
		expect(listToArray(result)).toEqual([7, 0, 8]);
	});

	it("should handle numbers of different lengths", () => {
		const l1 = createList([9, 9, 9, 9]);
		const l2 = createList([9, 9, 9]);
		const result = addTwoNumbers(l1, l2);
		expect(listToArray(result)).toEqual([8, 9, 9, 0, 1]);
	});

	it("should handle zero values", () => {
		const l1 = createList([0]);
		const l2 = createList([0]);
		const result = addTwoNumbers(l1, l2);
		expect(listToArray(result)).toEqual([0]);
	});

	it("should handle single digit numbers", () => {
		const l1 = createList([1]);
		const l2 = createList([9]);
		const result = addTwoNumbers(l1, l2);
		expect(listToArray(result)).toEqual([0, 1]);
	});

	it("should handle large numbers with multiple carries", () => {
		const l1 = createList([9, 9, 9, 9, 9, 9, 9]);
		const l2 = createList([9, 9, 9, 9]);
		const result = addTwoNumbers(l1, l2);
		expect(listToArray(result)).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
	});

	it("should handle when one list is empty", () => {
		const l1 = createList([1, 2, 3]);
		const result = addTwoNumbers(l1, null);
		expect(listToArray(result)).toEqual([1, 2, 3]);
	});
});
