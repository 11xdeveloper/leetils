import { describe, expect, it } from "bun:test";
import { type ListNode, listFromArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { intersectionOfTwoLinkedLists } from ".";

/** Builds two lists with their own starts and an optional shared tail. */
const join = (a: number[], b: number[], shared: number[]) => {
	const tail = listFromArray(shared);
	const attach = (values: number[]): ListNode | null => {
		const head = listFromArray(values);
		if (!head) return tail;
		let last = head;
		while (last.next) last = last.next;
		last.next = tail;
		return head;
	};
	return { headA: attach(a), headB: attach(b), tail };
};

describe("160. Intersection of Two Linked Lists", () => {
	it("solves the examples from the problem statement", () => {
		const first = join([4, 1], [5, 6, 1], [8, 4, 5]);
		expect(intersectionOfTwoLinkedLists(first.headA, first.headB)).toBe(
			first.tail,
		);
		const second = join([1, 9, 1], [3], [2, 4]);
		expect(intersectionOfTwoLinkedLists(second.headA, second.headB)).toBe(
			second.tail,
		);
		const third = join([2, 6, 4], [1, 5], []);
		expect(intersectionOfTwoLinkedLists(third.headA, third.headB)).toBeNull();
	});

	it("tells apart equal values from shared nodes", () => {
		const { headA, headB } = join([1, 2, 3], [1, 2, 3], []);
		expect(intersectionOfTwoLinkedLists(headA, headB)).toBeNull();
	});

	it("finds random shared tails, including lists that are entirely shared", () => {
		const random = createRandom(160);
		for (let run = 0; run < 500; run++) {
			const { headA, headB, tail } = join(
				random.array(random.int(0, 6), 0, 3),
				random.array(random.int(0, 6), 0, 3),
				random.array(random.int(0, 4), 0, 3),
			);
			expect(intersectionOfTwoLinkedLists(headA, headB)).toBe(tail);
		}
	});
});
