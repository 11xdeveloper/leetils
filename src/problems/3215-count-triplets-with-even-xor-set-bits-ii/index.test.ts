import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTripletsWithEvenXorSetBitsII as tripletCount } from ".";

describe("3215. Count Triplets with Even XOR Set Bits II", () => {
	it("solves the examples from the problem statement", () => {
		expect(tripletCount([1], [2], [3])).toBe(1);
		expect(tripletCount([1, 1], [2, 3], [1, 5])).toBe(4);
	});
});

describe("3215. Count Triplets with Even XOR Set Bits II on random arrays", () => {
	it("matches checking every triplet", () => {
		const random = createRandom(3215);
		for (let run = 0; run < 100; run++) {
			const [a, b, c] = [0, 1, 2].map(() =>
				random.array(random.int(1, 6), 0, 31),
			);
			let count = 0;
			for (const x of a ?? [])
				for (const y of b ?? [])
					for (const z of c ?? [])
						if ((x ^ y ^ z).toString(2).replaceAll("0", "").length % 2 === 0)
							count++;
			expect(tripletCount(a ?? [], b ?? [], c ?? [])).toBe(count);
		}
	});
});
