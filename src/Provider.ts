export default abstract class Provider {
    protected constructor(public readonly name: string) {
        if (!this.name) {
            throw new Error(`Given provider name '${this.name}' is not valid`);
        }
    }
}
