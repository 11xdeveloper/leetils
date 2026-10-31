import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumReverseOperations as minReverseOperations } from ".";

/** Breadth-first search trying every window. */
const byBruteForce = (
	n: number,
	p: number,
	banned: number[],
	k: number,
): number[] => {
	const answer = Array.from({ length: n }, () => -1);
	answer[p] = 0;
	const queue = [p];
	for (let head = 0; head < queue.length; head++) {
		const i = queue[head] ?? 0;
		for (let l = 0; l + k <= n; l++) {
			if (i < l || i >= l + k) continue;
			const j = 2 * l + k - 1 - i;
			if (answer[j] !== -1 || banned.includes(j)) continue;
			answer[j] = (answer[i] ?? 0) + 1;
			queue.push(j);
		}
	}
	return answer;
};

describe("2612. Minimum Reverse Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minReverseOperations(4, 0, [1, 2], 4)).toEqual([0, -1, -1, 1]);
		expect(minReverseOperations(5, 0, [2, 4], 3)).toEqual([0, -1, -1, -1, -1]);
		expect(minReverseOperations(4, 2, [0, 1, 3], 1)).toEqual([-1, -1, 0, -1]);
	});

	it("matches trying every window on random inputs", () => {
		const random = createRandom(2612);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const p = random.int(0, n - 1);
			const banned = random
				.array(random.int(0, 3), 0, n - 1)
				.filter((b) => b !== p);
			const k = random.int(1, n);
			expect(minReverseOperations(n, p, banned, k)).toEqual(
				byBruteForce(n, p, banned, k),
			);
		}
	});
});
