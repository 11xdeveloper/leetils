import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countRotationsWithExactlyKEqualAdjacentPairs as countRotations } from ".";

describe("4043. Count Rotations With Exactly K Equal Adjacent Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(countRotations("aab", 1)).toBe(2);
		expect(countRotations("abca", 0)).toBe(1);
	});

	it("matches building every rotation", () => {
		const random = createRandom(4043);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(2, 8), "ab");
			const k = random.int(0, s.length - 1);
			let expected = 0;
			for (let r = 0; r < s.length; r++) {
				const t = s.slice(r) + s.slice(0, r);
				let score = 0;
				for (let i = 0; i + 1 < t.length; i++) if (t[i] === t[i + 1]) score++;
				if (score === k) expected++;
			}
			expect(countRotations(s, k)).toBe(expected);
		}
	});
});
