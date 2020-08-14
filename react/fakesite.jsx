/* global React, TITLE_FONT */
/* exported FakeSite */
class FakeSite extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let icon_style = {
			height: "1em",
			filter: "invert(1)",
			userSelect: "none"
		}
		return (
			<div style={{
				height: "300px", 
				width: "600px", 
				backgroundImage: "url(/img/fakesitebg.svg)",
				backgroundSize: "cover"
			}}>
				<div
					style={{
						display: "flex",
						height: "100%",
						flexDirection: "column",
						justifyContent: "center"
					}}
				>
					<div
						style={{
							margin: "0px auto",
							fontSize: "30px",
							fontWeight: "bold",
							color: "white",
							letterSpacing: ".5em",
							paddingLeft: ".5em",
							userSelect: "none",
							...TITLE_FONT
						}}
					>
						RILEY LAHD
					</div>
					<div
						style={{
							margin: "0px auto",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
							minWidth: "50%"
						}}
					>
						<a target="_blank" rel="noopener noreferrer" href="https://github.com/sircinnamon" style={{}}>
							<img src="/img/icons/github.svg" style={icon_style} />
						</a>
						<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/riley-lahd/" style={{}}>
							<img src="/img/icons/linkedin.svg" style={icon_style} />
						</a>
						<a target="_blank" rel="noopener noreferrer" href="https://codepen.io/sircinnamon" style={{}}>
							<img src="/img/icons/codepen.svg" style={icon_style} />
						</a>
						<a target="_blank" rel="noopener noreferrer" href="mailto:rileylahd@gmail.com" style={{}}>
							<img src="/img/icons/gmail.svg" style={icon_style} />
						</a>
						<a target="_blank" rel="noopener noreferrer" href="https://keybase.io/sircinnamon" style={{}}>
							<img src="/img/icons/keybase.svg" style={icon_style} />
						</a>
					</div>
				</div>
			</div>
		)
	}
}