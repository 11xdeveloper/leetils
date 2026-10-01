import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfStringIsTransformableWithSubstringSortOperations as isTransformable } from ".";

/** Explores every string reachable by sorting substrings. */
const byBruteForce = (s: string, t: string): boolean => {
	const seen = new Set([s]);
	const stack = [s];
	for (
		let current = stack.pop();
		current !== undefined;
		current = stack.pop()
	) {
		if (current === t) return true;
		for (let i = 0; i < current.length; i++) {
			for (let j = i + 2; j <= current.length; j++) {
				const next =
					current.slice(0, i) +
					[...current.slice(i, j)].sort().join("") +
					current.slice(j);
				if (seen.has(next)) continue;
				seen.add(next);
				stack.push(next);
			}
		}
	}
	return false;
};

describe("1585. Check If String Is Transformable With Substring Sort Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(isTransformable("84532", "34852")).toBeTrue();
		expect(isTransformable("34521", "23415")).toBeTrue();
		expect(isTransformable("12345", "12435")).toBeFalse();
	});

	it("rejects different digits", () => {
		expect(isTransformable("1", "2")).toBeFalse();
	});

	it("matches exploring every sort on random strings", () => {
		const random = createRandom(1585);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 6), "0123");
			const t =
				random.next() < 0.7
					? [...s].sort(() => random.next() - 0.5).join("")
					: random.string(s.length, "0123");
			expect(isTransformable(s, t)).toBe(byBruteForce(s, t));
		}
	});
});
