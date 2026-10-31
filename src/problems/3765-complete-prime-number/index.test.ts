import { describe, expect, it } from "bun:test";
import { completePrimeNumber as completePrime } from ".";

describe("3765. Complete Prime Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(completePrime(23)).toBeTrue();
		expect(completePrime(39)).toBeFalse();
		expect(completePrime(7)).toBeTrue();
	});

	it("checks every prefix and suffix", () => {
		expect(completePrime(373)).toBeTrue();
		expect(completePrime(37)).toBeTrue();
		expect(completePrime(31)).toBeFalse();
	});
});
