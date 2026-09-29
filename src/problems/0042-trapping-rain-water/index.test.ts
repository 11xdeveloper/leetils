import { describe, expect, it } from "bun:test";
import { trappingRainWater } from ".";

/** Finds the tallest bar on each side of every bar. */
const byBruteForce = (height: number[]): number =>
	height.reduce((water, h, i) => {
		const leftMax = Math.max(...height.slice(0, i + 1));
		const rightMax = Math.max(...height.slice(i));
		return water + Math.min(leftMax, rightMax) - h;
	}, 0);

describe("42. Trapping Rain Water", () => {
	it("solves the examples from the problem statement", () => {
		expect(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
		expect(trappingRainWater([4, 2, 0, 3, 2, 5])).toBe(9);
	});

	it("traps nothing without a dip", () => {
		expect(trappingRainWater([1])).toBe(0);
		expect(trappingRainWater([1, 2, 3])).toBe(0);
		expect(trappingRainWater([3, 2, 1])).toBe(0);
		expect(trappingRainWater([2, 5, 2])).toBe(0);
	});

	it("fills a single valley up to its lower wall", () => {
		expect(trappingRainWater([5, 0, 0, 3])).toBe(6);
	});

	it("matches finding each bar's walls on random inputs", () => {
		let seed = 42;
		for (let run = 0; run < 500; run++) {
			const height = Array.from({ length: 1 + (run % 25) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return seed % 8;
			});
			expect(trappingRainWater(height)).toBe(byBruteForce(height));
		}
	});
});
