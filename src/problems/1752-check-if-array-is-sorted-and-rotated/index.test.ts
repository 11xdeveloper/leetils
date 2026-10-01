import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfArrayIsSortedAndRotated as check } from ".";

describe("1752. Check if Array Is Sorted and Rotated", () => {
	it("solves the examples from the problem statement", () => {
		expect(check([3, 4, 5, 1, 2])).toBeTrue();
		expect(check([2, 1, 3, 4])).toBeFalse();
		expect(check([1, 2, 3])).toBeTrue();
	});

	it("matches trying every rotation on random inputs", () => {
		const random = createRandom(1752);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), 1, 4);
			const expected = nums.some((_, r) => {
				const rotated = [...nums.slice(r), ...nums.slice(0, r)];
				return rotated.every(
					(value, i) => i === 0 || (rotated[i - 1] ?? 0) <= value,
				);
			});
			expect(check(nums)).toBe(expected);
		}
	});
});
