import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfSubarrayMinimums as sumSubarrayMins } from ".";

describe("907. Sum of Subarray Minimums", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumSubarrayMins([3, 1, 2, 4])).toBe(17);
		expect(sumSubarrayMins([11, 81, 94, 43, 3])).toBe(444);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(907);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 1, 5);
			let expected = 0;
			for (let i = 0; i < arr.length; i++) {
				let min = Number.POSITIVE_INFINITY;
				for (let j = i; j < arr.length; j++) {
					min = Math.min(min, arr[j] ?? 0);
					expected += min;
				}
			}
			expect(sumSubarrayMins(arr)).toBe(expected);
		}
	});

	it("reduces large sums modulo 10^9 + 7", () => {
		expect(sumSubarrayMins(new Array(30_000).fill(30_000))).toBe(
			Number((30_000n * ((30_000n * 30_001n) / 2n)) % 1_000_000_007n),
		);
	});
});
