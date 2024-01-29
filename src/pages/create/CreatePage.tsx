import React, { useState } from "react"
import { useNotification } from "../../context/NotificationContext"
import Logo from "../../components/Logo"
import Form from "../../components/Form"
import { useNavigate } from "react-router-dom"
import PostService from "../../services/PostServices"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Box from "@mui/material/Box"
import { Typography, CircularProgress } from "@mui/material"

const CreatePage: React.FC = () => {
    const { setNotification } = useNotification()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreate = async (postData: { title: string; body: string }) => {
        setIsLoading(true)
        try {
            await PostService.createPost(postData)
            setNotification({ message: "Post has successfylu created!", type: "success" })
            navigate("/")
        } catch (error) {
            setNotification({
                message: "There are some technical difficulties, the post has not been created.",
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
                    <AddCircleOutlineIcon />
                </Avatar>
                <Typography component="h1" variant="h5" marginBottom={4} marginTop={1}>
                    Create post
                </Typography>
                {isLoading ? <CircularProgress /> : <Form onSubmit={handleCreate} />}
            </Box>
        </Container>
    )
}

export default CreatePage
