import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/posts"

export const PostService = {
    fetchPosts: async (page: number = 1, limit: number = 15) => {
        try {
            const response = await axios.get(`${API_URL}`, {
                params: { _limit: limit, _page: page },
            })
            return response.data
        } catch (error) {
            throw error
        }
    },

    fetchPost: async (postId: string) => {
        try {
            const response = await axios.get(`${API_URL}/${postId}`)
            return response.data
        } catch (error) {
            throw error
        }
    },

    createPost: async (postData: { title: string; body: string }) => {
        try {
            const response = await axios.post(API_URL, postData)
            return response.data
        } catch (error) {
            throw error
        }
    },

    updatePost: async (postId: string, updateData: { title: string; body: string }) => {
        try {
            const response = await axios.put(`${API_URL}/${postId}`, updateData)
            return response.data
        } catch (error) {
            throw error
        }
    },

    deletePost: async (postId: string) => {
        try {
            await axios.delete(`${API_URL}/${postId}`)
        } catch (error) {
            throw error
        }
    },
}

export default PostService
