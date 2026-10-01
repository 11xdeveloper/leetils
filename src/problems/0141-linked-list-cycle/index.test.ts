import { describe, expect, it } from "bun:test";
import { listWithCycle } from "../../testing/lists";
import { linkedListCycle } from ".";

describe("141. Linked List Cycle", () => {
	it("solves the examples from the problem statement", () => {
		expect(linkedListCycle(listWithCycle([3, 2, 0, -4], 1).head)).toBeTrue();
		expect(linkedListCycle(listWithCycle([1, 2], 0).head)).toBeTrue();
		expect(linkedListCycle(listWithCycle([1], -1).head)).toBeFalse();
	});

	it("handles an empty list and a node linked to itself", () => {
		expect(linkedListCycle(null)).toBeFalse();
		expect(linkedListCycle(listWithCycle([1], 0).head)).toBeTrue();
	});

	it("detects a cycle at every position, for every length up to 20", () => {
		for (let n = 1; n <= 20; n++) {
			const values = Array.from({ length: n }, (_, i) => i);
			expect(linkedListCycle(listWithCycle(values, -1).head)).toBeFalse();
			for (let pos = 0; pos < n; pos++) {
				expect(linkedListCycle(listWithCycle(values, pos).head)).toBeTrue();
			}
		}
	});
});
