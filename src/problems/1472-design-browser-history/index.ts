/**
 * 1472. Design Browser History
 *
 * A browser tab starting at `homepage` supporting `visit(url)` (which
 * clears forward history), `back(steps)` and `forward(steps)`, the last two
 * returning the current page after moving as far as possible.
 *
 * Keeps the pages in an array with a current position and the end of the
 * valid history; visiting overwrites in place and moves the end.
 *
 * @see https://leetcode.com/problems/design-browser-history/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(visits)
 *
 * @example
 * const browser = new DesignBrowserHistory("leetcode.com");
 * browser.visit("google.com");
 * browser.back(5); // "leetcode.com"
 * browser.forward(1); // "google.com"
 */
export class DesignBrowserHistory {
	readonly #pages: string[];
	#current = 0;
	#last = 0;

	constructor(homepage: string) {
		this.#pages = [homepage];
	}

	visit(url: string): void {
		this.#current++;
		this.#pages[this.#current] = url;
		this.#last = this.#current;
	}

	back(steps: number): string {
		this.#current = Math.max(0, this.#current - steps);
		return this.#pages[this.#current] ?? "";
	}

	forward(steps: number): string {
		this.#current = Math.min(this.#last, this.#current + steps);
		return this.#pages[this.#current] ?? "";
	}
}
