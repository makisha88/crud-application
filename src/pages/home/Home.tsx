import React, { useEffect, useState } from "react"
import { Button, Grid, Typography } from "@mui/material"
import Logo from "../../components/Logo"
import { useNavigate } from "react-router-dom"
import PostService from "../../services/PostServices"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Container from "@mui/material/Container"
import type { Post } from "../../types/index"

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [posts, setPosts] = useState<Post[]>([])
    const postsPerPage = 15

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await PostService.fetchPosts(currentPage)
                currentPage === 1 ? setPosts(data) : setPosts(prevPosts => [...prevPosts, ...data])
                data?.length < postsPerPage && setDisabled(true)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPosts()
    }, [currentPage])

    const handleShowMorePosts = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    return (
        <Container maxWidth="lg">
            <Logo />
            <div style={{ textAlign: "right", paddingBottom: "20px" }}>
                <Button variant="contained" color="primary" onClick={() => navigate(`/create`)}>
                    Create
                </Button>
            </div>
            <Grid container spacing={3}>
                {posts.map(post => (
                    <Grid key={post.id} item xs={12} md={4}>
                        <CardActionArea onClick={() => navigate(`/details/${post.id}`)}>
                            <Card sx={{ display: "flex" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="h2" variant="h5">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        {post.body}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        Continue reading...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
            <div style={{ textAlign: "right", padding: "20px 0" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowMorePosts}
                    disabled={disabled}
                >
                    Show More
                </Button>
            </div>
        </Container>
    )
}

export default HomePage
