import { describe, expect, it } from "bun:test";
import { minimumTimeTakesToReachDestinationWithoutDrowning as minimumSeconds } from ".";

const grid = (rows: string[]): string[][] => rows.map((row) => [...row]);

describe("2814. Minimum Time Takes to Reach Destination Without Drowning", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSeconds(grid(["D.*", "...", ".S."]))).toBe(3);
		expect(minimumSeconds(grid(["DX*", "...", "..S"]))).toBe(-1);
		expect(minimumSeconds(grid(["D...*.", ".X.X..", "....S."]))).toBe(6);
	});
});
