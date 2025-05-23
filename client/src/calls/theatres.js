const {axiosInstance} = require("./index")

//add theatre
export const addTheatre = async(value) => {
    try{
        const response = await axiosInstance.post("/api/theatres/", value);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//update theatre
export const updateTheatre = async(id, values) => {
    try{
        const response = await axiosInstance.put(`/api/theatres/${id}`, values);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//delete a movie
export const deleteTheatre = async(id) => {
    try{
        const response = await axiosInstance.delete(`/api/theatres/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//get all theatres
export const getAllTheatres = async() => {
    try{
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//get all theatres of a specific owner
export const getAllTheatresPartnerOwns = async() => {
    try{
        const response = await axiosInstance.get("/api/theatres/get-all-theatres-by-owner");
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}