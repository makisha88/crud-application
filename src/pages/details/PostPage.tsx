import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Paper, Typography, CircularProgress } from "@mui/material"
import Logo from "../../components/Logo"
import { useNotification } from "../../context/NotificationContext"
import PostService from "../../services/PostServices"
import Container from "@mui/material/Container"
import type { Post } from "../../types/index"

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { postId } = useParams<{ postId: string }>()
    const navigate = useNavigate()
    const { setNotification } = useNotification()
    useEffect(() => {
        const fetchPost = async (postId: string) => {
            setIsLoading(true)
            try {
                const data = await PostService.fetchPost(postId)
                setPost(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }
        if (postId) {
            fetchPost(postId)
        }
    }, [postId])

    const deletePost = async () => {
        if (!postId) return
        try {
            await PostService.deletePost(String(postId))
            setNotification({ message: "Post deleted successfully!", type: "success" })
            navigate("/")
        } catch (error) {
            console.error(error)
            setNotification({ message: "Error deleting the post!", type: "error" })
        }
    }

    return (
        <Container maxWidth="lg">
            <Logo />
            <div>
                <Button onClick={() => navigate(`/edit/${postId}`)}>Update post</Button>
                <Button onClick={deletePost}>Delete post</Button>
            </div>
            {isLoading ? (
                <CircularProgress />
            ) : post ? (
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5">{post.title}</Typography>
                    <Typography variant="body1">{post.body}</Typography>
                </Paper>
            ) : (
                <Typography variant="body1">Post not found.</Typography>
            )}
        </Container>
    )
}

export default PostPage
