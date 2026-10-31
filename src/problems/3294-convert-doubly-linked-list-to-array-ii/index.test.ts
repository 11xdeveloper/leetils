import { describe, expect, it } from "bun:test";
import { doublyListFromArray } from "../../structures/doubly-list-node";
import { convertDoublyLinkedListToArrayII as toArray } from ".";

describe("3294. Convert Doubly Linked List to Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(toArray(doublyListFromArray([1, 2, 3, 4, 5])[4] ?? null)).toEqual([
			1, 2, 3, 4, 5,
		]);
		expect(toArray(doublyListFromArray([4, 5, 6, 7, 8])[2] ?? null)).toEqual([
			4, 5, 6, 7, 8,
		]);
	});

	it("starts from any node", () => {
		const nodes = doublyListFromArray([9, 8, 7]);
		for (const node of nodes) expect(toArray(node)).toEqual([9, 8, 7]);
	});
});
