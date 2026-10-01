import { describe, expect, it } from "bun:test";
import {
	type MultilevelListNode,
	multilevelListFromArray,
} from "../../structures/multilevel-list-node";
import { createRandom } from "../../testing/random";
import { flattenAMultilevelDoublyLinkedList as flatten } from ".";

/** Reads the flattened list, checking prev pointers and that every child is cleared. */
const read = (head: MultilevelListNode | null): number[] => {
	const values: number[] = [];
	let previous: MultilevelListNode | null = null;
	for (let node = head; node; node = node.next) {
		expect(node.prev).toBe(previous);
		expect(node.child).toBeNull();
		values.push(node.val);
		previous = node;
	}
	return values;
};

/** The expected order, found by recursion: each node, then its child list, then the rest. */
const byRecursion = (head: MultilevelListNode | null): number[] => {
	const values: number[] = [];
	for (let node = head; node; node = node.next)
		values.push(node.val, ...byRecursion(node.child));
	return values;
};

describe("430. Flatten a Multilevel Doubly Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			read(
				flatten(
					multilevelListFromArray([
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
					]),
				),
			),
		).toEqual([1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]);
		expect(read(flatten(multilevelListFromArray([1, 2, null, 3])))).toEqual([
			1, 3, 2,
		]);
		expect(flatten(null)).toBeNull();
	});

	it("matches a recursive walk on random multilevel lists", () => {
		const random = createRandom(430);
		for (let run = 0; run < 300; run++) {
			let next = 1;
			const values: (number | null)[] = [];
			for (
				let level = 0, previousLength = 0;
				level < random.int(1, 4);
				level++
			) {
				const length = random.int(1, 5);
				if (level > 0)
					values.push(
						null,
						...new Array<null>(random.int(0, previousLength - 1)).fill(null),
					);
				for (let i = 0; i < length; i++) values.push(next++);
				previousLength = length;
			}
			const expected = byRecursion(multilevelListFromArray(values));
			expect(read(flatten(multilevelListFromArray(values)))).toEqual(expected);
		}
	});
});
