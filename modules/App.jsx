import React from "react"
import {
	createBrowserRouter,
	RouterProvider
} from "react-router-dom"
import HomeView from "./HomeView"

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomeView />
		},
		{
			path: "/contact",
			element: <div>Riley Lahd: /contact</div>
		}
	])
	return (
		<div>
			<RouterProvider router={router}/>
		</div>
	)
}

export default App
