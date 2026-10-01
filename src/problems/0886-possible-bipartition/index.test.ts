import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { possibleBipartition } from ".";

describe("886. Possible Bipartition", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			possibleBipartition(4, [
				[1, 2],
				[1, 3],
				[2, 4],
			]),
		).toBeTrue();
		expect(
			possibleBipartition(3, [
				[1, 2],
				[1, 3],
				[2, 3],
			]),
		).toBeFalse();
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(886);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 9);
			const dislikes = Array.from({ length: random.int(0, n) }, () => [
				random.int(1, n),
				random.int(1, n),
			]).filter(([a, b]) => a !== b);
			let expected = false;
			for (let mask = 0; mask < 1 << n && !expected; mask++) {
				expected = dislikes.every(
					([a = 1, b = 1]) =>
						((mask >> (a - 1)) & 1) !== ((mask >> (b - 1)) & 1),
				);
			}
			expect(possibleBipartition(n, dislikes)).toBe(expected);
		}
	});
});
