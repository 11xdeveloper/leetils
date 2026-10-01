import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ShuffleAnArray } from ".";

describe("384. Shuffle an Array", () => {
	it("solves the example from the problem statement", () => {
		const shuffler = new ShuffleAnArray([1, 2, 3]);
		expect(shuffler.shuffle().toSorted()).toEqual([1, 2, 3]);
		expect(shuffler.reset()).toEqual([1, 2, 3]);
		expect(shuffler.shuffle().toSorted()).toEqual([1, 2, 3]);
	});

	it("doesn't let callers change the original through the results", () => {
		const shuffler = new ShuffleAnArray([1, 2]);
		shuffler.reset().push(3);
		shuffler.shuffle().push(3);
		expect(shuffler.reset()).toEqual([1, 2]);
	});

	it("produces every order about equally often", () => {
		const shuffler = new ShuffleAnArray([1, 2, 3, 4], createRandom(384).next);
		const counts = new Map<string, number>();
		for (let draw = 0; draw < 48_000; draw++) {
			const order = shuffler.shuffle().join("");
			counts.set(order, (counts.get(order) ?? 0) + 1);
		}
		expect(counts.size).toBe(24);
		for (const count of counts.values())
			expect(Math.abs(count - 2_000)).toBeLessThan(200);
	});
});
