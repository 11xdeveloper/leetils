import { describe, expect, it } from "bun:test";
import { doublyListFromArray } from "../../structures/doubly-list-node";
import { convertDoublyLinkedListToArrayI as toArray } from ".";

describe("3263. Convert Doubly Linked List to Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			toArray(doublyListFromArray([1, 2, 3, 4, 3, 2, 1])[0] ?? null),
		).toEqual([1, 2, 3, 4, 3, 2, 1]);
		expect(toArray(doublyListFromArray([2, 2, 2, 2, 2])[0] ?? null)).toEqual([
			2, 2, 2, 2, 2,
		]);
		expect(toArray(doublyListFromArray([3, 2, 3, 2, 3, 2])[0] ?? null)).toEqual(
			[3, 2, 3, 2, 3, 2],
		);
	});
});
