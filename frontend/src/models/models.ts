export interface IImage {
    id: number;
    imageUrl: string;
    author: string;
    description: string;
}

export interface ServerResponse<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}
