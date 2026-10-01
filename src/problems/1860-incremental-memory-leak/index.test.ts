import { describe, expect, it } from "bun:test";
import { incrementalMemoryLeak as memLeak } from ".";

describe("1860. Incremental Memory Leak", () => {
	it("solves the examples from the problem statement", () => {
		expect(memLeak(2, 2)).toEqual([3, 1, 0]);
		expect(memLeak(8, 11)).toEqual([6, 0, 4]);
	});

	it("handles empty sticks", () => {
		expect(memLeak(0, 0)).toEqual([1, 0, 0]);
	});
});
