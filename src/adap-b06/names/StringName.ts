import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { N } from "vitest/dist/chunks/environment.d.cL3nLXbE.js";

export class StringName extends AbstractName {

    protected name: string;
    protected noComponents: number;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        
        IllegalArgumentException.assert(source !== null, "source is null");
        IllegalArgumentException.assert(source !== undefined, "source is undefined");

        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;

        this.assertClassInvariant();
    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(this.name !== null, "name is null");
        InvalidStateException.assert(this.name !== undefined, "name is undefined");
        InvalidStateException.assert(this.noComponents > 0, "noComponents must be positive");
        InvalidStateException.assert(this.delimiter.length > 0, "delimiter is empty");
    }

    public clone(): Name {

        // return new StringName(this.name, this.delimiter);
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
        
        const components = this.name.split(this.delimiter);
        return components[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const components = this.name.split(this.delimiter);
        components[i] = c;
        const newName = components.join(this.delimiter);
        
        // POSTCONDITION (Folie 20: Move to result object)
        const result = new StringName(newName, this.delimiter);
        MethodFailedException.assert(result.getComponent(i) === c, "component not set correctly");
        
        return result;
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i <= this.noComponents, "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        const newName = components.join(this.delimiter);
        
        // POSTCONDITION
        const result = new StringName(newName, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.noComponents + 1, "component not inserted");
        
        return result;
    }

    public append(c: string): Name {
        // PRECONDITIONS
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const newName = this.name + this.delimiter + c;
        
        // POSTCONDITION
        const result = new StringName(newName, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.noComponents + 1, "component not appended");
        
        return result;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.noComponents, "index out of bounds");

        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        const newName = components.join(this.delimiter);
        
        // POSTCONDITION
        const result = new StringName(newName, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.noComponents - 1, "component not removed");
        
        return result;
    }

    public concat(other: Name): Name {
        IllegalArgumentException.assert(other !== null, "other name is null");
        IllegalArgumentException.assert(other !== undefined, "other name is undefined");

        const newName = this.name + this.delimiter + other.asString(this.delimiter);
        
        // POSTCONDITION
        const result = new StringName(newName, this.delimiter);
        MethodFailedException.assert(
            result.getNoComponents() === this.noComponents + other.getNoComponents(),
            "concat failed"
        );
        
        return result;
    }

}