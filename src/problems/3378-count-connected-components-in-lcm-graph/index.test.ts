import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countConnectedComponentsInLcmGraph as countComponents } from ".";

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Builds the graph pair by pair and counts components. */
const byBruteForce = (nums: number[], threshold: number): number => {
	const parent = nums.map((_, i) => i);
	const find = (x: number): number =>
		parent[x] === x ? x : find(parent[x] ?? x);
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++) {
			const [a = 0, b = 0] = [nums[i], nums[j]];
			if ((a / gcd(a, b)) * b <= threshold) parent[find(i)] = find(j);
		}
	return new Set(nums.map((_, i) => find(i))).size;
};

describe("3378. Count Connected Components in LCM Graph", () => {
	it("solves the examples from the problem statement", () => {
		expect(countComponents([2, 4, 8, 3, 9], 5)).toBe(4);
		expect(countComponents([2, 4, 8, 3, 9, 12], 10)).toBe(2);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(3378);
		for (let run = 0; run < 200; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), 1, 40))];
			const threshold = random.int(1, 50);
			expect(countComponents(nums, threshold)).toBe(
				byBruteForce(nums, threshold),
			);
		}
	});
});
