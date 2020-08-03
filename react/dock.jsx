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
			height: this.props.height || "60px",
			zIndex: -1
		};
		let frameStyle = {
			margin: "auto",
			height: "100%",
			minWidth: "200px",
			width: "fit-content",
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
			paddingBottom: this.props.isOpen ? "0px" : "5px",
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
				<div
					style={{
						backgroundColor: this.props.isOpen ? "white" : "",
						opacity: "0.7",
						height: "10px",
						width: "10px",
						margin: "auto",
						borderRadius: "10px",
						position: "relative",
						top: "45px"
					}}
				/>
				<div style={{ margin: "auto", marginTop: "-10px" }}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
Dock.propTypes = {
}
