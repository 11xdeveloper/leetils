import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfAll1sAreAtLeastLengthKPlacesAway as kLengthApart } from ".";

describe("1437. Check If All 1's Are at Least Length K Places Away", () => {
	it("solves the examples from the problem statement", () => {
		expect(kLengthApart([1, 0, 0, 0, 1, 0, 0, 1], 2)).toBeTrue();
		expect(kLengthApart([1, 0, 0, 1, 0, 1], 2)).toBeFalse();
	});

	it("matches checking every pair of 1s on random inputs", () => {
		const random = createRandom(1437);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 1);
			const k = random.int(0, 4);
			const ones = nums.flatMap((bit, i) => (bit ? [i] : []));
			const expected = ones.every((a, i) =>
				ones.slice(i + 1).every((b) => b - a - 1 >= k),
			);
			expect(kLengthApart(nums, k)).toBe(expected);
		}
	});
});
