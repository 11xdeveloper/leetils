import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ipToCidr } from ".";

const toNumber = (ip: string): number =>
	ip.split(".").reduce((value, part) => value * 256 + Number(part), 0);

describe("751. IP to CIDR", () => {
	it("solves the examples from the problem statement", () => {
		expect(ipToCidr("255.0.0.7", 10)).toEqual([
			"255.0.0.7/32",
			"255.0.0.8/29",
			"255.0.0.16/32",
		]);
		expect(ipToCidr("117.145.102.62", 8)).toEqual([
			"117.145.102.62/31",
			"117.145.102.64/30",
			"117.145.102.68/31",
		]);
	});

	it("covers exactly the range with the fewest aligned blocks", () => {
		const random = createRandom(751);
		for (let run = 0; run < 1000; run++) {
			const start = random.int(0, 2 ** 32 - 1001);
			const n = random.int(1, 1000);
			const ip = [24, 16, 8, 0]
				.map((shift) => Math.floor(start / 2 ** shift) % 256)
				.join(".");
			const blocks = ipToCidr(ip, n).map((block) => {
				const [base = "", prefix = "32"] = block.split("/");
				return [toNumber(base), 2 ** (32 - Number(prefix))] as const;
			});
			let next = start;
			for (const [base, size] of blocks) {
				expect(base).toBe(next);
				expect(base % size).toBe(0);
				next += size;
			}
			expect(next).toBe(start + n);
			// fewest[i]: the fewest aligned blocks covering exactly [start + i, start + n).
			const fewest = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
			fewest[n] = 0;
			for (let i = n - 1; i >= 0; i--) {
				for (
					let size = 1;
					i + size <= n && (start + i) % size === 0;
					size *= 2
				) {
					fewest[i] = Math.min(
						fewest[i] ?? Infinity,
						1 + (fewest[i + size] ?? Infinity),
					);
				}
			}
			expect(blocks.length).toBe(fewest[0] ?? 0);
		}
	});
});
