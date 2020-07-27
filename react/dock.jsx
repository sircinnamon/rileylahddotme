/* global React */
/* exported Dock */
class Dock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let containerStyle = {
			position: "fixed",
			bottom: 0,
			width: "100%",
			height: this.props.height || "60px"
		};
		let frameStyle = {
			margin: "auto",
			width: "30vw",
			height: "100%",
			minWidth: "200px",
			maxWidth: "500px",
			background: "rgba(20, 20, 20, 0.5)",
			display: "flex",
			justifyContent: "space-evenly"
		};
		return (
			<div style={containerStyle}>
				<div style={frameStyle}>{this.props.children}</div>
			</div>
		);
	}
}

class DockButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		};
	}

	render() {
		let buttonStyle = {
			height: "100%",
			padding: "5px",
			display: "inline-block"
		};
		if (this.state.isHovered) {
			buttonStyle.background = "rgba(255, 255, 255, 0.1)";
		}
		return (
			<div
				style={buttonStyle}
				onMouseEnter={() => {
					this.setState({ isHovered: true });
				}}
				onMouseLeave={() => {
					this.setState({ isHovered: false });
				}}
				onClick={this.props.onClick}
			>
				<div style={{ margin: "auto" }}>{this.props.children}</div>
			</div>
		);
	}
}

Dock.propTypes = {
}
