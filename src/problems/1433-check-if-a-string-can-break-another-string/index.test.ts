import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfAStringCanBreakAnotherString as checkIfCanBreak } from ".";

/** Tries every permutation of the first string against the second as given. */
const byBruteForce = (s1: string, s2: string): boolean => {
	const permutations = (chars: string[]): string[][] =>
		chars.length <= 1
			? [chars]
			: chars.flatMap((char, i) =>
					permutations(chars.filter((_, j) => j !== i)).map((rest) => [
						char,
						...rest,
					]),
				);
	return permutations([...s1]).some(
		(p) =>
			p.every((c, i) => c >= (s2[i] ?? "")) ||
			p.every((c, i) => c <= (s2[i] ?? "")),
	);
};

describe("1433. Check If a String Can Break Another String", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkIfCanBreak("abc", "xya")).toBeTrue();
		expect(checkIfCanBreak("abe", "acd")).toBeFalse();
		expect(checkIfCanBreak("leetcodee", "interview")).toBeTrue();
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(1433);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 5);
			const [s1, s2] = [random.string(n, "abcd"), random.string(n, "abcd")];
			expect(checkIfCanBreak(s1, s2)).toBe(byBruteForce(s1, s2));
		}
	});
});
