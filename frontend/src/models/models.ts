interface IImageFormat {
    width: number;
    height: number;
    url: string;
}

export interface IImage {
    id: number;
    picture_id: string;
    title: string;
    description: string;
    image: {
        width: number;
        height: number;
        formats: {
            thumbnail: IImageFormat;
            small?: IImageFormat;
            medium?: IImageFormat;
            large?: IImageFormat;
        };
        url: string;
    };
    order: unknown | null;
    author: {
        id: number;
        author_id: number;
        full_name: string;
        age: number;
    };
}

export interface ISchedule {
    id: number;
    time: string;
    day: string;
    header: string;
    number_of_children: number;
}

export interface IForm {
    first_name: string,
    last_name: string,
    middle_name: string,
    phone_number: string,
    email: string,
    region: string,
    city: string,
    street_house_apps: string,
    index: string,
    delivery_method: string,
}

export interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    image: IImage | null;
}

export interface ServerResponse<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}
