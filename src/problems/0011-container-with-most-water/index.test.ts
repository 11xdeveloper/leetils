import { describe, expect, it } from "bun:test";
import { containerWithMostWater } from ".";

const byBruteForce = (height: number[]): number => {
	let most = 0;
	for (let i = 0; i < height.length; i++) {
		for (let j = i + 1; j < height.length; j++) {
			most = Math.max(most, Math.min(height[i] ?? 0, height[j] ?? 0) * (j - i));
		}
	}
	return most;
};

describe("11. Container With Most Water", () => {
	it("solves the examples from the problem statement", () => {
		expect(containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
		expect(containerWithMostWater([1, 1])).toBe(1);
	});

	it("handles zero heights", () => {
		expect(containerWithMostWater([0, 0])).toBe(0);
		expect(containerWithMostWater([0, 5, 0])).toBe(0);
	});

	it("handles increasing, decreasing and equal heights", () => {
		expect(containerWithMostWater([1, 2, 3, 4, 5])).toBe(6);
		expect(containerWithMostWater([5, 4, 3, 2, 1])).toBe(6);
		expect(containerWithMostWater([3, 3, 3, 3])).toBe(9);
	});

	it("matches checking every pair on random inputs", () => {
		let seed = 11;
		for (let run = 0; run < 300; run++) {
			const length = 2 + (run % 20);
			const height = Array.from({ length }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return seed % 50;
			});
			expect(containerWithMostWater(height)).toBe(byBruteForce(height));
		}
	});
});
