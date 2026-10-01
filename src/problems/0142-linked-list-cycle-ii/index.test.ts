import { describe, expect, it } from "bun:test";
import { listWithCycle } from "../../testing/lists";
import { linkedListCycleII } from ".";

describe("142. Linked List Cycle II", () => {
	it("solves the examples from the problem statement", () => {
		const first = listWithCycle([3, 2, 0, -4], 1);
		expect(linkedListCycleII(first.head)).toBe(first.entry);
		const second = listWithCycle([1, 2], 0);
		expect(linkedListCycleII(second.head)).toBe(second.entry);
		expect(linkedListCycleII(listWithCycle([1], -1).head)).toBeNull();
	});

	it("returns null for an empty list", () => {
		expect(linkedListCycleII(null)).toBeNull();
	});

	it("finds the entry at every position, for every length up to 20", () => {
		for (let n = 1; n <= 20; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			expect(linkedListCycleII(listWithCycle(values, -1).head)).toBeNull();
			for (let pos = 0; pos < n; pos++) {
				const { head, entry } = listWithCycle(values, pos);
				expect(linkedListCycleII(head)).toBe(entry);
			}
		}
	});
});
