import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rotateString } from ".";

describe("796. Rotate String", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotateString("abcde", "cdeab")).toBeTrue();
		expect(rotateString("abcde", "abced")).toBeFalse();
	});

	it("matches trying every rotation on random inputs", () => {
		const random = createRandom(796);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 6), "ab");
			const goal = random.string(random.int(1, 6), "ab");
			const expected = [...s].some(
				(_, i) => s.slice(i) + s.slice(0, i) === goal,
			);
			expect(rotateString(s, goal)).toBe(expected);
		}
	});
});
