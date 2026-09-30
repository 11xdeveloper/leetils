import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheTownJudge as findJudge } from ".";

describe("997. Find the Town Judge", () => {
	it("solves the examples from the problem statement", () => {
		expect(findJudge(2, [[1, 2]])).toBe(2);
		expect(
			findJudge(3, [
				[1, 3],
				[2, 3],
			]),
		).toBe(3);
		expect(
			findJudge(3, [
				[1, 3],
				[2, 3],
				[3, 1],
			]),
		).toBe(-1);
		expect(findJudge(1, [])).toBe(1);
	});

	it("matches checking the definition on random towns", () => {
		const random = createRandom(997);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const pairs = new Map<string, number[]>();
			for (let i = random.int(0, 12); i > 0; i--) {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				if (a !== b) pairs.set(`${a},${b}`, [a, b]);
			}
			const trust = [...pairs.values()];
			const judges = Array.from({ length: n }, (_, i) => i + 1).filter(
				(p) =>
					!trust.some(([a]) => a === p) &&
					Array.from({ length: n }, (_, i) => i + 1).every(
						(q) => q === p || trust.some(([a, b]) => a === q && b === p),
					),
			);
			expect(findJudge(n, trust)).toBe(
				judges.length === 1 ? (judges[0] ?? -1) : -1,
			);
		}
	});
});
