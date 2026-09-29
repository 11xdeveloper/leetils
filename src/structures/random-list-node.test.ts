import { describe, expect, it } from "bun:test";
import {
	RandomListNode,
	randomListFromArray,
	randomListToArray,
} from "./random-list-node";

describe("RandomListNode", () => {
	it("defaults to a node holding 0 with no pointers", () => {
		const node = new RandomListNode();
		expect(node.val).toBe(0);
		expect(node.next).toBeNull();
		expect(node.random).toBeNull();
	});
});

describe("randomListFromArray", () => {
	it("links next and random pointers by index", () => {
		const head = randomListFromArray([
			[7, null],
			[13, 0],
			[11, 1],
		]);
		expect(head?.random).toBeNull();
		expect(head?.next?.random).toBe(head);
		expect(head?.next?.next?.random).toBe(head?.next ?? null);
	});

	it("returns null for an empty array", () => {
		expect(randomListFromArray([])).toBeNull();
	});
});

describe("randomListToArray", () => {
	it("round-trips with randomListFromArray", () => {
		for (const entries of [
			[],
			[[1, 0]],
			[
				[7, null],
				[13, 0],
				[11, 4],
				[10, 2],
				[1, 0],
			],
		] as [number, number | null][][]) {
			expect(randomListToArray(randomListFromArray(entries))).toEqual(entries);
		}
	});
});
