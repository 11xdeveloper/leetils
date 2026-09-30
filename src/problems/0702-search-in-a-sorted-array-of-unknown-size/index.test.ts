import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { searchInASortedArrayOfUnknownSize as search } from ".";

/** A reader over an array that counts how many times it's called. */
const readerOf = (secret: number[]) => {
	const reader = {
		calls: 0,
		get: (i: number) => {
			reader.calls++;
			return secret[i] ?? 2 ** 31 - 1;
		},
	};
	return reader;
};

describe("702. Search in a Sorted Array of Unknown Size", () => {
	it("solves the examples from the problem statement", () => {
		expect(search(readerOf([-1, 0, 3, 5, 9, 12]), 9)).toBe(4);
		expect(search(readerOf([-1, 0, 3, 5, 9, 12]), 2)).toBe(-1);
	});

	it("finds every element of random arrays, and nothing else, in logarithmic reads", () => {
		const random = createRandom(702);
		for (let run = 0; run < 200; run++) {
			const secret = [
				...new Set(random.array(random.int(1, 200), -1000, 1000)),
			].sort((a, b) => a - b);
			for (let target = -1001; target <= 1001; target += random.int(1, 40)) {
				const reader = readerOf(secret);
				expect(search(reader, target)).toBe(secret.indexOf(target));
				expect(reader.calls).toBeLessThanOrEqual(
					2 * Math.ceil(Math.log2(secret.length + 2)) + 4,
				);
			}
		}
	});
});
