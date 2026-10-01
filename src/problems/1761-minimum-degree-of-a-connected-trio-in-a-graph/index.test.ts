import { describe, expect, it } from "bun:test";
import { minimumDegreeOfAConnectedTrioInAGraph as minTrioDegree } from ".";

describe("1761. Minimum Degree of a Connected Trio in a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minTrioDegree(6, [
				[1, 2],
				[1, 3],
				[3, 2],
				[4, 1],
				[5, 2],
				[3, 6],
			]),
		).toBe(3);
		expect(
			minTrioDegree(7, [
				[1, 3],
				[4, 1],
				[4, 3],
				[2, 5],
				[5, 6],
				[6, 7],
				[7, 5],
				[2, 6],
			]),
		).toBe(0);
	});

	it("returns -1 without a trio", () => {
		expect(
			minTrioDegree(4, [
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(-1);
	});
});
