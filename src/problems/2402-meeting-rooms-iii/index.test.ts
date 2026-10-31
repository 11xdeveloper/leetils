import { describe, expect, it } from "bun:test";
import { meetingRoomsIII as mostBooked } from ".";

describe("2402. Meeting Rooms III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mostBooked(2, [
				[0, 10],
				[1, 5],
				[2, 7],
				[3, 4],
			]),
		).toBe(0);
		expect(
			mostBooked(3, [
				[1, 20],
				[2, 10],
				[3, 5],
				[4, 9],
				[6, 8],
			]),
		).toBe(1);
	});
});
