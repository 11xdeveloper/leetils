import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { editDistance } from "../0072-edit-distance";
import { oneEditDistance } from ".";

describe("161. One Edit Distance", () => {
	it("solves the examples from the problem statement", () => {
		expect(oneEditDistance("ab", "acb")).toBeTrue();
		expect(oneEditDistance("", "")).toBeFalse();
	});

	it("accepts a single insertion, deletion or replacement anywhere", () => {
		expect(oneEditDistance("abc", "abcd")).toBeTrue();
		expect(oneEditDistance("abc", "bc")).toBeTrue();
		expect(oneEditDistance("abc", "abd")).toBeTrue();
		expect(oneEditDistance("", "a")).toBeTrue();
	});

	it("rejects equal strings and strings two edits apart", () => {
		expect(oneEditDistance("abc", "abc")).toBeFalse();
		expect(oneEditDistance("abc", "a")).toBeFalse();
		expect(oneEditDistance("ab", "ba")).toBeFalse();
	});

	it("matches Edit Distance being exactly 1 on random inputs", () => {
		const random = createRandom(161);
		for (let run = 0; run < 2000; run++) {
			const s = random.string(random.int(0, 5), "ab1");
			const t = random.string(random.int(0, 5), "ab1");
			expect(oneEditDistance(s, t)).toBe(editDistance(s, t) === 1);
		}
	});
});
