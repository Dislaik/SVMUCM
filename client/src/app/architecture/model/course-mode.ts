export class CourseMode {
    id: number;
    name: string;
    label: string;
    created_at: Date;

    constructor(
        name: string = '',
        label: string = '',
        created_at: Date = new Date()
    ) {
        this.name = name;
        this.label = label;
        this.created_at = created_at;
    }
}
