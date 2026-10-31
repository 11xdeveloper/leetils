import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { transformBinaryStringUsingSubsequenceSort as transformStr } from ".";

/** Searches every reachable string, then every filling of the pattern. */
const byBruteForce = (s: string, strs: string[]): boolean[] => {
	const reachable = new Set([s]);
	const queue = [s];
	for (let q = 0; q < queue.length; q++) {
		const t = queue[q] ?? "";
		for (let i = 0; i < t.length; i++)
			for (let j = i + 1; j < t.length; j++)
				if (t[i] === "1" && t[j] === "0") {
					const next = `${t.slice(0, i)}0${t.slice(i + 1, j)}1${t.slice(j + 1)}`;
					if (!reachable.has(next)) {
						reachable.add(next);
						queue.push(next);
					}
				}
	}
	return strs.map((pattern) =>
		[...reachable].some((t) =>
			[...pattern].every((c, i) => c === "?" || c === t[i]),
		),
	);
};

describe("3998. Transform Binary String Using Subsequence Sort", () => {
	it("solves the examples from the problem statement", () => {
		expect(transformStr("101", ["1?1", "0?1", "0?0"])).toEqual([
			true,
			true,
			false,
		]);
		expect(transformStr("1100", ["0011", "11?1", "1?1?"])).toEqual([
			true,
			false,
			true,
		]);
		expect(transformStr("1010", ["0011"])).toEqual([true]);
	});

	it("matches searching every reachable string", () => {
		const random = createRandom(3998);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const s = random.string(n, "01");
			const strs = Array.from({ length: 5 }, () => random.string(n, "01??"));
			expect(transformStr(s, strs)).toEqual(byBruteForce(s, strs));
		}
	});
});
