import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rotateFunction } from ".";

const byDefinition = (nums: number[]): number => {
	const n = nums.length;
	return Math.max(
		...Array.from({ length: n }, (_, k) =>
			nums.reduce((total, _, i) => total + i * (nums[(i - k + n) % n] ?? 0), 0),
		),
	);
};

describe("396. Rotate Function", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotateFunction([4, 3, 2, 6])).toBe(26);
		expect(rotateFunction([100])).toBe(0);
	});

	it("matches computing every rotation on random inputs", () => {
		const random = createRandom(396);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -100, 100);
			expect(rotateFunction(nums)).toBe(byDefinition(nums));
		}
	});
});
