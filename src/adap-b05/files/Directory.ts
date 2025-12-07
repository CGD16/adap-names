import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assert(bn !== null, "bn is null");
        IllegalArgumentException.assert(bn !== undefined, "bn is undefined");
        IllegalArgumentException.assert(bn.length > 0, "bn is empty");

        const result: Set<Node> = new Set<Node>();

        if (this.getBaseName() === bn) {
            result.add(this);
        }

        for(const child of this.childNodes) {
            const childResults: Set<Node> = child.findNodes(bn);
            for(const cr of childResults) {
                result.add(cr);
            }
        
        }

        return result;
    }

}