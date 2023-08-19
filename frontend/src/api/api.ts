import instance from "../axios";

export const postOrder = async (data: any) => {
    try {
        const response = await instance.post('api/orders', { data });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getSchedule = async () => {
    try {
        const response = await instance.get('api/schedules');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getPictures = async () => {
    try {
        const response = await instance.get('api/pictures/?populate=*');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};