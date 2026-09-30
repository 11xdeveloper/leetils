import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { customSortString } from ".";

describe("791. Custom Sort String", () => {
	it("solves the examples from the problem statement", () => {
		expect(customSortString("cba", "abcd")).toBe("cbad");
		expect(customSortString("bcafg", "abcd")).toBe("bcad");
	});

	it("keeps every character and respects the order on random inputs", () => {
		const random = createRandom(791);
		for (let run = 0; run < 1000; run++) {
			const order = [
				...new Set(random.string(random.int(1, 5), "abcdef")),
			].join("");
			const s = random.string(random.int(1, 15), "abcdefgh");
			const result = customSortString(order, s);
			expect([...result].sort().join("")).toBe([...s].sort().join(""));
			const ranks = [...result]
				.map((char) => order.indexOf(char))
				.filter((rank) => rank !== -1);
			expect(ranks).toEqual(ranks.toSorted((a, b) => a - b));
		}
	});
});
