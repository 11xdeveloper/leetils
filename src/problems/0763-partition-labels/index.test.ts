import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { partitionLabels } from ".";

/** Cuts wherever no letter appears on both sides. */
const byBruteForce = (s: string): number[] => {
	const sizes: number[] = [];
	let start = 0;
	for (let cut = 1; cut <= s.length; cut++) {
		const before = new Set(s.slice(0, cut));
		if (
			cut === s.length ||
			![...s.slice(cut)].some((char) => before.has(char))
		) {
			sizes.push(cut - start);
			start = cut;
		}
	}
	return sizes;
};

describe("763. Partition Labels", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionLabels("ababcbacadefegdehijhklij")).toEqual([9, 7, 8]);
		expect(partitionLabels("eccbbbbdec")).toEqual([10]);
	});

	it("matches checking every cut on random strings", () => {
		const random = createRandom(763);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "abcdefg");
			expect(partitionLabels(s)).toEqual(byBruteForce(s));
		}
	});
});
