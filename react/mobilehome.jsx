/* global React */
/* exported MobileHome */
class MobileHome extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		let containerStyle = {
			flex: "1 1 auto",
			display: "grid",
			width: "100%",
			background: "rgba(0,0,0,0.2)",
			gridTemplateRows: "10px auto auto auto auto auto auto auto 10px",
			gridTemplateColumns: "10px auto auto auto auto auto 10px"
		}
		let icons = []
		let iconDivStyle = {
			display: "flex",
			alignItems: "center"
		}
		let imgStyle = {
			objectFit: "contain",
			margin: "auto",
			display: "block",
			userSelect: "none",
			width: "70%"
		}
		for (let i = 0; i < 30; i++) {
			let gridX = i%5 + 2
			let gridY = Math.floor(i/5) + 2
			icons = icons.concat([(
				<div style={{...iconDivStyle, gridColumnStart: gridX, gridRowStart: gridY}}>
					<img style={imgStyle} src={"/img/terminalicon.svg"} draggable="false" />
				</div>
			)])
		}
		return (
			<div style={containerStyle}>
				{icons}
			</div>
		)
	}
}