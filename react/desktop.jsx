/* global React */
/* exported Desktop, DesktopShortcut */
class Desktop extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedShortcut: undefined
		}
	}

	render() {
		let containerStyle = {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
			userSelect: "none",
			pointerEvents: "none"
		}
		let shortcutContainerStyle = {
			marginTop: "15px",
			marginLeft: "15px",
			zIndex: 2,
			display: "inline-block",
			pointerEvents: "all",
			position: "relative"
		}
		let wallpaperStyle = {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: -5,
			overflow: "hidden",
			pointerEvents: "all"
		}
		let wallpaperImgStyle = {
			height: "100%",
			width: "100%",
			overflow: "hidden",
			objectFit: "cover"
		}
		let wpUrl =
			this.props.wallpaper ||
			"/img/wallpaper.svg"
		return (
			<div style={containerStyle}>
				<div style={shortcutContainerStyle}>{this.props.children}</div>
				<div style={wallpaperStyle} onClick={this.props.clearSelected}>
					<img style={wallpaperImgStyle} src={wpUrl} />
				</div>
			</div>
		)
	}
}

Desktop.propTypes = {
	wallpaper: window.PropTypes.string,
	children: window.PropTypes.node,
	clearSelected: window.PropTypes.func
}

Desktop.defaultProps = {
	wallpaper: "/img/wallpaper.svg"
}

class DesktopShortcut extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isHovered: false
		}
	}

	render() {
		let containerStyle = {
			padding: "5px"
		}
		let imgStyle = {
			maxWidth: "60px",
			maxHeight: "60px",
			height: "60px",
			width: "60px",
			objectFit: "contain",
			margin: "auto",
			display: "block",
			userSelect: "none"
		}
		let nameStyle = {
			color: "rgb(200,200,200)",
			background: "rgba(10,10,10,0.5)",
			padding: "4px 12px",
			display: "inline-block",
			marginTop: "4px",
			userSelect: "none"
		}
		if (this.state.isHovered) {
			containerStyle.border = "1px solid rgba(100, 126, 140, 0.9)"
			containerStyle.background = "rgba(100, 126, 140, 0.3)"
			containerStyle.padding = "4px"
		}
		if (this.props.isSelected) {
			containerStyle.border = "1px solid rgba(166, 203, 255, 0.9)"
			containerStyle.background = "rgba(166, 224, 255, 0.3)"
			containerStyle.padding = "4px"
		}
		return (
			<div
				style={containerStyle}
				onMouseEnter={() => {
					this.setState({ isHovered: true })
				}}
				onMouseLeave={() => {
					this.setState({ isHovered: false })
				}}
				onClick={() => {
					this.props.setSelected()
				}}
				onDoubleClick={this.props.onDoubleClick}
				onTouchStart={this.props.onDoubleClick}
			>
				<div>
					<img style={imgStyle} src={this.props.imgUrl} draggable="false" />
				</div>
				<div style={{ textAlign: "center" }}>
					<span style={nameStyle}>{this.props.name}</span>
				</div>
			</div>
		)
	}
}

DesktopShortcut.propTypes = {
	isSelected: window.PropTypes.bool,
	setSelected: window.PropTypes.func,
	onDoubleClick: window.PropTypes.func,
	imgUrl: window.PropTypes.string,
	name: window.PropTypes.string
}