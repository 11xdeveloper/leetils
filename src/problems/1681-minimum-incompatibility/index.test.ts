import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIncompatibility } from ".";

/** Assigns each element to a group in turn. */
const byBruteForce = (nums: number[], k: number): number => {
	const size = nums.length / k;
	const groups: number[][] = Array.from({ length: k }, () => []);
	let best = Infinity;
	const place = (i: number) => {
		if (i === nums.length) {
			best = Math.min(
				best,
				groups.reduce((sum, g) => sum + Math.max(...g) - Math.min(...g), 0),
			);
			return;
		}
		for (const group of groups) {
			const value = nums[i] ?? 0;
			if (group.length === size || group.includes(value)) continue;
			group.push(value);
			place(i + 1);
			group.pop();
		}
	};
	place(0);
	return best === Infinity ? -1 : best;
};

describe("1681. Minimum Incompatibility", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumIncompatibility([1, 2, 1, 4], 2)).toBe(4);
		expect(minimumIncompatibility([6, 3, 8, 1, 3, 1, 2, 2], 4)).toBe(6);
		expect(minimumIncompatibility([5, 3, 3, 6, 3, 3], 3)).toBe(-1);
	});

	it("matches assigning elements directly on random inputs", () => {
		const random = createRandom(1681);
		const shapes = [
			[4, 2],
			[6, 2],
			[6, 3],
			[8, 4],
			[8, 2],
			[4, 4],
			[6, 1],
		] as const;
		for (let run = 0; run < 100; run++) {
			const [n, k] = shapes[random.int(0, shapes.length - 1)] ?? [4, 2];
			const nums = random.array(n, 1, n);
			expect(minimumIncompatibility(nums, k)).toBe(byBruteForce(nums, k));
		}
	});

	it("handles 16 elements", () => {
		expect(
			minimumIncompatibility(
				[
					...Array.from({ length: 8 }, (_, i) => i + 1),
					...Array.from({ length: 8 }, (_, i) => i + 1),
				],
				2,
			),
		).toBe(14);
	});
});
