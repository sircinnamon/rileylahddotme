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
				alignItems: "center",
				maxWidth: "900px",
				margin: "auto"
			}}
			className="montserrat-font"
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
					<h1 id="main_title">RILEY LAHD</h1>
					<p className="blurb" style={{borderColor: "#58d1eb"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
				</div>
			</div>
			<div>
				<h2 className="section-header">ABOUT</h2>
				<p className="blurb" style={{borderColor: "#f4005f"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

			</div>
			<div>
				<h2 className="section-header">EDUCATION</h2>
				<p className="blurb" style={{borderColor: "#98e024"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

			</div>
			<div>
				<h2 className="section-header">EXPERIENCE</h2>
				<p className="blurb" style={{borderColor: "#fd971f"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

			</div>
			<div>
				<h2 className="section-header">PORTFOLIO</h2>
				<p className="blurb" style={{borderColor: "#f4005f"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

			</div>
		</div>
	)
}

export default HomeView
