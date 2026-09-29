import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxConsecutiveOnes as findMaxConsecutiveOnes } from ".";

describe("485. Max Consecutive Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])).toBe(3);
		expect(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])).toBe(2);
		expect(findMaxConsecutiveOnes([0])).toBe(0);
	});

	it("matches splitting the string on zeros on random inputs", () => {
		const random = createRandom(485);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 20), 0, 1);
			const expected = Math.max(
				...nums
					.join("")
					.split("0")
					.map((ones) => ones.length),
			);
			expect(findMaxConsecutiveOnes(nums)).toBe(expected);
		}
	});
});
