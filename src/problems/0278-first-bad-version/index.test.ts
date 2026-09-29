import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { firstBadVersion } from ".";

/** Runs the solution with a given first bad version, counting API calls. */
const find = (n: number, bad: number): [found: number, calls: number] => {
	let calls = 0;
	const found = firstBadVersion((version) => {
		calls++;
		return version >= bad;
	})(n);
	return [found, calls];
};

describe("278. First Bad Version", () => {
	it("solves the examples from the problem statement", () => {
		expect(find(5, 4)[0]).toBe(4);
		expect(find(1, 1)[0]).toBe(1);
	});

	it("handles the first and last versions being the first bad one", () => {
		expect(find(100, 1)[0]).toBe(1);
		expect(find(100, 100)[0]).toBe(100);
	});

	it("finds the version in about log2(n) calls, up to the 32-bit limit", () => {
		const [found, calls] = find(2 ** 31 - 1, 2 ** 31 - 2);
		expect(found).toBe(2 ** 31 - 2);
		expect(calls).toBeLessThanOrEqual(32);
	});

	it("finds random first bad versions", () => {
		const random = createRandom(278);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 2 ** 31 - 1);
			const bad = random.int(1, n);
			expect(find(n, bad)[0]).toBe(bad);
		}
	});
});
