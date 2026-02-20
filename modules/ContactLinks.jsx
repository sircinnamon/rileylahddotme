import React from "react"
import {
	LinkedinLogoIcon,
	GithubLogoIcon,
	EnvelopeIcon,
	LineVerticalIcon,
} from "@phosphor-icons/react"
const ContactLinks = () => {
	return (
		<div
			style={{
				borderTop: "1px solid #FFFFFF",
				marginTop: "2em",
				padding: "1em 5em",
				display: "flex",
				fontSize: "2em",
				gap: "1em",
				alignItems: "spaceBetween",
				justifyContent: "center"
			}}
		>
			<a className="footer-link" rel="noopener noreferrer" target="_blank" title="Github Link" href="https://github.com/sircinnamon"><GithubLogoIcon weight="fill" color="white" /></a>
			<LineVerticalIcon />
			<a className="footer-link" rel="noopener noreferrer" target="_blank" title="LinkedIn Link" href="https://www.linkedin.com/in/riley-lahd/"><LinkedinLogoIcon weight="fill" color="white" /></a>
			<LineVerticalIcon />
			<a className="footer-link" rel="noopener noreferrer" target="_blank" title="Email Link" href="mailto:rileylahd@gmail.com"><EnvelopeIcon weight="fill" color="white" /></a>
		</div>
	)
}

export default ContactLinks