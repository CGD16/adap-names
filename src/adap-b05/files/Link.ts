import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        IllegalArgumentException.assert(bn !== null, "bn is null");
        IllegalArgumentException.assert(bn !== undefined, "bn is undefined");
        IllegalArgumentException.assert(bn.length > 0, "bn is empty");

        IllegalArgumentException.assert(pn !== null, "pn is null");
        IllegalArgumentException.assert(pn !== undefined, "pn is undefined");

        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        IllegalArgumentException.assert(target !== null, "target is null");
        IllegalArgumentException.assert(target !== undefined, "target is undefined");
        InvalidStateException.assert(this.targetNode !== null, "targetNode is null");

        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        IllegalArgumentException.assert(bn !== null, "bn is null");
        IllegalArgumentException.assert(bn !== undefined, "bn is undefined");
        IllegalArgumentException.assert(bn.length > 0, "bn is empty");

        const target = this.ensureTargetNode(this.targetNode);
        InvalidStateException.assert(target !== null, "target is null");

        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        InvalidStateException.assert(target !== null, "target is null");

        const result: Node = this.targetNode as Node;
        return result;
    }

    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assert(bn !== null, "bn is null");
        IllegalArgumentException.assert(bn !== undefined, "bn is undefined");
        IllegalArgumentException.assert(bn.length > 0, "bn is empty");

        const result: Set<Node> = new Set<Node>();

        if (this.getBaseName() === bn) {
            result.add(this);
        }

        if (this.targetNode !== null) {
            const targetResults = this.targetNode.findNodes(bn);
            for (const node of targetResults) {
                result.add(node);
            }
        }

        return result;
    }

}