import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumValueOfConcatenatedBinarySegments as maxValue } from ".";

/** Tries every order with BigInt. */
const byBruteForce = (nums1: number[], nums0: number[]): number => {
	const segments = nums1.map(
		(a, i) => "1".repeat(a) + "0".repeat(nums0[i] ?? 0),
	);
	let best = 0n;
	const go = (prefix: string, rest: string[]): void => {
		if (rest.length === 0) {
			const v = BigInt(`0b${prefix || "0"}`);
			if (v > best) best = v;
		}
		rest.forEach((s, i) => {
			go(prefix + s, [...rest.slice(0, i), ...rest.slice(i + 1)]);
		});
	};
	go("", segments);
	return Number(best % 1_000_000_007n);
};

describe("3897. Maximum Value of Concatenated Binary Segments", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValue([1, 2], [1, 0])).toBe(14);
		expect(maxValue([3, 1], [0, 3])).toBe(120);
	});

	it("matches trying every order on random segments", () => {
		const random = createRandom(3897);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 5);
			const nums1 = random.array(n, 0, 4);
			const nums0 = nums1.map((a) => random.int(a === 0 ? 1 : 0, 4));
			expect(maxValue(nums1, nums0)).toBe(byBruteForce(nums1, nums0));
		}
	});
});
