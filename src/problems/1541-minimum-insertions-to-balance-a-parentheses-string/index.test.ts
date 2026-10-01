import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumInsertionsToBalanceAParenthesesString as minInsertions } from ".";

/**
 * 0-1 breadth-first search over (position, open count, waiting for a second
 * `)`) states: consuming the next character is free, inserting one costs 1.
 */
const byBruteForce = (s: string): number => {
	const n = s.length;
	const apply = (
		open: number,
		half: boolean,
		char: string,
	): [number, boolean] | undefined => {
		if (half) return char === ")" ? [open - 1, false] : undefined;
		if (char === "(") return open <= n ? [open + 1, false] : undefined;
		return open > 0 ? [open, true] : undefined;
	};
	const done = new Set<string>();
	let round: [number, number, boolean][] = [[0, 0, false]];
	for (let cost = 0; round.length > 0; cost++) {
		const next: [number, number, boolean][] = [];
		for (let k = 0; k < round.length; k++) {
			const [i, open, half] = round[k] ?? [0, 0, false];
			const key = `${i},${open},${half}`;
			if (done.has(key)) continue;
			done.add(key);
			if (i === n && open === 0 && !half) return cost;
			const consumed = i < n ? apply(open, half, s[i] ?? "") : undefined;
			if (consumed) round.push([i + 1, ...consumed]);
			for (const char of ["(", ")"]) {
				const inserted = apply(open, half, char);
				if (inserted) next.push([i, ...inserted]);
			}
		}
		round = next;
	}
	return -1;
};

describe("1541. Minimum Insertions to Balance a Parentheses String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minInsertions("(()))")).toBe(1);
		expect(minInsertions("())")).toBe(0);
		expect(minInsertions("))())(")).toBe(3);
	});

	it("matches searching over insertions on random inputs", () => {
		const random = createRandom(1541);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 10), "()");
			expect(minInsertions(s)).toBe(byBruteForce(s));
		}
	});
});
