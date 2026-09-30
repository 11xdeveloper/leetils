import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { similarStringGroups as numSimilarGroups } from ".";

/** Counts groups by flood filling over explicit two-letter swaps. */
const bySwaps = (strs: string[]): number => {
	const swaps = (s: string): Set<string> => {
		const result = new Set([s]);
		for (let i = 0; i < s.length; i++) {
			for (let j = i + 1; j < s.length; j++) {
				const chars = [...s];
				[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
				result.add(chars.join(""));
			}
		}
		return result;
	};
	const seen = new Set<number>();
	let groups = 0;
	for (let start = 0; start < strs.length; start++) {
		if (seen.has(start)) continue;
		groups++;
		seen.add(start);
		const queue = [start];
		for (const i of queue) {
			const reachable = swaps(strs[i] ?? "");
			for (let j = 0; j < strs.length; j++) {
				if (!seen.has(j) && reachable.has(strs[j] ?? "")) {
					seen.add(j);
					queue.push(j);
				}
			}
		}
	}
	return groups;
};

describe("839. Similar String Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSimilarGroups(["tars", "rats", "arts", "star"])).toBe(2);
		expect(numSimilarGroups(["omv", "ovm"])).toBe(1);
	});

	it("matches flood filling over swaps on random anagrams", () => {
		const random = createRandom(839);
		for (let run = 0; run < 300; run++) {
			const base = [...random.string(random.int(1, 5), "abcd")];
			const strs = Array.from({ length: random.int(1, 8) }, () =>
				base.toSorted(() => random.next() - 0.5).join(""),
			);
			expect(numSimilarGroups(strs)).toBe(bySwaps(strs));
		}
	});
});
