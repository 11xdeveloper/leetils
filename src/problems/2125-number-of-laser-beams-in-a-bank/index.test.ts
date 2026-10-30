import { describe, expect, it } from "bun:test";
import { numberOfLaserBeamsInABank as numberOfBeams } from ".";

describe("2125. Number of Laser Beams in a Bank", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfBeams(["011001", "000000", "010100", "001000"])).toBe(8);
		expect(numberOfBeams(["000", "111", "000"])).toBe(0);
	});
});
