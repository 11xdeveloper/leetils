import { describe, expect, it } from "bun:test";
import { climbingStairs } from ".";

/** Counts the ways by trying every step. */
const byRecursion = (n: number): number =>
	n <= 1 ? 1 : byRecursion(n - 1) + byRecursion(n - 2);

describe("70. Climbing Stairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(climbingStairs(2)).toBe(2);
		expect(climbingStairs(3)).toBe(3);
	});

	it("has one way to climb one stair", () => {
		expect(climbingStairs(1)).toBe(1);
	});

	it("matches trying every step for small n", () => {
		for (let n = 1; n <= 25; n++) {
			expect(climbingStairs(n)).toBe(byRecursion(n));
		}
	});

	it("handles the constraint of 45 stairs", () => {
		expect(climbingStairs(45)).toBe(1836311903);
	});
});
