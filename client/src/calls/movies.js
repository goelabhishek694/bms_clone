const {axiosInstance} = require("./index")

//add Movie
export const addMovie = async(value) => {
    try{
        const response = await axiosInstance.post("/api/movies/", value);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//get all movies
export const getAllMovies = async() => {
    try{
        const response = await axiosInstance.get("/api/movies/");
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//update a movie
export const updateMovie = async(id, values) => {
    try{
        const response = await axiosInstance.put(`/api/movies/${id}`, values);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//delete a movie
export const deleteMovie = async(id) => {
    try{
        const response = await axiosInstance.delete(`/api/movies/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}

//fetch a movie by id
export const movieById = async(id) => {
    try{
        const response = await axiosInstance.get(`/api/movies/${id}`);
        return response.data
    }catch(err){
        console.error(err);
        return err;
    }
}