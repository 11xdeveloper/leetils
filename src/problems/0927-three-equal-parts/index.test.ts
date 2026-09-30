import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { threeEqualParts } from ".";

const value = (bits: number[]): bigint =>
	bits.reduce((total, bit) => total * 2n + BigInt(bit), 0n);

describe("927. Three Equal Parts", () => {
	it("solves the examples from the problem statement", () => {
		expect(threeEqualParts([1, 0, 1, 0, 1])).toEqual([0, 3]);
		expect(threeEqualParts([1, 1, 0, 1, 1])).toEqual([-1, -1]);
		expect(threeEqualParts([1, 1, 0, 0, 1])).toEqual([0, 2]);
	});

	it("finds a valid split exactly when one exists on random arrays", () => {
		const random = createRandom(927);
		for (let run = 0; run < 1000; run++) {
			const part = random.array(random.int(1, 4), 0, 1);
			const arr = random.int(0, 1)
				? [
						...random.array(random.int(0, 2), 0, 0),
						...part,
						...random.array(random.int(0, 2), 0, 0),
						...part,
						...part,
					]
				: random.array(random.int(3, 10), 0, 1);
			let exists = false;
			for (let i = 0; i < arr.length; i++) {
				for (let j = i + 2; j < arr.length; j++) {
					const [x, y, z] = [
						value(arr.slice(0, i + 1)),
						value(arr.slice(i + 1, j)),
						value(arr.slice(j)),
					];
					if (x === y && y === z) exists = true;
				}
			}
			const [i = -1, j = -1] = threeEqualParts(arr);
			expect(i !== -1).toBe(exists);
			if (exists) {
				expect(i + 1 < j).toBeTrue();
				expect(value(arr.slice(0, i + 1))).toBe(value(arr.slice(i + 1, j)));
				expect(value(arr.slice(i + 1, j))).toBe(value(arr.slice(j)));
			}
		}
	});
});
