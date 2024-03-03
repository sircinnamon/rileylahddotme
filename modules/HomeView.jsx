import React from "react"
import profile from "../public/img/profile.jpg"

const HomeView = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "1em",
				paddingTop: "3em",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					padding: "1em",
					justifyContent: "center",
					alignItems: "center",
					gap: "3em"
				}}
			>
				<div>
					<img id="profile_pic" src={profile}/>
				</div>
				<div>
					<h1 id="main_title">Riley Lahd</h1>
				</div>
			</div>
			<h1>A</h1>
			<h1>B</h1>
			<h1>C</h1>
		</div>
	)
}

export default HomeView
