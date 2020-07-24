class Window extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let windowStyle = {
			display: "inline-block",
			minWidth: "40px",
			minHeight: "20px",
			position: "absolute",
			top: Math.max(this.props.topPos, 0) || 0,
			left: Math.max(this.props.leftPos, 0) || 0,
			zIndex: this.props.layer + 100,
		};
		let headerStyle = {
			width: "100%",
			backgroundColor: "rgba(0,0,0,0.9)",
			userSelect: "none",
			color: "rgb(75,75,75)"
		};
		if (this.props.isHeld) {
			headerStyle.backgroundColor = "rgba(255,0,0,0.7)";
		}
		let closeButtonStyle = {
			height: "10px",
			width: "10px",
			float: "right",
			padding: 0,
			fontSize: "5px",
			margin: "2px",
			borderRadius: "10px",
			background: "rgba(200, 30, 30, 0.5)"
		};
		return (
			<div style={windowStyle} onMouseDown={this.props.makeActive}>
				<div style={headerStyle} onMouseDown={this.props.grabWindow}>
					{this.props.title}
					<div style={closeButtonStyle} onMouseDown={this.props.close} />
				</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}
