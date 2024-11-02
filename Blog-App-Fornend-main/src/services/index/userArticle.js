import axios from "axios";



export const createNewUserArticle = async ({token}) => {

    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/userArticle` ,{}, config);
        console.log("data", data)
        return data;

    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }


}


export const getAllUserArticle= async (searchKeyword = "", page = 1, limit = 6  ) => {
    try {
        const { data, headers } = await axios.get(
        `/api/userArticle?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        );

        console.log(data);


        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};



export const getSingleUserArticle = async ({slug}) => {
    try {
        const { data } = await axios.get(`/api/userArticle/${slug}`) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}


export const deleteUserArticle = async ({slug , token}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`/api/userArticle/${slug}` , config) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}



export const updateUserArticle = async ({updatedData,slug , token}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`/api/userArticle/${slug}` , updatedData , config) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}