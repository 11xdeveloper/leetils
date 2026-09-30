import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { numberOfSquarefulArrays as numSquarefulPerms } from ".";

describe("996. Number of Squareful Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSquarefulPerms([1, 17, 8])).toBe(2);
		expect(numSquarefulPerms([2, 2, 2])).toBe(1);
	});

	it("matches checking every distinct permutation on random inputs", () => {
		const random = createRandom(996);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 7), 0, 10);
			const distinct = new Set(
				permutations(nums)
					.filter((perm) =>
						perm.every(
							(value, i) =>
								i === 0 ||
								Number.isInteger(Math.sqrt(value + (perm[i - 1] ?? 0))),
						),
					)
					.map((perm) => perm.join()),
			);
			expect(numSquarefulPerms(nums)).toBe(distinct.size);
		}
	});
});
