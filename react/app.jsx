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
			backArrowGlow: false,
			forwardArrowGlow: false,
			refreshArrowGlow: false,
			homeArrowGlow: false
		}
	}

	render() {
		let containerStyle = {
			backgroundColor: "#eee",
			display: "flex"
		}
		let headerBtnStyle = {
			display: "inline-block",
			borderRadius: "50%",
			cursor: "pointer",
			width: "40px",
			height: "40px",
			padding: "4px",
			marginRight: "4px",
			color: "#666",
			transition: "background-color 0.8s",
			WebkitTapHighlightColor: "rgba(0,0,0,0)"
		}
		let backArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.backArrowGlow ? "#ccc" : "",
			transform: "rotate(180deg)"
		}
		let forwardArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.forwardArrowGlow ? "#ccc" : "",
		}
		let refreshStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.refreshArrowGlow ? "#ccc" : "",
		}
		let homeStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.homeArrowGlow ? "#ccc" : "",
		}
		let urlBarDivStyle = {
			display: "block",
			background: "#ccc",
			height: "40px",
			flex: "1 1 10%",
			borderRadius: "20px",
			paddingLeft: "30px",
			marginTop: "4px",
			marginRight: "6px"
		}
		let urlBarStyle = {
			background: "none",
			border: "none",
			width: "90%",
			outline: "none",
			fontSize: "20px",
			lineHeight: "40px",
			...SANS_FONT
		}
		return (
			<div style={containerStyle}>
				<div
					style={backArrowStyle}
					onTouchStart={() => {
						this.setState({ backArrowGlow: true })
					}}
					onTouchEnd={() => {
						this.setState({ backArrowGlow: false })
					}}
				>
					<img
						style={{
							height: "100%",
							width: "100%",
							objectFit: "contain",
							opacity: 0.75
						}}
						src="/img/icons/arrow.svg"
					/>
				</div>
				<div
					style={forwardArrowStyle}
					onTouchStart={() => {
						this.setState({ forwardArrowGlow: true })
					}}
					onTouchEnd={() => {
						this.setState({ forwardArrowGlow: false })
					}}
				>
					<img
						style={{
							height: "100%",
							width: "100%",
							objectFit: "contain",
							opacity: 0.75
						}}
						src="/img/icons/arrow.svg"
					/>
				</div>
				<div
					style={refreshStyle}
					onTouchStart={() => {
						this.setState({ refreshArrowGlow: true })
					}}
					onTouchEnd={() => {
						this.setState({ refreshArrowGlow: false })
					}}
				>
					<img
						style={{
							height: "100%",
							width: "100%",
							objectFit: "contain",
							opacity: 0.75
						}}
						src="/img/icons/refresh.svg"
					/>
				</div>
				<div
					style={homeStyle}
					onTouchStart={() => {
						this.setState({ homeArrowGlow: true })
					}}
					onTouchEnd={() => {
						this.setState({ homeArrowGlow: false })
					}}
				>
					<img
						style={{
							height: "100%",
							width: "100%",
							objectFit: "contain",
							opacity: 0.75
						}}
						src="/img/icons/home.svg"
					/>
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