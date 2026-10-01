import { describe, expect, it } from "bun:test";
import { validateIpAddress as validIPAddress } from ".";

describe("468. Validate IP Address", () => {
	it("solves the examples from the problem statement", () => {
		expect(validIPAddress("172.16.254.1")).toBe("IPv4");
		expect(validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334")).toBe("IPv6");
		expect(validIPAddress("256.256.256.256")).toBe("Neither");
	});

	it("accepts valid IPv4 addresses", () => {
		for (const ip of ["0.0.0.0", "255.255.255.255", "1.10.100.200"])
			expect(validIPAddress(ip)).toBe("IPv4");
	});

	it("rejects invalid IPv4 addresses", () => {
		for (const ip of [
			"01.1.1.1",
			"1.1.1",
			"1.1.1.1.",
			".1.1.1",
			"1.1.1.1.1",
			"1.1.1.-1",
			"1.1.1.+1",
			"1.1.1.a",
			"1.1.1.1000",
			"1..1.1",
			"1.1.1. 1",
			"1.1.1.1 ",
		]) {
			expect(validIPAddress(ip)).toBe("Neither");
		}
	});

	it("accepts valid IPv6 addresses", () => {
		for (const ip of [
			"2001:db8:85a3:0:0:8A2E:0370:7334",
			"0:0:0:0:0:0:0:0",
			"ffff:FFFF:ffff:ffff:ffff:ffff:ffff:ffff",
		]) {
			expect(validIPAddress(ip)).toBe("IPv6");
		}
	});

	it("rejects invalid IPv6 addresses", () => {
		for (const ip of [
			"2001:0db8:85a3::8A2E:037j:7334",
			"02001:0db8:85a3:0000:0000:8a2e:0370:7334",
			"2001:0db8:85a3:0:0:8A2E:0370:7334:",
			"2001:0db8:85a3:0:0:8A2E:0370",
			"2001:0db8:85a3:0:0:8A2G:0370:7334",
			"1e1.4.5.6",
			"",
		]) {
			expect(validIPAddress(ip)).toBe("Neither");
		}
	});
});
