import React, { useState } from "react"
import profile from "../public/img/profile.jpg"
import cinder from "../public/img/cinder.jpg"
import github from "../public/img/github.svg"
import linkedin from "../public/img/linkedin.png"
import envelope from "../public/img/mail.png"

const HomeView = () => {
	const [imgSrc, setImgSrc] = useState(profile)
	const toggleImgSrc = () => {
		setImgSrc((imgSrc === profile) ? cinder : profile)
	}

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
					gap: "3vw"
				}}
			>
				<div>
					<img id="profile_pic" src={imgSrc}/>
				</div>
				<div>
					<h1 id="main_title">RILEY LAHD</h1>
					<p className="subtitle" style={{ color: "#9d65ff" }}> &gt; Full-Stack Developer</p>
				</div>
			</div>
			<div>
				<h2 className="section-header">ABOUT</h2>
				<p className="blurb" style={{ borderColor: "#58d1eb" }}>
					{"Hello! I'm Riley, a Software Developer from Calgary, Alberta. I'm passionate about coding but my other hobbies include gaming (tabletop, video, and board games), scuba diving, movies, and more. I consider myself a fast-learner, detail oriented, and able to communicate and collaborate effectively with project managers and stakeholders."}
					<br/>
					<br/>
					I also have a cat named <span onClick={toggleImgSrc} style={{ cursor: "pointer" }}>Cinder!</span>
				</p>

			</div>
			<div>
				<h2 className="section-header">EDUCATION</h2>
				<p className="blurb" style={{ borderColor: "#98e024" }}>
					<b>Bachelor of Science in Computer Science - University of Calgary</b>
					<br/>
					<i>2012-2017</i>
					<br/>
					Undergraduate degree in computer science provided me basic proficiency in <b>Java, Bash, Python, Git</b>, and many other tools, but most importantly taught me <i>how</i> to learn effectively and stay up to date with ever-changing technologies.
					<br/>
					<br/>
					<b>Master of Information Security and Privacy - University of Calgary</b>
					<br/>
					<i>2023-Ongoing (Expected completion: August 2024)</i>
					<br/>
					This masters program has allowed me to expand my knowledge into the security space, giving me deeper knowledge on topics i was aware of, like cryptography and penetration testing, as well as introducing me to new tools and skills with hands on experience.
				</p>

			</div>
			<div>
				<h2 className="section-header">EXPERIENCE</h2>
				<p className="blurb" style={{ borderColor: "#fd971f" }}>
					<b>Shaw Communications / Rogers Communications</b>
					<br/>
					<i>Senior Software Developer [Jul 2019 - Feb 2024, 2 yrs 8 mos]</i>
					<br/>
					<i>Software Developer II [Apr 2019 - Jul 2021, 2 yrs 4 mos]</i>
					<br/>
					<i>Software Developer I [Jul 2017 - Apr 2019, 1 yr 10 mos]</i>
					<br/>
					This position allowed me to grow my skills massively after graduating from university. Working with <b>NodeJS, Docker, Go, React</b> and tons of other tools really taught me to build sustainable, scalable, highly available apps and tools. Worked on creating several internal APIs as well as inheriting and maintaining the Shaw Go Wifi tool, which I was lead developer of for several years, implementing significant new features and maintaining legacy code.
					<br/>
					<br/>
					<b>The Calgary Immigrant Educational Society</b>
					<br/>
					<i>IT Support Assistant [Jun 2016 - Aug 2016, 3 mos]</i>
					<br/>
					This summer contract allowed me to work independently as the primary IT contact for a staff of over 50 while the IT manager was on leave. Worked with the SQL database, MS Office, and diagnosed and repaired machines in the computer labs.
					<br/>
					<br/>
					<b>University of Calgary</b>
					<br/>
					<i>Reznet Tech Support [Sep 2013 - Jun 2014, 10 mos]</i>
					<br/>
					This student assistance role involved diagnosing issues with residence wifi, university tools, and other issues that students on campus reported.
				</p>

			</div>
			<div>
				<h2 className="section-header">PORTFOLIO</h2>
				<p className="blurb" style={{ borderColor: "#f4005f" }}>
					Many of my personal projects are available on my <a rel="noopener noreferrer" target="_blank" href="https://github.com/sircinnamon">GitHub</a>. Some of these highlights may be relevant:
					<br/>
					<br/>
					<a rel="noopener noreferrer" target="_blank" href="https://github.com/sircinnamon/SpellTemplates">Spell Templates PWA</a>
					<br/>
					This was an experiment in implementing a PWA (Progressive Web App), as well as a handy tool for tabletop games which occasionally require complex geometry to determing if an attack hits or misses.
					<br/>
					<br/>
					<a rel="noopener noreferrer" target="_blank" href="https://github.com/sircinnamon/runescape-text">Runescape Text</a>
					<br/>
					{"This project caused me to notice a bug in the popular Python image library \"Pillow\", which I was able to open a pull request for and fix, earning me the "}<b>Mars 2020 Contributor</b>{" badge as the library went on to be used in NASA's 2020 Mars Helicopter mission. This python script simply generates GIFs of moving text in the style of a specific video game."}
					<br/>
					<br/>
					<a rel="noopener noreferrer" target="_blank" href="https://sircinnamon.ca/ll/">Love Letter</a>
					<br/>
					{"During COVID it became harder to get together for board games with friends, so I took one of my group's favourites and created a browser-based version entirely in React and NodeJS!"}
				</p>
			</div>
			<div
				style={{
					borderTop: "1px solid #FFFFFF",
					marginTop: "2em",
					padding: "1em 5em"
				}}
			>
				<a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://github.com/sircinnamon"><img className="footer-icon" src={github}/></a>
				<a className="footer-link" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/riley-lahd/"><img className="footer-icon" src={linkedin}/></a>
				<a className="footer-link" rel="noopener noreferrer" target="_blank" href="mailto:rileylahd@gmail.com"><img className="footer-icon" src={envelope}/></a>
			</div>
		</div>
	)
}

export default HomeView
