import { describe, expect, it } from "bun:test";
import { ListNode, listFromArray, listToArray } from "./list-node";

describe("ListNode", () => {
	it("defaults to a single node holding 0", () => {
		const node = new ListNode();
		expect(node.val).toBe(0);
		expect(node.next).toBeNull();
	});
});

describe("listFromArray", () => {
	it("links the values in order", () => {
		const head = listFromArray([2, 4, 3]);
		expect(head?.val).toBe(2);
		expect(head?.next?.val).toBe(4);
		expect(head?.next?.next?.val).toBe(3);
		expect(head?.next?.next?.next).toBeNull();
	});

	it("returns null for an empty array", () => {
		expect(listFromArray([])).toBeNull();
	});
});

describe("listToArray", () => {
	it("round-trips with listFromArray", () => {
		for (const values of [[], [1], [2, 4, 3], [9, 9, 9, 9, 9]]) {
			expect(listToArray(listFromArray(values))).toEqual(values);
		}
	});
});
