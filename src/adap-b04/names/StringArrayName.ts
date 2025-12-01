import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        IllegalArgumentException.assert(source !== null, "source is null");
        IllegalArgumentException.assert(source !== undefined, "source is undefined");

        if (delimiter !== undefined) {
            IllegalArgumentException.assert(delimiter !== null, "delimiter is null");
            IllegalArgumentException.assert(delimiter.length > 0, "delimiter is empty");
        }

        if (delimiter) {
            this.delimiter = delimiter;
        } 
        if (typeof (source as any) === "string") {
            this.components = (source as any).split(this.delimiter);
        } else {
            this.components = source.slice();
        }

        for (let i = 0; i < this.components.length; i++) {
            IllegalArgumentException.assert(this.components[i] !== null, "component is null");
            IllegalArgumentException.assert(this.components[i] !== undefined, "component is undefined");
            IllegalArgumentException.assert(this.components[i].length > 0, "component is empty");
        }
        this.assertClassInvariant();

    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(
            this.components !== null,
            "components array is null"
        );
        InvalidStateException.assert(
            this.getNoComponents() >= 0,
            "noComponents is negative"
        );
        InvalidStateException.assert(
            this.delimiter.length > 0,
            "delimiter is empty"
        );
    }


    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) return false;
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        return true;
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");

        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");

        this.components[i] = c;

        MethodFailedException.assert(this.components[i] === c, "component not set correctly");
        this.assertClassInvariant();
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i <= this.getNoComponents(), "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");

        this.components.splice(i, 0, c);
        this.assertClassInvariant();
    }

    public append(c: string) {
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");

        this.components.push(c);

        this.assertClassInvariant();
    }

    public remove(i: number) {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");
        IllegalArgumentException.assert(this.getNoComponents() > 0, "cannot remove from empty name");

        this.components.splice(i, 1);
        this.assertClassInvariant();
    }

    public concat(other: Name): void {
        IllegalArgumentException.assert(other !== null, "other name is null");
        IllegalArgumentException.assert(other !== undefined, "other name is undefined");

        const oldCount = this.getNoComponents(); 
        const otherCount = other.getNoComponents(); 

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i)); 
        }

        MethodFailedException.assert(this.getNoComponents() === oldCount + otherCount, "concat did not add all components");
    
        this.assertClassInvariant();
    }
}