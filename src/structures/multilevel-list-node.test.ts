import { describe, expect, it } from "bun:test";
import {
	MultilevelListNode,
	multilevelListFromArray,
	multilevelListToArray,
} from "./multilevel-list-node";

describe("MultilevelListNode", () => {
	it("defaults to a node holding 0 with no links", () => {
		const node = new MultilevelListNode();
		expect(node.val).toBe(0);
		expect(node.prev).toBeNull();
		expect(node.next).toBeNull();
		expect(node.child).toBeNull();
	});
});

describe("multilevelListFromArray", () => {
	it("links levels and hangs each from the right node", () => {
		const head = multilevelListFromArray([
			1,
			2,
			3,
			4,
			5,
			6,
			null,
			null,
			null,
			7,
			8,
			9,
			10,
			null,
			null,
			11,
			12,
		]);
		const third = head?.next?.next;
		expect(third?.val).toBe(3);
		expect(third?.child?.val).toBe(7);
		expect(third?.child?.next?.child?.val).toBe(11);
		expect(third?.next?.prev).toBe(third ?? null);
	});

	it("returns null for an empty array", () => {
		expect(multilevelListFromArray([])).toBeNull();
	});
});

describe("multilevelListToArray", () => {
	it("round-trips with multilevelListFromArray", () => {
		for (const values of [
			[],
			[1],
			[1, 2, null, 3],
			[1, 2, 3, 4, 5, 6, null, null, null, 7, 8, 9, 10, null, null, 11, 12],
		]) {
			expect(multilevelListToArray(multilevelListFromArray(values))).toEqual(
				values,
			);
		}
	});
});
