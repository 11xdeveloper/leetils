import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { specialBinaryString as makeLargestSpecial } from ".";

const isSpecial = (s: string): boolean => {
	let balance = 0;
	for (const char of s) {
		balance += char === "1" ? 1 : -1;
		if (balance < 0) return false;
	}
	return balance === 0 && s.length > 0;
};

/** Breadth-first search over every string reachable by swapping neighbouring special substrings. */
const bySearch = (s: string): string => {
	const seen = new Set([s]);
	const queue = [s];
	for (const current of queue) {
		for (let i = 0; i < current.length; i++) {
			for (let j = i + 2; j < current.length; j += 2) {
				if (!isSpecial(current.slice(i, j))) continue;
				for (let k = j + 2; k <= current.length; k += 2) {
					if (!isSpecial(current.slice(j, k))) continue;
					const swapped =
						current.slice(0, i) +
						current.slice(j, k) +
						current.slice(i, j) +
						current.slice(k);
					if (!seen.has(swapped)) {
						seen.add(swapped);
						queue.push(swapped);
					}
				}
			}
		}
	}
	return [...seen].sort().at(-1) ?? s;
};

const randomSpecial = (random: Random, pairs: number): string => {
	let s = "";
	let open = 0;
	let remaining = pairs;
	while (remaining > 0 || open > 0) {
		if (remaining > 0 && (open === 0 || random.int(0, 1) === 0)) {
			s += "1";
			open++;
			remaining--;
		} else {
			s += "0";
			open--;
		}
	}
	return s;
};

describe("761. Special Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeLargestSpecial("11011000")).toBe("11100100");
		expect(makeLargestSpecial("10")).toBe("10");
	});

	it("matches searching every sequence of swaps on random strings", () => {
		const random = createRandom(761);
		for (let run = 0; run < 300; run++) {
			const s = randomSpecial(random, random.int(1, 5));
			expect(makeLargestSpecial(s)).toBe(bySearch(s));
		}
	});
});
