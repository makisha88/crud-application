import React, { useState, useEffect } from "react"
import { TextField, Button, Box } from "@mui/material"

interface PostFormProps {
    initialPost?: { title: string; body: string }
    onSubmit: (post: { title: string; body: string }) => void
}

const PostForm: React.FC<PostFormProps> = ({ initialPost, onSubmit }) => {
    const [post, setPost] = useState<{ title: string; body: string }>({ title: "", body: "" })

    useEffect(() => {
        if (initialPost) {
            setPost(initialPost)
        }
    }, [initialPost])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(post)
        setPost({ title: "", body: "" })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2} width={300}>
                <TextField
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={post.title}
                    onChange={handleChange}
                    required={true}
                />
                <TextField
                    name="body"
                    label="Body"
                    variant="outlined"
                    value={post.body}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required={true}
                />
                <Button type="submit" variant="contained" color="primary">
                    {initialPost ? "Update Post" : "Create Post"}
                </Button>
            </Box>
        </form>
    )
}

export default PostForm
