import { describe, expect, it } from "bun:test";
import {
	type RandomListNode,
	randomListFromArray,
	randomListToArray,
} from "../../structures/random-list-node";
import { createRandom } from "../../testing/random";
import { copyListWithRandomPointer } from ".";

const nodesOf = (head: RandomListNode | null): RandomListNode[] => {
	const nodes: RandomListNode[] = [];
	for (let node = head; node; node = node.next) nodes.push(node);
	return nodes;
};

describe("138. Copy List with Random Pointer", () => {
	it("solves the examples from the problem statement", () => {
		for (const entries of [
			[
				[7, null],
				[13, 0],
				[11, 4],
				[10, 2],
				[1, 0],
			],
			[
				[1, 1],
				[2, 1],
			],
			[
				[3, null],
				[3, 0],
				[3, null],
			],
		] as [number, number | null][][]) {
			expect(
				randomListToArray(
					copyListWithRandomPointer(randomListFromArray(entries)),
				),
			).toEqual(entries);
		}
		expect(copyListWithRandomPointer(null)).toBeNull();
	});

	it("copies random lists without sharing nodes, leaving the original unchanged", () => {
		const random = createRandom(138);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const entries: [number, number | null][] = Array.from(
				{ length: n },
				() => [
					random.int(-5, 5),
					random.int(0, 3) === 0 ? null : random.int(0, n - 1),
				],
			);
			const head = randomListFromArray(entries);
			const originalNodes = nodesOf(head);
			const copy = copyListWithRandomPointer(head);

			expect(randomListToArray(copy)).toEqual(entries);
			expect(randomListToArray(head)).toEqual(entries);
			expect(nodesOf(head)).toEqual(originalNodes);
			for (const node of nodesOf(copy)) {
				expect(originalNodes.includes(node)).toBeFalse();
				if (node.random)
					expect(originalNodes.includes(node.random)).toBeFalse();
			}
		}
	});
});
