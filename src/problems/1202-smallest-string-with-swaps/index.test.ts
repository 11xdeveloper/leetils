import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestStringWithSwaps } from ".";

/** Explores every string reachable by the swaps. */
const byBruteForce = (s: string, pairs: number[][]): string => {
	const seen = new Set([s]);
	const stack = [s];
	for (
		let current = stack.pop();
		current !== undefined;
		current = stack.pop()
	) {
		for (const [a = 0, b = 0] of pairs) {
			const chars = [...current];
			[chars[a], chars[b]] = [chars[b] ?? "", chars[a] ?? ""];
			const next = chars.join("");
			if (seen.has(next)) continue;
			seen.add(next);
			stack.push(next);
		}
	}
	return [...seen].sort()[0] ?? s;
};

describe("1202. Smallest String With Swaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestStringWithSwaps("dcab", [
				[0, 3],
				[1, 2],
			]),
		).toBe("bacd");
		expect(
			smallestStringWithSwaps("dcab", [
				[0, 3],
				[1, 2],
				[0, 2],
			]),
		).toBe("abcd");
		expect(
			smallestStringWithSwaps("cba", [
				[0, 1],
				[1, 2],
			]),
		).toBe("abc");
	});

	it("leaves the string alone without pairs", () => {
		expect(smallestStringWithSwaps("zyx", [])).toBe("zyx");
	});

	it("matches exploring every swap on random inputs", () => {
		const random = createRandom(1202);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 7), "abcd");
			const pairs = Array.from({ length: random.int(0, 4) }, () =>
				random.array(2, 0, s.length - 1),
			);
			expect(smallestStringWithSwaps(s, pairs)).toBe(byBruteForce(s, pairs));
		}
	});
});
