import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeAllAdjacentDuplicatesInStringII as removeDuplicates } from ".";

/** Removes the first run of k equal letters until there are none. */
const byBruteForce = (s: string, k: number): string => {
	const pattern = new RegExp(`(.)\\1{${k - 1}}`);
	let current = s;
	for (
		let next = current.replace(pattern, "");
		next !== current;
		next = current.replace(pattern, "")
	) {
		current = next;
	}
	return current;
};

describe("1209. Remove All Adjacent Duplicates in String II", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeDuplicates("abcd", 2)).toBe("abcd");
		expect(removeDuplicates("deeedbbcccbdaa", 3)).toBe("aa");
		expect(removeDuplicates("pbbcggttciiippooaais", 2)).toBe("ps");
	});

	it("matches removing runs one at a time on random inputs", () => {
		const random = createRandom(1209);
		for (let run = 0; run < 400; run++) {
			const s = random.string(random.int(1, 20), "ab");
			const k = random.int(2, 4);
			expect(removeDuplicates(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
