import { describe, expect, it } from "bun:test";
import { timeTakenToCrossTheDoor as timeTaken } from ".";

describe("2534. Time Taken to Cross the Door", () => {
	it("solves the examples from the problem statement", () => {
		expect(timeTaken([0, 1, 1, 2, 4], [0, 1, 0, 0, 1])).toEqual([
			0, 3, 1, 2, 4,
		]);
		expect(timeTaken([0, 0, 0], [1, 0, 1])).toEqual([0, 2, 1]);
	});

	it("gives exits priority again after an idle second", () => {
		expect(timeTaken([0, 2, 2], [0, 0, 1])).toEqual([0, 3, 2]);
	});
});
