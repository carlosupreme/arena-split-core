export type DomainErrorPrimitives = {
    title: string;
    detail: string;
    solutions: string[];
}
export class DomainError {
    public title: string;
    public detail: string;
    public solutions: string[];

    constructor({title, detail, solutions}: DomainErrorPrimitives) {
        this.title = title;
        this.detail = detail;
        this.solutions = solutions;
    }

}