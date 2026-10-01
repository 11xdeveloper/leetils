import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAdjacentSwapsToReachTheKthSmallestNumber as getMinSwaps } from ".";

/** Breadth-first search over adjacent swaps toward the k-th larger permutation (found by sorting all). */
const byBruteForce = (num: string, k: number): number => {
	const perms = new Set<string>();
	const build = (left: string[], prefix: string) => {
		if (left.length === 0) perms.add(prefix);
		for (const [i, d] of left.entries())
			build(
				left.filter((_, j) => j !== i),
				prefix + d,
			);
	};
	build([...num], "");
	const sorted = [...perms].sort();
	const target = sorted[sorted.indexOf(num) + k] ?? "";
	const dist = new Map([[num, 0]]);
	const queue = [num];
	for (let head = 0; head < queue.length; head++) {
		const current = queue[head] ?? "";
		if (current === target) return dist.get(current) ?? 0;
		for (let i = 0; i + 1 < current.length; i++) {
			const next =
				current.slice(0, i) +
				current[i + 1] +
				current[i] +
				current.slice(i + 2);
			if (dist.has(next)) continue;
			dist.set(next, (dist.get(current) ?? 0) + 1);
			queue.push(next);
		}
	}
	return -1;
};

describe("1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMinSwaps("5489355142", 4)).toBe(2);
		expect(getMinSwaps("11112", 4)).toBe(4);
		expect(getMinSwaps("00123", 1)).toBe(1);
	});

	it("matches a breadth-first search on random inputs", () => {
		const random = createRandom(1850);
		let checked = 0;
		while (checked < 80) {
			const num = random.string(random.int(2, 6), "0123");
			const sorted = [...num].sort().reverse().join("");
			if (num === sorted) continue;
			const k = random.int(1, 3);
			const expected = byBruteForce(num, k);
			if (expected === -1) continue;
			checked++;
			expect(getMinSwaps(num, k)).toBe(expected);
		}
	});
});
