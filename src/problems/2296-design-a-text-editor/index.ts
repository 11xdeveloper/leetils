/**
 * 2296. Design a Text Editor
 *
 * A text editor with a cursor supports adding text, deleting to the left,
 * and moving the cursor; moves return the last (up to) 10 characters left
 * of the cursor.
 *
 * Keep the text left of the cursor and the text right of it (reversed) as
 * stacks, so every operation touches only the characters it moves.
 *
 * @see https://leetcode.com/problems/design-a-text-editor/
 * @difficulty Hard
 * @timeComplexity O(k) per operation
 * @spaceComplexity O(text length)
 *
 * @example
 * const editor = new DesignATextEditor();
 * editor.addText("leetcode");
 * editor.deleteText(4); // 4
 * editor.cursorLeft(2); // "le"
 */
export class DesignATextEditor {
	readonly #left: string[] = [];
	readonly #right: string[] = [];

	addText(text: string): void {
		this.#left.push(...text);
	}

	deleteText(k: number): number {
		const deleted = Math.min(k, this.#left.length);
		this.#left.length -= deleted;
		return deleted;
	}

	cursorLeft(k: number): string {
		for (let i = 0; i < k && this.#left.length; i++)
			this.#right.push(this.#left.pop() ?? "");
		return this.#preview();
	}

	cursorRight(k: number): string {
		for (let i = 0; i < k && this.#right.length; i++)
			this.#left.push(this.#right.pop() ?? "");
		return this.#preview();
	}

	#preview(): string {
		return this.#left.slice(-10).join("");
	}
}
