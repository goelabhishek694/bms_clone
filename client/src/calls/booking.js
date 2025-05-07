const {axiosInstance} = require("./index")

export const makePayment = async(values) => {
    try{
        const response = await axiosInstance.post(`/api/bookings/make-payment`, values);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

export const bookShow = async(values) => {
    try{
        const response = await axiosInstance.post(`/api/bookings/book-show`, values);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

export const getAllBookings = async() => {
    try{
        const response = await axiosInstance.get(`/api/bookings/all-bookings`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}