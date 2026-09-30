import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { increasingDecreasingString as sortString } from ".";

/** Follows the statement's steps with a list of remaining characters. */
const byBruteForce = (s: string): string => {
	const left = [...s];
	let result = "";
	const takeNext = (after: string | undefined, largest: boolean) => {
		const candidates = left.filter((char) =>
			after === undefined ? true : largest ? char < after : char > after,
		);
		if (candidates.length === 0) return undefined;
		const chosen = candidates.reduce((best, char) =>
			(largest ? char > best : char < best) ? char : best,
		);
		left.splice(left.indexOf(chosen), 1);
		result += chosen;
		return chosen;
	};
	while (left.length > 0) {
		for (const largest of [false, true]) {
			let last = takeNext(undefined, largest);
			while (last !== undefined) last = takeNext(last, largest);
		}
	}
	return result;
};

describe("1370. Increasing Decreasing String", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortString("aaaabbbbcccc")).toBe("abccbaabccba");
		expect(sortString("rat")).toBe("art");
	});

	it("matches following the steps on random inputs", () => {
		const random = createRandom(1370);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 20), "abcde");
			expect(sortString(s)).toBe(byBruteForce(s));
		}
	});
});
