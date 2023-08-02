export interface IImage {
    id: string; // Unsplash идентификатор изображения
    urls: {
        regular: string; // URL изображения среднего размера
        small: string; // URL изображения маленького размера
    };
    user: {
        name: string; // Имя автора изображения
    };
    description: string | null; // Описание изображения (может быть null)
}

export interface ServerResponse<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}
