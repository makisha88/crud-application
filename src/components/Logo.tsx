import React from "react"
import { useNavigate } from "react-router-dom"

const Logo: React.FC = () => {
    const navigate = useNavigate()
    return (
        <h1
            style={{
                display: "block",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#333",
                cursor: "pointer",
            }}
            onClick={() => navigate("/")}
        >
            C.R.U.D.
        </h1>
    )
}

export default Logo
