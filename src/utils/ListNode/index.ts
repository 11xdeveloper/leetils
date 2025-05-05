class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number, next?: ListNode | null) {
		this.val = val;
		this.next = next ? next : null;
	}

	getLastNode(): ListNode {
		return this.next ? this.next.getLastNode() : this;
	}

	push(...nums: number[]) {
		let lastNode = this.getLastNode();

		for (const num of nums) {
			lastNode.next = new ListNode(num);
			lastNode = lastNode.next;
		}

		return this;
	}

	static from(list: number[]) {
		if (!list[0]) throw new Error("Recieved empty array");

		return new ListNode(list[0]).push(...list.slice(1));
	}

	toArray(): number[] {
		if (!this.next) return [this.val];
		return [this.val, ...this.next.toArray()];
	}

	sort(compareFn?: (a: number, b: number) => number) {
		return ((x: ListNode) => {
			this.val = x.val;
			this.next = x.next;
			return x;
		})(ListNode.from(this.toArray().sort(compareFn)));
	}
}

export default ListNode;
