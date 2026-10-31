import { describe, expect, it } from "bun:test";
import { FrequencyTracker } from ".";

describe("2671. Frequency Tracker", () => {
	it("solves the examples from the problem statement", () => {
		const first = new FrequencyTracker();
		first.add(3);
		first.add(3);
		expect(first.hasFrequency(2)).toBe(true);

		const second = new FrequencyTracker();
		second.add(1);
		second.deleteOne(1);
		expect(second.hasFrequency(1)).toBe(false);

		const third = new FrequencyTracker();
		expect(third.hasFrequency(2)).toBe(false);
		third.add(3);
		expect(third.hasFrequency(1)).toBe(true);
	});

	it("ignores deleting a missing number", () => {
		const tracker = new FrequencyTracker();
		tracker.deleteOne(5);
		tracker.add(5);
		expect(tracker.hasFrequency(1)).toBe(true);
	});
});
