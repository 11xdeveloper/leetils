import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constructUniformParityArrayII as uniformArray } from ".";

/** Tries every choice for every index. */
const byBruteForce = (nums: number[]): boolean => {
	const options = nums.map((x) => [
		x,
		...nums.filter((y) => y < x).map((y) => x - y),
	]);
	return [0, 1].some((p) =>
		options.every((list) => list.some((v) => v % 2 === p)),
	);
};

describe("3876. Construct Uniform Parity Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniformArray([1, 4, 7])).toBeTrue();
		expect(uniformArray([2, 3])).toBeFalse();
		expect(uniformArray([4, 6])).toBeTrue();
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3876);
		for (let run = 0; run < 300; run++) {
			const nums = [...new Set(random.array(random.int(1, 6), 1, 15))];
			expect(uniformArray(nums)).toBe(byBruteForce(nums));
		}
	});
});
