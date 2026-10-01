import { describe, expect, it } from "bun:test";
import { binaryWatch } from ".";

describe("401. Binary Watch", () => {
	it("solves the examples from the problem statement", () => {
		expect(binaryWatch(1).toSorted()).toEqual(
			[
				"0:01",
				"0:02",
				"0:04",
				"0:08",
				"0:16",
				"0:32",
				"1:00",
				"2:00",
				"4:00",
				"8:00",
			].toSorted(),
		);
		expect(binaryWatch(9)).toEqual([]);
	});

	it("shows only midnight with no LEDs lit", () => {
		expect(binaryWatch(0)).toEqual(["0:00"]);
	});

	it("lists every one of the 720 times exactly once across all LED counts", () => {
		const all = Array.from({ length: 11 }, (_, n) => binaryWatch(n)).flat();
		expect(all).toHaveLength(720);
		expect(new Set(all).size).toBe(720);
		for (const time of all) expect(time).toMatch(/^([0-9]|1[01]):[0-5][0-9]$/);
	});
});
