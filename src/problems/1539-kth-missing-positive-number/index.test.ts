import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthMissingPositiveNumber as findKthPositive } from ".";

describe("1539. Kth Missing Positive Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKthPositive([2, 3, 4, 7, 11], 5)).toBe(9);
		expect(findKthPositive([1, 2, 3, 4], 2)).toBe(6);
	});

	it("matches counting up on random inputs", () => {
		const random = createRandom(1539);
		for (let run = 0; run < 300; run++) {
			const arr = [...new Set(random.array(random.int(1, 10), 1, 30))].sort(
				(a, b) => a - b,
			);
			const k = random.int(1, 30);
			const present = new Set(arr);
			let [value, missing] = [0, 0];
			while (missing < k) {
				value++;
				if (!present.has(value)) missing++;
			}
			expect(findKthPositive(arr, k)).toBe(value);
		}
	});
});
