// tslint:disable:variable-name
export class Book {
    title?: string;
    notes?: string;
    number_of_pages?: number;
    cover?: {
        small?: string;
        large?: string;
        medium?: string;
    };
    authors?: [{name?: string}];
    publish_date?: string;
    url?: string;
}
