import { describe, expect, it } from "bun:test";
import { majorityFrequencyCharacters as majorityFrequencyGroup } from ".";

const sorted = (s: string) => [...s].sort().join("");

describe("3692. Majority Frequency Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(sorted(majorityFrequencyGroup("aaabbbccdddde"))).toBe("ab");
		expect(sorted(majorityFrequencyGroup("abcd"))).toBe("abcd");
		expect(sorted(majorityFrequencyGroup("pfpfgi"))).toBe("fp");
	});
});
