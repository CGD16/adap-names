import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        IllegalArgumentException.assert(bn !== null, "baseName is null");
        IllegalArgumentException.assert(bn !== undefined, "baseName is undefined");
        IllegalArgumentException.assert(bn.length > 0, "baseName is empty");

        IllegalArgumentException.assert(pn !== null, "parent is null");
        IllegalArgumentException.assert(pn !== undefined, "parent is undefined");

        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        IllegalArgumentException.assert(cn !== null, "child node is null");
        IllegalArgumentException.assert(cn !== undefined, "child node is undefined");

        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn !== null, "child node is null");
        IllegalArgumentException.assert(cn !== undefined, "child node is undefined");

        IllegalArgumentException.assert(
            !this.childNodes.has(cn),
            "child node already exists"
        );

        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(cn !== null, "child node is null");
        IllegalArgumentException.assert(cn !== undefined, "child node is undefined");

        IllegalArgumentException.assert(
            this.childNodes.has(cn),
            "child node does not exist"
        );
        
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

}