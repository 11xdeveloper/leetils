import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfSwapsToMakeTheStringBalanced as minSwaps } from ".";

/** Breadth-first search over swaps. */
const byBruteForce = (s: string): number => {
	const balanced = (t: string) => {
		let depth = 0;
		for (const c of t) {
			depth += c === "[" ? 1 : -1;
			if (depth < 0) return false;
		}
		return true;
	};
	const dist = new Map([[s, 0]]);
	const queue = [s];
	for (let head = 0; head < queue.length; head++) {
		const current = queue[head] ?? "";
		if (balanced(current)) return dist.get(current) ?? 0;
		for (let i = 0; i < current.length; i++) {
			for (let j = i + 1; j < current.length; j++) {
				if (current[i] === current[j]) continue;
				const chars = [...current];
				[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
				const next = chars.join("");
				if (dist.has(next)) continue;
				dist.set(next, (dist.get(current) ?? 0) + 1);
				queue.push(next);
			}
		}
	}
	return -1;
};

describe("1963. Minimum Number of Swaps to Make the String Balanced", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps("][][")).toBe(1);
		expect(minSwaps("]]][[[")).toBe(2);
		expect(minSwaps("[]")).toBe(0);
	});

	it("matches a breadth-first search on random strings", () => {
		const random = createRandom(1963);
		for (let run = 0; run < 100; run++) {
			const half = random.int(1, 4);
			const chars = [..."[".repeat(half), ..."]".repeat(half)];
			for (let i = chars.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
			}
			const s = chars.join("");
			expect(minSwaps(s)).toBe(byBruteForce(s));
		}
	});
});
