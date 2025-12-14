import { DEFAULT_DELIMITER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";


export class StringArrayName extends AbstractName {

    protected components: string[];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        
        IllegalArgumentException.assert(source !== null, "source is null");
        IllegalArgumentException.assert(source !== undefined, "source is undefined");

        this.components = source.slice();

        for (let i = 0; i < this.components.length; i++) {
            IllegalArgumentException.assert(this.components[i] !== null, "component is null");
            IllegalArgumentException.assert(this.components[i] !== undefined, "component is undefined");
        }
        
        this.assertClassInvariant();
    }

    protected assertClassInvariant(): void {
        InvalidStateException.assert(this.components !== null, "components array is null");
        InvalidStateException.assert(this.getNoComponents() >= 0, "noComponents is negative");
        InvalidStateException.assert(this.delimiter.length > 0, "delimiter is empty");
    }

    public clone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");

        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const newComponents = this.components.slice();
        newComponents[i] = c;
        
        const result = new StringArrayName(newComponents, this.delimiter);
        MethodFailedException.assert(result.getComponent(i) === c, "component not set correctly");
        
        return result;
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i <= this.getNoComponents(), "index out of bounds");
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const newComponents = this.components.slice();
        newComponents.splice(i, 0, c);
        
        const result = new StringArrayName(newComponents, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.getNoComponents() + 1, "component not inserted");
        
        return result;
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(c !== null, "component is null");
        IllegalArgumentException.assert(c !== undefined, "component is undefined");

        const newComponents = this.components.slice();
        newComponents.push(c);
        
        const result = new StringArrayName(newComponents, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.getNoComponents() + 1, "component not appended");
        
        return result;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0, "index is negative");
        IllegalArgumentException.assert(i < this.getNoComponents(), "index out of bounds");

        const newComponents = this.components.slice();
        newComponents.splice(i, 1);
        
        const result = new StringArrayName(newComponents, this.delimiter);
        MethodFailedException.assert(result.getNoComponents() === this.getNoComponents() - 1, "component not removed");
        
        return result;
    }

    public concat(other: Name): Name {
        IllegalArgumentException.assert(other !== null, "other name is null");
        IllegalArgumentException.assert(other !== undefined, "other name is undefined");

        const newComponents = this.components.slice();
        for (let i = 0; i < other.getNoComponents(); i++) {
            newComponents.push(other.getComponent(i));
        }
        
        const result = new StringArrayName(newComponents, this.delimiter);
        MethodFailedException.assert(
            result.getNoComponents() === this.getNoComponents() + other.getNoComponents(),
            "concat failed"
        );
        
        return result;
    }

}