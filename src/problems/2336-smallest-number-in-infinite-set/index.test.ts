import { describe, expect, it } from "bun:test";
import { SmallestNumberInInfiniteSet as SmallestInfiniteSet } from ".";

describe("2336. Smallest Number in Infinite Set", () => {
	it("solves the example from the problem statement", () => {
		const set = new SmallestInfiniteSet();
		set.addBack(2);
		expect(set.popSmallest()).toBe(1);
		expect(set.popSmallest()).toBe(2);
		expect(set.popSmallest()).toBe(3);
		set.addBack(1);
		expect(set.popSmallest()).toBe(1);
		expect(set.popSmallest()).toBe(4);
		expect(set.popSmallest()).toBe(5);
	});

	it("ignores numbers added back twice", () => {
		const set = new SmallestInfiniteSet();
		set.popSmallest();
		set.popSmallest();
		set.addBack(1);
		set.addBack(1);
		expect(set.popSmallest()).toBe(1);
		expect(set.popSmallest()).toBe(3);
	});
});
