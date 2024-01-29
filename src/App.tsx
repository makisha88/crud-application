import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotificationProvider } from "./context/NotificationContext"
import Home from "./pages/home/Home"
import PostPage from "./pages/details/PostPage"
import EditPage from "./pages/edit/EditPage"
import CreatePage from "./pages/create/CreatePage"
import Page404 from "./pages/404/404"
import Notification from "./components/Notification"

function App() {
    return (
        <NotificationProvider>
            <Router>
                <Routes>
                    <Route index Component={Home} />
                    <Route path="/details/:postId" Component={PostPage} />
                    <Route path="/create" Component={CreatePage} />
                    <Route path="/edit/:postId" Component={EditPage} />
                    <Route path="*" Component={Page404} />
                </Routes>
            </Router>
            <Notification />
        </NotificationProvider>
    )
}

export default App
