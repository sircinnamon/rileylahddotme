class Window extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// console.log(window.innerHeight, window.innerWidth)
		let windowStyle = {
			display: this.props.isHidden ? "none" : "inline-block",
			minWidth: "40px",
			minHeight: "20px",
			position: "absolute",
			top: Math.min(Math.max(this.props.topPos, 0), window.innerHeight - 20) || 0,
			left: Math.min(Math.max(this.props.leftPos, 0), window.innerWidth - 40) || 0,
			zIndex: this.props.layer + 100
		};
		let headerStyle = {
			backgroundColor: "rgba(0,0,0,0.9)",
			userSelect: "none",
			color: "rgb(75,75,75)",
			padding: "4px 4px 0px",
			borderRadius: "5px 5px 0px 0px",
			height: "20px"
		};
		if (this.props.isHeld) {
			headerStyle.backgroundColor = "rgba(255,0,0,0.7)";
			headerStyle.cursor = "grabbing";
		}
		let closeButtonStyle = {
			background: "rgba(200, 30, 30, 0.5)"
		};
		let foldButtonStyle = {
			background: "rgba(150, 150, 30, 0.5)"
		};
		let hideButtonStyle = {
			background: "rgba(30, 200, 30, 0.5)"
		};
		let bodyStyle = {
			maxHeight: this.props.isFolded ? "0px" : "",
			overflow: this.props.isFolded ? "hidden" : ""
		};
		return (
			<div
				style={windowStyle}
				onMouseDown={this.props.makeActive}
				onTouchStart={this.props.makeActive}
				onKeyDown={this.props.onKeyDown}
			>
				<div
					style={headerStyle}
					onMouseDown={this.props.grabWindow}
					onTouchStart={this.props.grabWindow}
				>
					{this.props.title}
					<WindowHeaderBtn style={closeButtonStyle} onMouseDown={this.props.close} />
					<WindowHeaderBtn
						style={foldButtonStyle}
						onMouseDown={this.props.toggleFold}
					/>
					<WindowHeaderBtn style={hideButtonStyle} onMouseDown={this.props.hide} />
				</div>
				<div style={bodyStyle}>{this.props.children}</div>
			</div>
		);
	}
}

class WindowHeaderBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let style = {
			height: "10px",
			width: "10px",
			float: "right",
			padding: 0,
			fontSize: "5px",
			margin: "2px",
			borderRadius: "10px",
			background: "rgba(200, 30, 30, 0.7)",
			cursor: "pointer",
			...this.props.style
		};
		return (
			<div
				style={style}
				onMouseDown={this.props.onMouseDown}
				onTouchStart={this.props.onMouseDown}
			/>
		);
	}
}

class TerminalWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ""
		};

		this.keyPress = function (ev) {
			if (ev.which == 13 || ev.keyCode == 13) {
				this.submitInput();
			}
		};
		this.submitInput = function () {
			let input = this.state.input;
			if (this.props.updateBody) {
				let newBody = this.props.bodyChunks;
				newBody.push({ string: " $ ", bold: true, color: 0 });
				newBody.push({ string: this.state.input + "\n" });
				this.props.updateBody(newBody);
			}
			this.setState({ input: "" });
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.isActive && document.activeElement !== this.termInput) {
			this.termInput.focus({ preventScroll: true });
		}
	}

	render() {
		let colors = ["#20872b", "#205c87", "#555"];
		let prompt = ">>> $ ";
		let body = [];
		for (let i = 0; i < this.props.bodyChunks.length; i++) {
			let s = {};
			let c = this.props.bodyChunks[i];
			if (c.color !== undefined) {
				s.color = colors[c.color];
			}
			if (c.bold) {
				s.fontWeight = "bold";
			}
			body.push(<span style={s}>{c.string}</span>);
		}
		let preStyle = {
			backgroundColor: "rgba(0,0,0,0.8)",
			color: "rgb(200,200,200)",
			margin: 0,
			padding: "0 .5em"
		};
		let promptStyle = {
			color: colors[0],
			fontWeight: "bold"
		};
		let inputStyle = {
			fontFamily: "monospace",
			color: "rgb(200,200,200)"
		};
		let textboxStyle = {
			display: "block",
			position: "absolute",
			top: 0,
			left: 0,
			opacity: 0,
			pointerEvents: "none"
		};
		return (
			<Window
				title={this.props.title}
				topPos={this.props.topPos}
				leftPos={this.props.leftPos}
				grabWindow={this.props.grabWindow}
				isHeld={this.props.isHeld}
				isHidden={this.props.isHidden}
				isFolded={this.props.isFolded}
				makeActive={this.props.makeActive}
				layer={this.props.layer}
				close={this.props.close}
				toggleFold={this.props.toggleFold}
				hide={this.props.hide}
			>
				<pre style={preStyle}>
					{body}
					<span style={promptStyle}>{prompt}</span>
					<span style={inputStyle}>{this.state.input}</span>
					<input
						type="text"
						value={this.state.input}
						onChange={(ev) => {
							this.setState({ input: ev.target.value });
						}}
						style={textboxStyle}
						ref={(input) => {
							this.termInput = input;
						}}
						onKeyPress={this.keyPress.bind(this)}
					/>
				</pre>
			</Window>
		);
	}
}

class IDEWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openTabs: [],
			currentTab: undefined
		};

		if (this.props.defaultOpenTabs) {
			this.state.openTabs = [...this.props.defaultOpenTabs];
		}

		if (this.props.defaultCurrentTab) {
			this.state.currentTab = this.props.defaultCurrentTab;
			if (this.state.openTabs.indexOf(this.props.defaultCurrentTab) === -1) {
				this.state.openTabs.push(this.props.defaultCurrentTab);
			}
		}

		this.clickTab = function (tabId) {
			this.setState({ currentTab: tabId });
		};
		this.closeTab = function (tabId) {
			let tabs = this.state.openTabs;
			let curr = this.state.currentTab;
			let ind = tabs.indexOf(curr);
			tabs = tabs.filter((x) => {
				return x !== tabId;
			});
			if (tabId === curr && tabs.length > 0) {
				curr = tabs[Math.max(ind - 1, 0)];
			}
			if (tabs.length === 0) {
				curr = undefined;
			}
			this.setState({ currentTab: curr, openTabs: tabs });
		};
		this.openTab = function (filename) {
			if (this.state.openTabs.indexOf(filename) !== -1) {
				this.clickTab(filename);
				return;
			}
			let tabs = this.state.openTabs;
			tabs.push(filename);
			this.setState({ currentTab: filename, openTabs: tabs });
		};
	}

	render() {
		let colors = ["#20872b", "#205c87", "#555"];
		let body = [];
		if (this.state.currentTab) {
			let openFile = this.props.files[this.state.currentTab];
			for (let i = 0; i < openFile.bodyChunks.length; i++) {
				let s = {};
				let c = openFile.bodyChunks[i];
				if (c.color !== undefined) {
					s.color = colors[c.color];
				}
				if (c.bold) {
					s.fontWeight = "bold";
				}
				body.push(<span style={s}>{c.string}</span>);
			}
		} else {
			body = "";
		}
		let bodyContainerStyle = {
			flex: "1 0 60px",
			minWidth: "500px"
		};
		let tabBarStyle = {
			backgroundColor: "#555",
			height: "35px",
			position: "relative",
			color: "#ddd",
			fontSize: "12px"
		};
		let bodyStyle = {
			backgroundColor: "#333",
			minHeight: "30px",
			height: "calc(100% - 39px)",
			minWidth: "fit-content",
			padding: "2px",
			color: "#999"
		};

		return (
			<Window
				title={this.props.title}
				topPos={this.props.topPos}
				leftPos={this.props.leftPos}
				grabWindow={this.props.grabWindow}
				isHeld={this.props.isHeld}
				isHidden={this.props.isHidden}
				isFolded={this.props.isFolded}
				makeActive={this.props.makeActive}
				layer={this.props.layer}
				close={this.props.close}
				toggleFold={this.props.toggleFold}
				hide={this.props.hide}
			>
				<div
					style={{
						display: "flex",
						height: this.props.windowHeight,
						width: this.props.windowWidth
					}}
				>
					<IDEWindowSidebar
						files={this.props.files}
						currentTab={this.state.currentTab}
						openTab={this.openTab.bind(this)}
					/>
					<div style={bodyContainerStyle}>
						<div style={tabBarStyle}>
							<IDEWindowTabs
								openTabs={this.state.openTabs}
								currentTab={this.state.currentTab}
								clickTab={this.clickTab.bind(this)}
								closeTab={this.closeTab.bind(this)}
							/>
						</div>
						<div style={bodyStyle}>
							<pre style={{ margin: "0px", float: "left", display: "inline-block" }}>
								{body}
							</pre>
						</div>
					</div>
				</div>
			</Window>
		);
	}
}

class IDEWindowSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let containerStyle = {
			backgroundColor: "#999",
			minWidth: "fit-content",
			maxWidth: "130px",
			flex: "1 0 40px",
			overflow: "hidden",
			fontSize: "12px"
		};
		let headStyle = {
			margin: "0.5em",
			fontSize: "14px",
			fontWeight: "bold",
			color: "#333"
		};
		let list = [];
		let fileList = Object.keys(this.props.files);
		for (let i = 0; i < fileList.length; i++) {
			let liStyle = {
				backgroundColor:
					fileList[i] === this.props.currentTab ? "rgba(255,255,255,0.5)" : "",
				padding: "3px",
				userSelect: "none",
				cursor: "pointer"
			};
			let iconStyle = {
				height: "1em",
				verticalAlign: "middle"
			};
			let icon =
				"https://cdn.icon-icons.com/icons2/931/PNG/512/empty_file_icon-icons.com_72420.png";
			list.push(
				<li
					style={liStyle}
					onClick={() => {
						this.props.openTab(fileList[i]);
					}}
				>
					<span>
						<img style={iconStyle} src={icon} />
					</span>
					<span>{fileList[i]}</span>
				</li>
			);
		}
		let listStyle = {
			listStyleType: "none",
			padding: "1px",
			marginTop: "5px"
		};
		return (
			<div style={containerStyle}>
				<h1 style={headStyle}>FILES</h1>
				<ul style={listStyle}>{list}</ul>
			</div>
		);
	}
}

class IDEWindowTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let tabs = [];
		for (let i = 0; i < this.props.openTabs.length; i++) {
			tabs.push(
				<IDEWindowTab
					onClick={() => {
						this.props.clickTab(this.props.openTabs[i]);
					}}
					isActive={this.props.openTabs[i] == this.props.currentTab}
					close={() => {
						this.props.closeTab(this.props.openTabs[i]);
					}}
				>
					{this.props.openTabs[i]}
				</IDEWindowTab>
			);
		}
		let rowStyle = {
			display: "flex",
			justifyContent: "flex-start",
			position: "absolute",
			bottom: 0
		};
		return <div style={rowStyle}>{tabs}</div>;
	}
}

class IDEWindowTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xHovered: false
		};
	}

	render() {
		let s = {
			borderRadius: "5px 5px 0px 0px",
			backgroundColor: "#444",
			padding: "7px",
			flex: 1,
			maxWidth: "100px",
			cursor: "pointer"
		};
		if (this.props.isActive) {
			s.backgroundColor = "#333";
		}
		let closeStyle = {
			background: this.state.xHovered ? "rgba(255,255,255,0.2)" : "",
			borderRadius: "10px"
		};
		return (
			<div style={s} onClick={this.props.onClick}>
				<span>{this.props.children}&nbsp;</span>
				<span
					onClick={(ev) => {
						ev.stopPropagation();
						this.props.close();
					}}
					style={closeStyle}
					onMouseEnter={() => {
						this.setState({ xHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ xHovered: false });
					}}
				>
					×
				</span>
			</div>
		);
	}
}

class BrowserWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUrl: this.props.startUrl,
			history: [this.props.startUrl]
		};
	}

	render() {
		return (
			<Window
				title={this.props.title}
				topPos={this.props.topPos}
				leftPos={this.props.leftPos}
				grabWindow={this.props.grabWindow}
				isHeld={this.props.isHeld}
				isHidden={this.props.isHidden}
				isFolded={this.props.isFolded}
				makeActive={this.props.makeActive}
				layer={this.props.layer}
				close={this.props.close}
				toggleFold={this.props.toggleFold}
				hide={this.props.hide}
			>
				<BrowserWindowHeader
					currentUrl={this.state.currentUrl}
					updateUrl={(v) => {
						this.setState({ currentUrl: v });
					}}
				/>
				{this.props.children}
			</Window>
		);
	}
}

class BrowserWindowHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backArrowHovered: false,
			forwardArrowHovered: false,
			refreshArrowHovered: false,
			homeArrowHovered: false
		};
	}

	render() {
		let containerStyle = {
			backgroundColor: "#eee",
			display: "flex"
		};
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
		};
		let backArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.backArrowHovered ? "#ccc" : "",
			padding: "1px 2px 3px 2px"
		};
		let forwardArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.forwardArrowHovered ? "#ccc" : "",
			padding: "1px 2px 3px 2px"
		};
		let refreshStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.refreshArrowHovered ? "#ccc" : "",
			fontSize: "19px",
			padding: "2px 1px 2px 3px",
			lineHeight: "19px"
		};
		let homeStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.homeArrowHovered ? "#ccc" : "",
			fontSize: "23px",
			padding: "0px 0px 4px 4px",
			lineHeight: "23px"
		};
		let urlBarDivStyle = {
			display: "block",
			background: "#ccc",
			height: "20px",
			flex: "1 1 10%",
			borderRadius: "10px",
			paddingLeft: "20px",
			marginTop: "2px",
			marginRight: "3px"
		};
		let urlBarStyle = {
			background: "none",
			border: "none",
			width: "90%",
			outline: "none"
		};
		return (
			<div style={containerStyle}>
				<div
					style={backArrowStyle}
					onMouseEnter={() => {
						this.setState({ backArrowHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ backArrowHovered: false });
					}}
				>
					{"🡠"}
				</div>
				<div
					style={forwardArrowStyle}
					onMouseEnter={() => {
						this.setState({ forwardArrowHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ forwardArrowHovered: false });
					}}
				>
					{"🡢"}
				</div>
				<div
					style={refreshStyle}
					onMouseEnter={() => {
						this.setState({ refreshArrowHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ refreshArrowHovered: false });
					}}
				>
					{"↻"}
				</div>
				<div
					style={homeStyle}
					onMouseEnter={() => {
						this.setState({ homeArrowHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ homeArrowHovered: false });
					}}
				>
					{"⌂"}
				</div>
				<div style={urlBarDivStyle}>
					<input
						style={urlBarStyle}
						value={this.props.currentUrl}
						onChange={(ev) => {
							this.props.updateUrl(ev.target.value);
						}}
					/>
				</div>
			</div>
		);
	}
}