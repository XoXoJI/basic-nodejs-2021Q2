import Model from '../../lib/model';
import Column from '../columns/column.model';


export default class Board extends Model {
    title: string;

    columns: Column[];

    constructor({
        id = undefined,
        title = 'title',
        columns = []
    }) {
        super({ id });

        this.title = title;
        this.columns = columns.map((column) => new Column(column));
    }
}
