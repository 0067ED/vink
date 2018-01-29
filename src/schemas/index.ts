export interface Node {
    type: String;
    content: Node[];
    attrs: any;
    marks: Mark[];
}

export interface Mark {
    type: String;
    attrs: any;
}

export interface Schema {

}