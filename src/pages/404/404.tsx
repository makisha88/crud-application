import { Button } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../../components/Logo"

const Page404: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <Logo />
            <h1>Page not found</h1>
            <Button onClick={() => navigate("/")}>Return to home page</Button>
        </>
    )
}

export default Page404
