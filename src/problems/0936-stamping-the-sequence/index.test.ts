import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stampingTheSequence as movesToStamp } from ".";

const apply = (stamp: string, length: number, order: number[]): string => {
	const result = new Array<string>(length).fill("?");
	for (const start of order)
		for (const [k, char] of [...stamp].entries()) result[start + k] = char;
	return result.join("");
};

describe("936. Stamping The Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(apply("abc", 5, movesToStamp("abc", "ababc"))).toBe("ababc");
		expect(apply("abca", 7, movesToStamp("abca", "aabcaca"))).toBe("aabcaca");
	});

	it("returns nothing when the target can't be stamped", () => {
		expect(movesToStamp("abc", "abd")).toEqual([]);
		expect(movesToStamp("ab", "ba")).toEqual([]);
	});

	it("finds a valid sequence for targets made by random stamping", () => {
		const random = createRandom(936);
		for (let run = 0; run < 1000; run++) {
			const stamp = random.string(random.int(1, 4), "abc");
			const length = random.int(stamp.length, 12);
			// Stamp at random, making sure every position gets covered.
			const placements = [
				0,
				length - stamp.length,
				...random.array(random.int(0, 8), 0, length - stamp.length),
			];
			for (let i = 0; i < length; i++)
				placements.push(Math.min(i, length - stamp.length));
			const shuffled = placements.sort(() => random.next() - 0.5);
			const target = apply(stamp, length, shuffled);
			const order = movesToStamp(stamp, target);
			expect(order.length).toBeGreaterThan(0);
			expect(order.length).toBeLessThanOrEqual(10 * length);
			expect(apply(stamp, length, order)).toBe(target);
		}
	});
});
