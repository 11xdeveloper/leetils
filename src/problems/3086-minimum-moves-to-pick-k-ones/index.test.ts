import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumMovesToPickKOnes } from ".";

/** Breadth-first search over the game's states from every start. */
const byBruteForce = (
	nums: number[],
	k: number,
	maxChanges: number,
): number => {
	const n = nums.length;
	let best = Number.POSITIVE_INFINITY;
	for (let alice = 0; alice < n; alice++) {
		let start = nums.reduce((mask, v, i) => mask | (v << i), 0);
		let picked = 0;
		if ((start >> alice) & 1) {
			start &= ~(1 << alice);
			picked = 1;
		}
		const key = (mask: number, p: number, c: number) => `${mask},${p},${c}`;
		const seen = new Set([key(start, picked, 0)]);
		let frontier: [number, number, number][] = [[start, picked, 0]];
		for (let moves = 0; frontier.length > 0 && moves < best; moves++) {
			if (frontier.some(([, p]) => p >= k)) {
				best = moves;
				break;
			}
			const next: [number, number, number][] = [];
			const push = (mask: number, p: number, c: number) => {
				if (!seen.has(key(mask, p, c))) {
					seen.add(key(mask, p, c));
					next.push([mask, p, c]);
				}
			};
			for (const [mask, p, c] of frontier) {
				if (c < maxChanges)
					for (let j = 0; j < n; j++)
						if (j !== alice && !((mask >> j) & 1)) push(mask | (1 << j), p, c);
				for (let x = 0; x < n; x++)
					for (const y of [x - 1, x + 1]) {
						if (y < 0 || y >= n || !((mask >> x) & 1) || (mask >> y) & 1)
							continue;
						const moved = (mask & ~(1 << x)) | (1 << y);
						if (y === alice) push(moved & ~(1 << y), p + 1, c);
						else push(moved, p, c);
					}
			}
			frontier = next;
		}
	}
	return best;
};

describe("3086. Minimum Moves to Pick K Ones", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumMovesToPickKOnes([1, 1, 0, 0, 0, 1, 1, 0, 0, 1], 3, 1)).toBe(
			3,
		);
		expect(minimumMovesToPickKOnes([0, 0, 0, 0], 2, 3)).toBe(4);
	});

	it("matches searching every move on random arrays", () => {
		const random = createRandom(3086);
		for (let run = 0; run < 150; run++) {
			const nums = random.array(random.int(2, 7), 0, 1);
			const ones = nums.reduce((a, b) => a + b, 0);
			const maxChanges = random.int(0, 2);
			if (ones + maxChanges === 0) continue;
			const k = random.int(1, Math.min(4, ones + maxChanges));
			expect(minimumMovesToPickKOnes(nums, k, maxChanges)).toBe(
				byBruteForce(nums, k, maxChanges),
			);
		}
	});
});
