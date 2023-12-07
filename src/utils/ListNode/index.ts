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
        if (list.length === 0) throw new Error('Recieved empty array');

        return new ListNode(list[0]).push(...list.slice(1));
    }
}

export default ListNode;
