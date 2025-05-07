const {axiosInstance} = require("./index")

//add Show
export const addShow = async(value) => {
    try{
        const response = await axiosInstance.post("/api/shows/", value);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//update a show
export const updateShow = async(id, values) => {
    try{
        const response = await axiosInstance.put(`/api/shows/${id}`, values);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//delete a show
export const deleteShow = async(id) => {
    try{
        const response = await axiosInstance.delete(`/api/shows/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}


//get all shows by theatre
export const getAllShowsByTheatre = async(value) => {
    try{
        const response = await axiosInstance.post(`/api/shows/get-all-shows-by-theatre`, value);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//get all shows by theatre
export const getAllTheatresByMovie = async(value) => {
    try{
        const response = await axiosInstance.post(`/api/shows/get-all-theatres-by-movie`, value);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//get shows by id
export const getShowById = async(id) => {
    try{
        const response = await axiosInstance.get(`/api/shows/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

