class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next?: ListNode | null) {
        this.val = val;
        this.next = next ? next : null;
    }

    push(val: number) {
        this.next ? this.next.push(val) : (this.next = new ListNode(val));
        return this;
    }

    static from(list: number[]) {
        if (list.length < 1) throw new Error('Recieved empty array');

        const listNode = new ListNode(list[0]);

        for (let i = 1; i < list.length; i++) {
            listNode.push(list[i]);
        }

        return listNode;
    }
}

export default ListNode;
