/* global React, SANS_FONT */
/* exported BaseApp */
class BaseApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		// console.log(window.innerHeight, window.innerWidth)
		let windowStyle = {
			display: this.props.isHidden ? "none" : "",
			background: "white", flex: "1 1 auto"
		}
		return (
			<div
				style={windowStyle}
			>
				{this.props.children}
			</div>
		)
	}
}

BaseApp.propTypes = {
	children: window.PropTypes.node,
	isHidden: window.PropTypes.bool
}

class BrowserApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUrl: this.props.startUrl,
			history: [this.props.startUrl]
		}
	}

	render() {
		return (
			<BaseApp
				isHidden={this.props.isHidden}
			>
				<BrowserAppHeader
					currentUrl={this.state.currentUrl}
					updateUrl={(v) => {
						this.setState({ currentUrl: v })
					}}
				/>
				{this.props.children}
			</BaseApp>
		)
	}
}

BrowserApp.propTypes = {
	children: window.PropTypes.node,
	isHidden: window.PropTypes.bool,
	startUrl: window.PropTypes.string
}

class BrowserAppHeader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			backArrowHovered: false,
			forwardArrowHovered: false,
			refreshArrowHovered: false,
			homeArrowHovered: false
		}
	}

	render() {
		let containerStyle = {
			backgroundColor: "#eee",
			display: "flex"
		}
		let headerBtnStyle = {
			transition: "background-color 0.75s",
			display: "inline-block",
			borderRadius: "50%",
			cursor: "pointer",
			width: "20px",
			height: "20px",
			padding: "2px",
			marginRight: "2px",
			color: "#666"
		}
		let backArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.backArrowHovered ? "#ccc" : "",
			padding: "1px 2px 3px 2px"
		}
		let forwardArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.forwardArrowHovered ? "#ccc" : "",
			padding: "1px 2px 3px 2px"
		}
		let refreshStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.refreshArrowHovered ? "#ccc" : "",
			fontSize: "19px",
			padding: "2px 1px 2px 3px",
			lineHeight: "19px"
		}
		let homeStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.homeArrowHovered ? "#ccc" : "",
			fontSize: "23px",
			padding: "0px 0px 4px 4px",
			lineHeight: "23px"
		}
		let urlBarDivStyle = {
			display: "block",
			background: "#ccc",
			height: "20px",
			flex: "1 1 10%",
			borderRadius: "10px",
			paddingLeft: "20px",
			marginTop: "2px",
			marginRight: "3px"
		}
		let urlBarStyle = {
			background: "none",
			border: "none",
			width: "90%",
			outline: "none",
			...SANS_FONT
		}
		return (
			<div style={containerStyle}>
				<div
					style={backArrowStyle}
					onMouseEnter={() => {
						this.setState({ backArrowHovered: true })
					}}
					onMouseLeave={() => {
						this.setState({ backArrowHovered: false })
					}}
				>
					{"🡠"}
				</div>
				<div
					style={forwardArrowStyle}
					onMouseEnter={() => {
						this.setState({ forwardArrowHovered: true })
					}}
					onMouseLeave={() => {
						this.setState({ forwardArrowHovered: false })
					}}
				>
					{"🡢"}
				</div>
				<div
					style={refreshStyle}
					onMouseEnter={() => {
						this.setState({ refreshArrowHovered: true })
					}}
					onMouseLeave={() => {
						this.setState({ refreshArrowHovered: false })
					}}
				>
					{"↻"}
				</div>
				<div
					style={homeStyle}
					onMouseEnter={() => {
						this.setState({ homeArrowHovered: true })
					}}
					onMouseLeave={() => {
						this.setState({ homeArrowHovered: false })
					}}
				>
					{"⌂"}
				</div>
				<div style={urlBarDivStyle}>
					<input
						style={urlBarStyle}
						value={this.props.currentUrl}
						onChange={(ev) => {
							this.props.updateUrl(ev.target.value)
						}}
					/>
				</div>
			</div>
		)
	}
}

BrowserAppHeader.propTypes = {
	updateUrl: window.PropTypes.func,
	currentUrl: window.PropTypes.string
}