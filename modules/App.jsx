import React from "react"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <div>Riley Lahd: /</div>
		},
		{
			path: "/contact",
			element: <div>Riley Lahd: /contact</div>
		},
	])
	return (
		<div>
			<RouterProvider router={router}/>
		</div>
	)
}

export default App
