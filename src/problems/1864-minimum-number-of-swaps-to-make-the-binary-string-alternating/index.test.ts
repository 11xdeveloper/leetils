import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfSwapsToMakeTheBinaryStringAlternating as minSwaps } from ".";

/** Breadth-first search over swaps. */
const byBruteForce = (s: string): number => {
	const alternating = (t: string) =>
		[...t].every((c, i) => i === 0 || c !== t[i - 1]);
	const dist = new Map([[s, 0]]);
	const queue = [s];
	for (let head = 0; head < queue.length; head++) {
		const current = queue[head] ?? "";
		if (alternating(current)) return dist.get(current) ?? 0;
		for (let i = 0; i < current.length; i++) {
			for (let j = i + 1; j < current.length; j++) {
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

describe("1864. Minimum Number of Swaps to Make the Binary String Alternating", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps("111000")).toBe(1);
		expect(minSwaps("010")).toBe(0);
		expect(minSwaps("1110")).toBe(-1);
	});

	it("matches a breadth-first search on random strings", () => {
		const random = createRandom(1864);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 8), "01");
			expect(minSwaps(s)).toBe(byBruteForce(s));
		}
	});
});
