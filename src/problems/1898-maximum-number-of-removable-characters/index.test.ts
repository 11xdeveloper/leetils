import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfRemovableCharacters as maximumRemovals } from ".";

describe("1898. Maximum Number of Removable Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumRemovals("abcacb", "ab", [3, 1, 0])).toBe(2);
		expect(maximumRemovals("abcbddddd", "abcd", [3, 2, 1, 4, 5, 6])).toBe(1);
		expect(maximumRemovals("abcab", "abc", [0, 1, 2, 3, 4])).toBe(0);
	});

	it("matches removing characters one at a time on random inputs", () => {
		const random = createRandom(1898);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(2, 12), "ab");
			const p = [...s].filter(() => random.int(0, 1) === 1).join("");
			const removable = [...Array.from({ length: s.length }, (_, i) => i)]
				.sort(() => random.int(0, 2) - 1)
				.slice(0, random.int(0, s.length));
			const isSubsequence = (t: string) => {
				let matched = 0;
				for (const c of t) if (c === p[matched]) matched++;
				return matched >= p.length;
			};
			let k = 0;
			while (k < removable.length) {
				const removed = new Set(removable.slice(0, k + 1));
				if (!isSubsequence([...s].filter((_, i) => !removed.has(i)).join("")))
					break;
				k++;
			}
			expect(maximumRemovals(s, p, removable)).toBe(k);
		}
	});
});
