import { describe, expect, it } from "bun:test";
import { DesignEventManager } from ".";

describe("3885. Design Event Manager", () => {
	it("solves the examples from the problem statement", () => {
		const first = new DesignEventManager([
			[5, 7],
			[2, 7],
			[9, 4],
		]);
		expect(first.pollHighest()).toBe(2);
		first.updatePriority(9, 7);
		expect(first.pollHighest()).toBe(5);
		expect(first.pollHighest()).toBe(9);

		const second = new DesignEventManager([
			[4, 1],
			[7, 2],
		]);
		expect(second.pollHighest()).toBe(7);
		expect(second.pollHighest()).toBe(4);
		expect(second.pollHighest()).toBe(-1);
	});
});
