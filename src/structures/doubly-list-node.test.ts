import { describe, expect, it } from "bun:test";
import { DoublyListNode, doublyListFromArray } from "./doubly-list-node";

describe("DoublyListNode", () => {
	it("defaults to 0 with no neighbours", () => {
		const node = new DoublyListNode();
		expect(node.val).toBe(0);
		expect(node.prev).toBeNull();
		expect(node.next).toBeNull();
	});
});

describe("doublyListFromArray", () => {
	it("returns no nodes for an empty array", () => {
		expect(doublyListFromArray([])).toEqual([]);
	});

	it("links the nodes both ways", () => {
		const [first, second, third] = doublyListFromArray([1, 2, 3]);
		expect(first?.prev).toBeNull();
		expect(first?.next).toBe(second);
		expect(second?.prev).toBe(first);
		expect(second?.next).toBe(third);
		expect(third?.prev).toBe(second);
		expect(third?.next).toBeNull();
		expect(third?.val).toBe(3);
	});
});
