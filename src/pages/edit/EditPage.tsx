import React, { useState, useEffect } from "react"
import Logo from "../../components/Logo"
import Form from "../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import { useNotification } from "../../context/NotificationContext"
import PostService from "../../services/PostServices"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import EditNoteIcon from "@mui/icons-material/EditNote"
import Box from "@mui/material/Box"
import { Typography, CircularProgress } from "@mui/material"

const EditPage: React.FC = () => {
    const [post, setPost] = useState<{ title: string; body: string } | undefined>(undefined)
    const { postId } = useParams<{ postId: string }>()
    const { setNotification } = useNotification()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true)
            try {
                const data = await PostService.fetchPost(String(postId))
                setPost(data)
            } catch (error) {
                console.error(error)
                setNotification({ message: "Error fetching the post", type: "error" })
            } finally {
                setIsLoading(false)
            }
        }

        if (postId) {
            fetchPost()
        }
    }, [postId])

    const handleUpdate = async (postData: { title: string; body: string }) => {
        setIsLoading(true)
        try {
            await PostService.updatePost(String(postId), postData)
            setNotification({ message: "Post has successfully been updated!", type: "success" })
            navigate("/")
        } catch (error) {
            console.error(error)
            setNotification({
                message: "There are some technical difficulties, the post has not been updated.",
                type: "error",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Logo />
                <Avatar sx={{ m: 1, bgcolor: "#ea5151" }}>
                    <EditNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5" marginBottom={4} marginTop={1}>
                    Edit post
                </Typography>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Form initialPost={post} onSubmit={handleUpdate} />
                )}
            </Box>
        </Container>
    )
}

export default EditPage
