import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ZigzagIterator } from ".";

const drain = (iterator: ZigzagIterator): number[] => {
	const values: number[] = [];
	while (iterator.hasNext()) values.push(iterator.next());
	return values;
};

/** Takes position 0 of every array, then position 1, and so on. */
const byRounds = (vectors: number[][]): number[] => {
	const longest = Math.max(0, ...vectors.map((v) => v.length));
	return Array.from({ length: longest }, (_, i) =>
		vectors.flatMap((v) => (i < v.length ? [v[i] ?? 0] : [])),
	).flat();
};

describe("281. Zigzag Iterator", () => {
	it("solves the examples from the problem statement", () => {
		expect(drain(new ZigzagIterator([1, 2], [3, 4, 5, 6]))).toEqual([
			1, 3, 2, 4, 5, 6,
		]);
		expect(drain(new ZigzagIterator([1], []))).toEqual([1]);
		expect(drain(new ZigzagIterator([], [1]))).toEqual([1]);
	});

	it("solves the follow-up example with three arrays", () => {
		expect(drain(new ZigzagIterator([1, 2, 3], [4, 5, 6, 7], [8, 9]))).toEqual([
			1, 4, 8, 2, 5, 9, 3, 6, 7,
		]);
	});

	it("matches taking values in rounds on random arrays", () => {
		const random = createRandom(281);
		for (let run = 0; run < 500; run++) {
			const vectors = Array.from({ length: random.int(1, 4) }, () =>
				random.array(random.int(0, 5), -9, 9),
			);
			expect(drain(new ZigzagIterator(...vectors))).toEqual(byRounds(vectors));
		}
	});
});
