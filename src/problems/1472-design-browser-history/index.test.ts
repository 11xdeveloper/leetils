import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignBrowserHistory as BrowserHistory } from ".";

describe("1472. Design Browser History", () => {
	it("solves the example from the problem statement", () => {
		const browser = new BrowserHistory("leetcode.com");
		browser.visit("google.com");
		browser.visit("facebook.com");
		browser.visit("youtube.com");
		expect(browser.back(1)).toBe("facebook.com");
		expect(browser.back(1)).toBe("google.com");
		expect(browser.forward(1)).toBe("facebook.com");
		browser.visit("linkedin.com");
		expect(browser.forward(2)).toBe("linkedin.com");
		expect(browser.back(2)).toBe("google.com");
		expect(browser.back(7)).toBe("leetcode.com");
	});

	it("matches a pair of stacks on random operations", () => {
		const random = createRandom(1472);
		for (let run = 0; run < 100; run++) {
			const browser = new BrowserHistory("home");
			const backStack = ["home"];
			const forwardStack: string[] = [];
			for (let op = 0; op < 50; op++) {
				const kind = random.int(0, 2);
				if (kind === 0) {
					const url = `page${op}`;
					browser.visit(url);
					backStack.push(url);
					forwardStack.length = 0;
				} else if (kind === 1) {
					const steps = random.int(1, 4);
					for (let i = 0; i < steps && backStack.length > 1; i++)
						forwardStack.push(backStack.pop() ?? "");
					expect(browser.back(steps)).toBe(backStack.at(-1) ?? "");
				} else {
					const steps = random.int(1, 4);
					for (let i = 0; i < steps && forwardStack.length > 0; i++)
						backStack.push(forwardStack.pop() ?? "");
					expect(browser.forward(steps)).toBe(backStack.at(-1) ?? "");
				}
			}
		}
	});
});
