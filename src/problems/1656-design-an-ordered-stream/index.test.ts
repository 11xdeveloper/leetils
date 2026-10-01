import { describe, expect, it } from "bun:test";
import { DesignAnOrderedStream as OrderedStream } from ".";

describe("1656. Design an Ordered Stream", () => {
	it("solves the example from the problem statement", () => {
		const stream = new OrderedStream(5);
		expect(stream.insert(3, "ccccc")).toEqual([]);
		expect(stream.insert(1, "aaaaa")).toEqual(["aaaaa"]);
		expect(stream.insert(2, "bbbbb")).toEqual(["bbbbb", "ccccc"]);
		expect(stream.insert(5, "eeeee")).toEqual([]);
		expect(stream.insert(4, "ddddd")).toEqual(["ddddd", "eeeee"]);
	});
});
