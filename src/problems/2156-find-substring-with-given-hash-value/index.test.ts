import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSubstringWithGivenHashValue as subStrHash } from ".";

const hashOf = (s: string, power: bigint, modulo: bigint): number => {
	let [hash, factor] = [0n, 1n];
	for (const char of s) {
		hash = (hash + BigInt(char.charCodeAt(0) - 96) * factor) % modulo;
		factor = (factor * power) % modulo;
	}
	return Number(hash);
};

describe("2156. Find Substring With Given Hash Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(subStrHash("leetcode", 7, 20, 2, 0)).toBe("ee");
		expect(subStrHash("fbxzaad", 31, 100, 3, 32)).toBe("fbx");
	});

	it("finds the first match with large moduli", () => {
		const random = createRandom(2156);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 30), "abcz");
			const k = random.int(1, s.length);
			const power = random.int(1, 1_000_000_000);
			const modulo = random.int(1, 1_000_000_000);
			const start = random.int(0, s.length - k);
			const hash = hashOf(
				s.slice(start, start + k),
				BigInt(power),
				BigInt(modulo),
			);
			let first = 0;
			while (
				hashOf(s.slice(first, first + k), BigInt(power), BigInt(modulo)) !==
				hash
			)
				first++;
			expect(subStrHash(s, power, modulo, k, hash)).toBe(
				s.slice(first, first + k),
			);
		}
	});
});
