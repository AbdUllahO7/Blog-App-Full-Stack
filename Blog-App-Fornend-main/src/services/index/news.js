import axios from "axios";



export const createNewNews = async ({token}) => {

    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/news` ,{}, config);
        console.log("data", data)
        return data;

    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }


}


export const getAllNews = async (searchKeyword = "", page = 1, limit = 6  ) => {
    try {
        const { data, headers } = await axios.get(
        `/api/news?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        );
        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};



export const getSingleNews = async ({slug}) => {
    try {
        const { data } = await axios.get(`/api/news/${slug}`) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}


export const deleteNews = async ({slug , token}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`/api/news/${slug}` , config) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}



export const updateNews = async ({updatedData,slug , token}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`/api/news/${slug}` , updatedData , config) ;
        return data 
    } catch (error) {
        if(error.response && error.response.data.message)  throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}