import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { decodeXoredPermutation as decode } from ".";

describe("1734. Decode XORed Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(decode([3, 1])).toEqual([1, 2, 3]);
		expect(decode([6, 5, 4, 6])).toEqual([2, 4, 1, 5, 3]);
	});

	it("recovers random permutations", () => {
		const random = createRandom(1734);
		for (let run = 0; run < 200; run++) {
			const n = 2 * random.int(1, 10) + 1;
			const perm = Array.from({ length: n }, (_, i) => i + 1);
			for (let i = n - 1; i > 0; i--) {
				const j = random.int(0, i);
				[perm[i], perm[j]] = [perm[j] ?? 0, perm[i] ?? 0];
			}
			const encoded = perm.slice(1).map((value, i) => value ^ (perm[i] ?? 0));
			expect(decode(encoded)).toEqual(perm);
		}
	});
});
