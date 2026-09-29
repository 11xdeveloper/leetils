import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { restoreIpAddresses } from ".";

/** Generates every address from 0.0.0.0 upwards that uses exactly these digits. */
const byParsing = (s: string): string[] => {
	const results: string[] = [];
	const build = (rest: string, parts: string[]): void => {
		if (parts.length === 4) {
			if (rest === "") results.push(parts.join("."));
			return;
		}
		for (let value = 0; value <= 255; value++) {
			const part = String(value);
			if (rest.startsWith(part))
				build(rest.slice(part.length), [...parts, part]);
		}
	};
	build(s, []);
	return results.toSorted();
};

describe("93. Restore IP Addresses", () => {
	it("solves the examples from the problem statement", () => {
		expect(restoreIpAddresses("25525511135").toSorted()).toEqual([
			"255.255.11.135",
			"255.255.111.35",
		]);
		expect(restoreIpAddresses("0000")).toEqual(["0.0.0.0"]);
		expect(restoreIpAddresses("101023").toSorted()).toEqual([
			"1.0.10.23",
			"1.0.102.3",
			"10.1.0.23",
			"10.10.2.3",
			"101.0.2.3",
		]);
	});

	it("returns nothing for strings too short or too long", () => {
		expect(restoreIpAddresses("123")).toEqual([]);
		expect(restoreIpAddresses("1234567890123")).toEqual([]);
	});

	it("rejects parts over 255 and parts with leading zeros", () => {
		expect(restoreIpAddresses("256256256256")).toEqual([]);
		expect(restoreIpAddresses("010010").toSorted()).toEqual([
			"0.10.0.10",
			"0.100.1.0",
		]);
	});

	it("matches building addresses from their parts on random inputs", () => {
		const random = createRandom(93);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 13), "0125");
			expect(restoreIpAddresses(s).toSorted()).toEqual(byParsing(s));
		}
	});
});
