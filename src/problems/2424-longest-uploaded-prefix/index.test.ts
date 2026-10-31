import { describe, expect, it } from "bun:test";
import { LongestUploadedPrefix as LUPrefix } from ".";

describe("2424. Longest Uploaded Prefix", () => {
	it("solves the example from the problem statement", () => {
		const server = new LUPrefix(4);
		server.upload(3);
		expect(server.longest()).toBe(0);
		server.upload(1);
		expect(server.longest()).toBe(1);
		server.upload(2);
		expect(server.longest()).toBe(3);
	});
});
