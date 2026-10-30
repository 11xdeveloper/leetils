import { describe, expect, it } from "bun:test";
import { maximumPointsInAnArcheryCompetition as maximumBobPoints } from ".";

const score = (alice: number[], bob: number[]): number =>
	bob.reduce((sum, arrows, k) => sum + (arrows > (alice[k] ?? 0) ? k : 0), 0);

describe("2212. Maximum Points in an Archery Competition", () => {
	it("solves the examples from the problem statement", () => {
		const alice1 = [1, 1, 0, 1, 0, 0, 2, 1, 0, 1, 2, 0];
		const bob1 = maximumBobPoints(9, alice1);
		expect(bob1.reduce((sum, a) => sum + a, 0)).toBe(9);
		expect(score(alice1, bob1)).toBe(47);

		const alice2 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2];
		const bob2 = maximumBobPoints(3, alice2);
		expect(bob2.reduce((sum, a) => sum + a, 0)).toBe(3);
		expect(score(alice2, bob2)).toBe(27);
	});
});
