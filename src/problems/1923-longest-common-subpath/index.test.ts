import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonSubpath } from ".";

/** Checks every subpath of the first path against the others. */
const byBruteForce = (paths: number[][]): number => {
	const [first = [], ...rest] = paths;
	let best = 0;
	for (let i = 0; i < first.length; i++) {
		for (let j = i + 1; j <= first.length; j++) {
			const key = `,${first.slice(i, j).join(",")},`;
			if (rest.every((path) => `,${path.join(",")},`.includes(key)))
				best = Math.max(best, j - i);
		}
	}
	return best;
};

describe("1923. Longest Common Subpath", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestCommonSubpath(5, [
				[0, 1, 2, 3, 4],
				[2, 3, 4],
				[4, 0, 1, 2, 3],
			]),
		).toBe(2);
		expect(longestCommonSubpath(3, [[0], [1], [2]])).toBe(0);
		expect(
			longestCommonSubpath(5, [
				[0, 1, 2, 3, 4],
				[4, 3, 2, 1, 0],
			]),
		).toBe(1);
	});

	it("matches checking every subpath on random inputs", () => {
		const random = createRandom(1923);
		for (let run = 0; run < 200; run++) {
			const paths = Array.from({ length: random.int(2, 4) }, () => {
				const path = [random.int(0, 3)];
				while (path.length < random.int(1, 12)) {
					const next = random.int(0, 3);
					if (next !== path.at(-1)) path.push(next);
				}
				return path;
			});
			expect(longestCommonSubpath(4, paths)).toBe(byBruteForce(paths));
		}
	});
});
