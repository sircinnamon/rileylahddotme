/* global React */
/* exported Dock */
class Dock extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}

	}

	render() {
		let containerStyle = {
			position: "fixed",
			bottom: 0,
			width: "100%"
		}
		let frameStyle = {
			margin: "auto",
			width: "30vw",
			height: "100%",
			minWidth: "200px",
			maxWidth: "500px",
			background: "rgba(20, 20, 20, 0.5)"
		}
		return (
			<div style={containerStyle}>
				<div style={frameStyle}>
					Placeholder
					<div style={{height: "60px"}} />
				</div>
			</div>
		)
	}
}

Dock.propTypes = {
}
