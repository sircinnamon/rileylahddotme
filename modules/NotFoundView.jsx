import React from "react"
import favicon from "../public/img/android-chrome-192x192.png"

const NotFoundView = () => {
	return (
		<div
			style={{
				margin: "10vh auto",
				padding: "1em",
				display: "flex",
				flexDirection: "row",
				gap: "1em",
				alignItems: "center",
				justifyContent: "center"
			}}
			className="montserrat-font"
		>
			<img src={favicon} height="60px" width="60px" />
			<h1>404: Not Found</h1>
		</div>
	)
}

export default NotFoundView
