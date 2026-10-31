import { describe, expect, it } from "bun:test";
import { rescheduleMeetingsForMaximumFreeTimeI as maxFreeTime } from ".";

describe("3439. Reschedule Meetings for Maximum Free Time I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxFreeTime(5, 1, [1, 3], [2, 5])).toBe(2);
		expect(maxFreeTime(10, 1, [0, 2, 9], [1, 4, 10])).toBe(6);
		expect(maxFreeTime(5, 2, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(0);
	});
});
