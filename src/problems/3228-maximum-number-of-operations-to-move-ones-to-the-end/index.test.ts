import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfOperationsToMoveOnesToTheEnd as maxOperations } from ".";

/** Searches every sequence of moves. */
const byBruteForce = (s: string): number => {
	const memo = new Map<string, number>();
	const search = (t: string): number => {
		const cached = memo.get(t);
		if (cached !== undefined) return cached;
		let best = 0;
		for (let i = 0; i + 1 < t.length; i++) {
			if (t[i] !== "1" || t[i + 1] !== "0") continue;
			let j = i + 1;
			while (j + 1 < t.length && t[j + 1] === "0") j++;
			const moved = `${t.slice(0, i)}0${t.slice(i + 1, j)}1${t.slice(j + 1)}`;
			best = Math.max(best, 1 + search(moved));
		}
		memo.set(t, best);
		return best;
	};
	return search(s);
};

describe("3228. Maximum Number of Operations to Move Ones to the End", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxOperations("1001101")).toBe(4);
		expect(maxOperations("00111")).toBe(0);
	});

	it("matches searching every move on random strings", () => {
		const random = createRandom(3228);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 10), "01");
			expect(maxOperations(s)).toBe(byBruteForce(s));
		}
	});
});
