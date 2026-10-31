import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestStringAfterReverse } from "../3722-lexicographically-smallest-string-after-reverse";
import { lexicographicallySmallestStringAfterReverseII as lexSmallest } from ".";

describe("3735. Lexicographically Smallest String After Reverse II", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexSmallest("dcab")).toBe("acdb");
		expect(lexSmallest("abba")).toBe("aabb");
		expect(lexSmallest("zxy")).toBe("xzy");
	});

	it("matches trying every reversal on random strings", () => {
		const random = createRandom(3735);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "abc");
			expect(lexSmallest(s)).toBe(
				lexicographicallySmallestStringAfterReverse(s),
			);
		}
	});
});
