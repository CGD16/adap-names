import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        IllegalArgumentException.assert(source !== null, "source is null");
        IllegalArgumentException.assert(source !== undefined, "source is undefined");

        if (delimiter) {
            IllegalArgumentException.assert(delimiter !== null, "delimiter is null");
            IllegalArgumentException.assert(delimiter.length > 0, "delimiter is empty");
            this.delimiter = delimiter;
        }
        this.name = source;
        this.noComponents = 1;
    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(
            this.name !== null,
            "name is null"
        );
        InvalidStateException.assert(
            this.name !== undefined,
            "name is undefined"
        );
        InvalidStateException.assert(
            this.noComponents >= 0,
            "noComponents is negative"
        );
        InvalidStateException.assert(
            this.delimiter.length > 0,
            "delimiter is empty"
        );
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        return this.name;
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.name.length; i++) {
            const char = this.name.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.noComponents, "index out of bounds");
        
        const newName = this.name

        MethodFailedException.assert(this.name !== null, "name is null");
        MethodFailedException.assert(this.name !== undefined, "name is undefined");

        return newName;


    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");

        this.name = c;
        MethodFailedException.assert(this.name === c, "component not set correctly");
        this.assertClassInvariant();
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i <= this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");
        
        const oldCount = this.noComponents;

        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;

        MethodFailedException.assert(this.noComponents === oldCount + 1, "component not inserted correctly");

        this.assertClassInvariant();
    }

    public append(c: string) {
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");
        IllegalArgumentException.assert(c.length > 0, "component is empty");

        const oldCount = this.noComponents;
        this.name += this.delimiter + c;
        this.noComponents += 1;

        MethodFailedException.assert(this.noComponents === oldCount + 1, "component not appended correctly");

        this.assertClassInvariant();
    }

    public remove(i: number) {
         IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(this.noComponents > 0, "cannot remove from empty name");

        const oldCount = this.noComponents;

        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        
        this.noComponents -= 1;

        MethodFailedException.assert(this.noComponents === oldCount - 1, "component not removed correctly");

        this.assertClassInvariant();
    }

    public concat(other: Name): void {
        IllegalArgumentException.assert(other !== null, "other name is null");
        IllegalArgumentException.assert(other !== undefined, "other name is undefined");

        const oldCount = this.noComponents; 
        const otherCount = other.getNoComponents();

        this.name += this.delimiter + other.asString();
        this.noComponents += otherCount;

        MethodFailedException.assert(
            this.noComponents === oldCount + otherCount,
            "noComponents not increased correctly"
        );
        
        this.assertClassInvariant();
    }

}