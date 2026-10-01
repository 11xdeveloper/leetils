import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseStringII as reverseStr } from ".";

const bySlicing = (s: string, k: number): string => {
	let result = "";
	for (let start = 0; start < s.length; start += 2 * k) {
		result +=
			[...s.slice(start, start + k)].reverse().join("") +
			s.slice(start + k, start + 2 * k);
	}
	return result;
};

describe("541. Reverse String II", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseStr("abcdefg", 2)).toBe("bacdfeg");
		expect(reverseStr("abcd", 2)).toBe("bacd");
	});

	it("matches slicing the blocks on random inputs", () => {
		const random = createRandom(541);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 20), "abcdef");
			const k = random.int(1, 8);
			expect(reverseStr(s, k)).toBe(bySlicing(s, k));
		}
	});
});
