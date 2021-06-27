export interface boardDTO {
    id: string;
    title: string;
    columns: {
        id: string
        title: string
        order: number
    }[]
}
