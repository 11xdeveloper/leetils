import { describe, expect, it } from "bun:test";
import { ListNode } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { insertIntoASortedCircularLinkedList as insert } from ".";

const circular = (values: number[]): ListNode | null => {
	const nodes = values.map((value) => new ListNode(value));
	for (const [i, node] of nodes.entries())
		node.next = nodes[(i + 1) % nodes.length] ?? null;
	return nodes[0] ?? null;
};

/** The values once round the circle from head. */
const valuesFrom = (head: ListNode | null): number[] => {
	const values: number[] = [];
	for (let node = head; node; node = node.next) {
		values.push(node.val);
		if (node.next === head) break;
	}
	return values;
};

/** Whether the circle, read from some node, is sorted. */
const isSortedCircle = (values: number[]): boolean =>
	values.some((_, start) => {
		const rotated = [...values.slice(start), ...values.slice(0, start)];
		return rotated.every(
			(value, i) => i === 0 || (rotated[i - 1] ?? 0) <= value,
		);
	});

describe("708. Insert into a Sorted Circular Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(valuesFrom(insert(circular([3, 4, 1]), 2))).toEqual([3, 4, 1, 2]);
		expect(valuesFrom(insert(null, 1))).toEqual([1]);
		expect(valuesFrom(insert(circular([1]), 0))).toEqual([1, 0]);
	});

	it("keeps random sorted circles sorted and returns the given node", () => {
		const random = createRandom(708);
		for (let run = 0; run < 1000; run++) {
			const sorted = random
				.array(random.int(1, 8), -5, 5)
				.sort((a, b) => a - b);
			const start = random.int(0, sorted.length - 1);
			const head = circular([
				...sorted.slice(start),
				...sorted.slice(0, start),
			]);
			const value = random.int(-6, 6);
			expect(insert(head, value)).toBe(head);
			const values = valuesFrom(head);
			expect(values.toSorted((a, b) => a - b)).toEqual(
				[...sorted, value].sort((a, b) => a - b),
			);
			expect(isSortedCircle(values)).toBeTrue();
		}
	});
});
