export interface IImage {
    id: number;
    attributes: {
        picture_id: string;
        title: string;
        description: string;
        image: {
            data: Array<{
                id: number;
                attributes: {
                    name: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                    formats: {
                        thumbnail: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: string | null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: string | null;
                    provider: string;
                    provider_metadata: unknown | null;
                    createdAt: string;
                    updatedAt: string;
                };
            }>;
        };
        order: {
            data: unknown | null;
        };
        author: {
            data: {
                id: number;
                attributes: {
                    author_id: number;
                    full_name: string;
                    age: number;
                }
            };
        };
    };
}

export interface ISchedule {
    id: number;
    attributes: {
        time: string;
        day: string;
        header: string;
        number_of_children: number;
    };
}

export interface ServerResponse<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}
