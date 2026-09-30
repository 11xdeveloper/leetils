import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { printImmutableLinkedListInReverse as printLinkedListInReverse } from ".";

/** Builds an immutable list whose nodes print into `printed`. */
const immutableList = (values: number[], printed: number[]) => {
	interface Node {
		printValue(): void;
		getNext(): Node | null;
	}
	let head: Node | null = null;
	for (let i = values.length - 1; i >= 0; i--) {
		const next: Node | null = head;
		const value = values[i] ?? 0;
		head = Object.freeze({
			printValue: () => printed.push(value),
			getNext: () => next,
		});
	}
	return head;
};

const reversed = (values: number[]) => {
	const printed: number[] = [];
	printLinkedListInReverse(immutableList(values, printed));
	return printed;
};

describe("1265. Print Immutable Linked List in Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(reversed([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
		expect(reversed([0, -4, -1, 3, -5])).toEqual([-5, 3, -1, -4, 0]);
		expect(reversed([-2, 0, 6, 4, 4, -6])).toEqual([-6, 4, 4, 6, 0, -2]);
	});

	it("prints every list backwards", () => {
		const random = createRandom(1265);
		for (let length = 1; length <= 60; length++) {
			const values = random.array(length, -1000, 1000);
			expect(reversed(values)).toEqual(values.toReversed());
		}
		const long = Array.from({ length: 1000 }, (_, i) => i);
		expect(reversed(long)).toEqual(long.toReversed());
	});
});
