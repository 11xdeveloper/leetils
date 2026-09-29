import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RandomPickIndex } from ".";

describe("398. Random Pick Index", () => {
	it("solves the example from the problem statement", () => {
		const picker = new RandomPickIndex([1, 2, 3, 3, 3]);
		expect([2, 3, 4]).toContain(picker.pick(3));
		expect(picker.pick(1)).toBe(0);
	});

	it("picks each matching index about equally often", () => {
		const picker = new RandomPickIndex(
			[5, 1, 5, 5, 2, 5],
			createRandom(398).next,
		);
		const counts = new Map<number, number>();
		for (let draw = 0; draw < 40_000; draw++) {
			const index = picker.pick(5);
			counts.set(index, (counts.get(index) ?? 0) + 1);
		}
		expect([...counts.keys()].toSorted()).toEqual([0, 2, 3, 5]);
		for (const count of counts.values())
			expect(Math.abs(count - 10_000)).toBeLessThan(500);
	});
});
