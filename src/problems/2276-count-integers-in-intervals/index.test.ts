import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { CountIntegersInIntervals as CountIntervals } from ".";

describe("2276. Count Integers in Intervals", () => {
	it("solves the example from the problem statement", () => {
		const intervals = new CountIntervals();
		intervals.add(2, 3);
		intervals.add(7, 10);
		expect(intervals.count()).toBe(6);
		intervals.add(5, 8);
		expect(intervals.count()).toBe(8);
	});

	it("matches a set of covered integers on random intervals", () => {
		const random = createRandom(2276);
		const intervals = new CountIntervals();
		const covered = new Set<number>();
		for (let op = 0; op < 200; op++) {
			const left = random.int(1, 60);
			const right = random.int(left, Math.min(60, left + 10));
			intervals.add(left, right);
			for (let x = left; x <= right; x++) covered.add(x);
			expect(intervals.count()).toBe(covered.size);
		}
	});

	it("handles the full range", () => {
		const intervals = new CountIntervals();
		intervals.add(1, 1_000_000_000);
		intervals.add(5, 6);
		expect(intervals.count()).toBe(1_000_000_000);
	});
});
