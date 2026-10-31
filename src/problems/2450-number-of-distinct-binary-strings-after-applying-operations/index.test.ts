import { describe, expect, it } from "bun:test";
import { numberOfDistinctBinaryStringsAfterApplyingOperations as countDistinctStrings } from ".";

describe("2450. Number of Distinct Binary Strings After Applying Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDistinctStrings("1001", 3)).toBe(4);
		expect(countDistinctStrings("10110", 5)).toBe(2);
	});

	it("matches exploring every flip on short strings", () => {
		for (let n = 1; n <= 7; n++) {
			for (let k = 1; k <= n; k++) {
				const start = "0".repeat(n);
				const seen = new Set([start]);
				const queue = [start];
				for (let head = 0; head < queue.length; head++) {
					const s = queue[head] ?? "";
					for (let i = 0; i + k <= n; i++) {
						const flipped =
							s.slice(0, i) +
							[...s.slice(i, i + k)]
								.map((c) => (c === "0" ? "1" : "0"))
								.join("") +
							s.slice(i + k);
						if (!seen.has(flipped)) {
							seen.add(flipped);
							queue.push(flipped);
						}
					}
				}
				expect(countDistinctStrings(start, k)).toBe(seen.size);
			}
		}
	});
});
