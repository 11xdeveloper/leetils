import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestStringChain as longestStrChain } from ".";

describe("1048. Longest String Chain", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestStrChain(["a", "b", "ba", "bca", "bda", "bdca"])).toBe(4);
		expect(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"])).toBe(5);
		expect(longestStrChain(["abcd", "dbqca"])).toBe(1);
	});

	it("matches following predecessors recursively on random words", () => {
		const random = createRandom(1048);
		for (let run = 0; run < 300; run++) {
			const words = [
				...new Set(
					Array.from({ length: random.int(1, 10) }, () =>
						random.string(random.int(1, 4), "ab"),
					),
				),
			];
			const set = new Set(words);
			const chainFrom = (word: string): number => {
				let best = 1;
				for (const other of set) {
					if (other.length !== word.length + 1) continue;
					for (let i = 0; i < other.length; i++)
						if (other.slice(0, i) + other.slice(i + 1) === word)
							best = Math.max(best, 1 + chainFrom(other));
				}
				return best;
			};
			expect(longestStrChain(words)).toBe(Math.max(...words.map(chainFrom)));
		}
	});
});
