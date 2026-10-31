import { describe, expect, it } from "bun:test";
import { trafficSignalColor as trafficSignal } from ".";

describe("3894. Traffic Signal Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(trafficSignal(60)).toBe("Red");
		expect(trafficSignal(5)).toBe("Invalid");
	});

	it("covers every state", () => {
		expect(trafficSignal(0)).toBe("Green");
		expect(trafficSignal(30)).toBe("Orange");
		expect(trafficSignal(90)).toBe("Red");
		expect(trafficSignal(91)).toBe("Invalid");
	});
});
