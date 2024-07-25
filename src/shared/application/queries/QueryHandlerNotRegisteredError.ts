import {Query} from "./Query";

export class QueryHandlerNotRegisteredError extends Error {
    constructor(query: Query) {
        super(`The query <${query.constructor.name}> hasn't a query handler associated`);
    }
}
