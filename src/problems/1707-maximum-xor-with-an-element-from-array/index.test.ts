import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorWithAnElementFromArray as maximizeXor } from ".";

describe("1707. Maximum XOR With an Element From Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximizeXor(
				[0, 1, 2, 3, 4],
				[
					[3, 1],
					[1, 3],
					[5, 6],
				],
			),
		).toEqual([3, 3, 7]);
		expect(
			maximizeXor(
				[5, 2, 4, 6, 6, 3],
				[
					[12, 4],
					[8, 1],
					[6, 3],
				],
			),
		).toEqual([15, -1, 5]);
	});

	it("matches checking every element on random inputs", () => {
		const random = createRandom(1707);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 10 ** 9);
			const queries = Array.from({ length: 10 }, () => [
				random.int(0, 10 ** 9),
				random.int(0, 10 ** 9),
			]);
			const expected = queries.map(([x = 0, m = 0]) =>
				Math.max(
					-1,
					...nums.filter((num) => num <= m).map((num) => (num ^ x) >>> 0),
				),
			);
			expect(maximizeXor(nums, queries)).toEqual(expected);
		}
	});
});
