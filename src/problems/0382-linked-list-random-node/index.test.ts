import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { LinkedListRandomNode } from ".";

describe("382. Linked List Random Node", () => {
	it("solves the example from the problem statement", () => {
		const picker = new LinkedListRandomNode(listFromArray([1, 2, 3]));
		for (let i = 0; i < 20; i++)
			expect([1, 2, 3]).toContain(picker.getRandom());
	});

	it("always picks the only node of a one-node list", () => {
		expect(new LinkedListRandomNode(listFromArray([7])).getRandom()).toBe(7);
	});

	it("picks each node about equally often", () => {
		const picker = new LinkedListRandomNode(
			listFromArray([0, 1, 2, 3, 4]),
			createRandom(382).next,
		);
		const counts = new Array<number>(5).fill(0);
		for (let draw = 0; draw < 50_000; draw++) {
			const value = picker.getRandom();
			counts[value] = (counts[value] ?? 0) + 1;
		}
		for (const count of counts)
			expect(Math.abs(count - 10_000)).toBeLessThan(500);
	});
});
