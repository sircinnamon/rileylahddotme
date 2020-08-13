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
			zIndex: this.props.layer + 100,
			transition: "transform .2s linear, opacity .2s linear",
			transform: `scale(${this.props.closing ? "0.3" : "1"})`,
			opacity: `${this.props.closing ? "0" : "1"}`
		};
		let headerStyle = {
			backgroundColor: "rgba(0,0,0,0.9)",
			userSelect: "none",
			color: "rgb(75,75,75)",
			padding: "4px 4px 0px",
			borderRadius: "5px 5px 0px 0px",
			height: "20px",
			...SANS_FONT
		};
		if (this.props.isHeld) {
			headerStyle.backgroundColor = "rgba(30,30,30,0.9)";
			headerStyle.cursor = "grabbing";
		}
		let closeButtonStyle = {
			background: "rgb(200, 30, 30)"
		};
		let foldButtonStyle = {
			background: "rgb(150, 150, 30)"
		};
		let hideButtonStyle = {
			background: "rgb(30, 200, 30)"
		};
		let bodyStyle = {
			maxHeight: this.props.isFolded ? "0px" : "",
			overflow: this.props.isFolded ? "hidden" : "",
			height: this.props.height || "",
			width: this.props.width || ""
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
			height: "14px",
			width: "14px",
			float: "right",
			padding: 0,
			fontSize: "5px",
			margin: "2px",
			borderRadius: "10px",
			background: "rgb(200, 30, 30)",
			cursor: "pointer",
			opacity: this.state.hovered?0.9:0.5,
			...this.props.style
		};
		return (
			<div
				style={style}
				onMouseDown={this.props.onMouseDown}
				onTouchStart={this.props.onMouseDown}
				onMouseEnter={()=>{this.setState({hovered: true})}}
				onMouseLeave={()=>{this.setState({hovered: false})}}
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
				newBody.push({ string: " $ ", bold: true, color: 2 });
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
		let colors = [...TERMINAL_COLOURS];
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
			body.push(<span style={s} key={`snippet${i}`} >{c.string}</span>);
		}
		let preStyle = {
			backgroundColor: "rgba(0,0,0,0.8)",
			color: "rgb(200,200,200)",
			margin: 0,
			padding: "0 .5em",
			fontSize: "13px",
			...MONO_FONT
		};
		let promptStyle = {
			color: colors[2],
			fontWeight: "bold"
		};
		let inputStyle = {
			color: "rgb(200,200,200)",
			...MONO_FONT
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
				closing={this.props.closing}
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
		let colors = [...MONOKAI_COLOURS];
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
				body.push(<span style={s} key={`snippet${i}`}>{c.string}</span>);
			}
		} else {
			body = "";
		}
		let bodyContainerStyle = {
			flex: "1 0 60px",
			minWidth: "500px"
		};
		let tabBarStyle = {
			backgroundColor: "#6d6e6a",
			height: "35px",
			position: "relative",
			color: "#ddd",
			fontSize: "12px",
			overflowX: "auto",
			...SANS_FONT
		};
		let bodyStyle = {
			backgroundColor: "#282923",
			minHeight: "30px",
			height: "calc(100% - 39px)",
			minWidth: "fit-content",
			padding: "2px 1em",
			color: "#999",
			overflowY: "auto"
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
				closing={this.props.closing}
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
							<pre
								style={{
									margin: "0px",
									float: "left",
									display: "inline-block",
									fontSize: "13px",
									overflow: "hidden",
									whiteSpace: "break-spaces",
									...MONO_FONT
								}}
							>
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
			backgroundColor: "#ebedef",
			minWidth: "fit-content",
			maxWidth: "130px",
			flex: "1 0 40px",
			overflow: "hidden",
			fontSize: "12px",
			...SANS_FONT
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
				verticalAlign: "middle",
				marginRight: "2px"
			};
			let icon =
				"/img/icons/fileicon_small.svg";
			list.push(
				<li
					style={liStyle}
					onClick={() => {
						this.props.openTab(fileList[i]);
					}}
					key={`file-${fileList[i]}`}
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
					key={`tab-${this.props.openTabs[i]}`}
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
			backgroundColor: "#42433e",
			padding: "7px",
			flex: "1 1 auto",
			maxWidth: "200px",
			cursor: "pointer",
			color: "#989898",
			whiteSpace: "nowrap"
		};
		if (this.props.isActive) {
			s.backgroundColor = "#282923";
			s.color = "#FFFFFF";
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
				closing={this.props.closing}
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
			outline: "none",
			...SANS_FONT
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

class FileExplorerWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPath: this.props.startPath,
			barText: this.props.startPath,
			selectedFile: undefined
		};

		this.getCurrentFiles = function (path, fileTree) {
			let keys = path.split("/").filter((x) => x !== "");
			let finalPath = "";
			if (path === "") {
				this.setState({ currentPath: "/", barText: "/" });
			}
			while (keys.length >= 1) {
				let k = keys.shift();
				finalPath = finalPath + "/" + k;
				if (fileTree[k]) {
					fileTree = fileTree[k];
				} else {
					if (finalPath === "") {
						finalPath = "/";
					}
					finalPath = finalPath.replace(/\/+/g, "/");
					this.setState({ currentPath: finalPath, barText: finalPath });
					return fileTree;
				}
			}
			return fileTree;
		};
	}

	render() {
		let bodyStyle = {
			display: "flex",
			background: "#111",
			flexWrap: "wrap",
			flex: "1",
			padding: "5px"
		};
		let currentFiles = this.getCurrentFiles(
			this.state.currentPath,
			this.props.fileTree
		);
		let files = [];
		for (let i = 0; i < Object.keys(currentFiles).length; i++) {
			let k = Object.keys(currentFiles)[i];
			let f = currentFiles[k];
			files.push(
				<FileExplorerWindowFile
					key={k}
					name={k}
					file={f}
					isSelected={this.state.selectedFile === k}
					setSelected={() => {
						this.setState({ selectedFile: k });
					}}
					enterFolder={(np) => {
						this.setState({
							selectedFile: undefined,
							currentPath: (this.state.currentPath + "/" + np).replace(/\/+/g, "/"),
							barText: (this.state.currentPath + "/" + np).replace(/\/+/g, "/")
						});
					}}
				/>
			);
		}
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
				closing={this.props.closing}
				toggleFold={this.props.toggleFold}
				hide={this.props.hide}
				height={this.props.height || "400px"}
				width={this.props.width || "600px"}
			>
				<FileExplorerWindowHeader
					currentUrl={this.state.currentPath}
					updateUrl={(v) => {
						this.setState({ currentPath: v, barText: v });
					}}
					updateBarText={(v) => {
						this.setState({ barText: v });
					}}
					barText={this.state.barText}
				/>
				<div style={{ height: "100%", display: "flex" }}>
					<div style={bodyStyle}>{files}</div>
					<FileExplorerWindowSidebar file={currentFiles[this.state.selectedFile]} />
				</div>
			</Window>
		);
	}
}

class FileExplorerWindowHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backArrowHovered: false,
			forwardArrowHovered: false,
			upArrowHovered: false,
			searchHovered: false
		};

		this.keyPress = function (ev) {
			if (ev.which == 13 || ev.keyCode == 13) {
				this.props.updateUrl(ev.target.value);
			}
		};
	}

	render() {
		let containerStyle = {
			backgroundColor: "#222",
			display: "flex"
		};
		let headerBtnStyle = {
			transition: "background-color 0.75s",
			display: "inline-block",
			borderRadius: "15%",
			cursor: "pointer",
			width: "20px",
			height: "20px",
			padding: "2px",
			marginRight: "2px",
			marginTop: "2px",
			marginBottom: "2px",
			color: "#999",
			border: "1px solid #555",
			userSelect: "none"
		};
		let backArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.backArrowHovered ? "#333" : "#111",
			padding: "1px 2px 3px 2px",
			marginRight: "0px",
			borderTopRightRadius: "0px",
			borderBottomRightRadius: "0px",
			borderRight: "0px",
			marginLeft: "3px"
		};
		let forwardArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.forwardArrowHovered ? "#333" : "#111",
			padding: "1px 2px 3px 2px",
			borderRadius: "0px",
			marginRight: "0px"
		};
		let upArrowStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.upArrowHovered ? "#333" : "#111",
			fontSize: "19px",
			padding: "2px 1px 2px 3px",
			lineHeight: "19px",
			borderTopLeftRadius: "0px",
			borderBottomLeftRadius: "0px",
			borderLeft: "0px"
		};
		let urlBarDivStyle = {
			display: "block",
			background: "#333",
			height: "20px",
			flex: "1 1 10%",
			borderRadius: "5px",
			paddingLeft: "5px",
			marginTop: "4px",
			marginTop: "4px",
			marginRight: "3px",
			color: "#999",
			border: "1px solid #555"
		};
		let urlBarStyle = {
			background: "none",
			border: "none",
			width: "90%",
			outline: "none",
			color: "#999",
			...SANS_FONT
		};
		let searchStyle = {
			...headerBtnStyle,
			backgroundColor: this.state.searchHovered ? "#333" : "#111",
			fontSize: "15px",
			padding: "4px 2px 0px 2px",
			lineHeight: "15px"
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
					style={upArrowStyle}
					onMouseEnter={() => {
						this.setState({ upArrowHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ upArrowHovered: false });
					}}
					onClick={() => {
						this.props.updateUrl(this.props.currentUrl.replace(/\/[^/]*$/, ""));
					}}
				>
					{"🡡"}
				</div>
				<div style={urlBarDivStyle}>
					<input
						style={urlBarStyle}
						value={this.props.barText}
						onChange={(ev) => {
							this.props.updateBarText(ev.target.value);
						}}
						onKeyDown={this.keyPress.bind(this)}
					/>
				</div>
				<div
					style={searchStyle}
					onMouseEnter={() => {
						this.setState({ searchHovered: true });
					}}
					onMouseLeave={() => {
						this.setState({ searchHovered: false });
					}}
				>
					{"🔍"}
				</div>
			</div>
		);
	}
}

class FileExplorerWindowFile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.onDoubleClick = function (ev) {
			if (this.props.file.onDoubleClick) {
				this.props.file.onDoubleClick(ev);
			} else if (
				this.props.file.type === "folder" ||
				this.props.file.type === undefined
			) {
				this.props.enterFolder(this.props.name);
			}
		};
	}

	render() {
		let isFolder =
			this.props.file.type === "folder" || this.props.file.type === undefined;
		let containerStyle = {
			padding: "5px",
			flex: "0",
			height: "fit-content"
		};
		let imgUrl = isFolder
			? "/img/folderlogo.svg"
			: "/img/icons/fileicon.svg";
		if (this.props.file.imgUrl) {
			imgUrl = this.props.file.imgUrl;
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
		};
		let nameStyle = {
			color: "rgb(200,200,200)",
			background: "rgba(10,10,10,0.5)",
			padding: "4px 12px",
			display: "inline-block",
			marginTop: "4px",
			userSelect: "none",
			fontSize: "14px",
			...SANS_FONT
		};
		if (this.state.isHovered) {
			containerStyle.border = "1px solid rgba(100, 126, 140, 0.9)";
			containerStyle.background = "rgba(100, 126, 140, 0.3)";
			containerStyle.padding = "4px";
		}
		if (this.props.isSelected) {
			containerStyle.border = "1px solid rgba(166, 203, 255, 0.9)";
			containerStyle.background = "rgba(166, 224, 255, 0.3)";
			containerStyle.padding = "4px";
		}
		return (
			<div
				style={containerStyle}
				onMouseEnter={() => {
					this.setState({ isHovered: true });
				}}
				onMouseLeave={() => {
					this.setState({ isHovered: false });
				}}
				onClick={() => {
					this.props.setSelected();
				}}
				onDoubleClick={this.onDoubleClick.bind(this)}
				onTouchStart={this.onDoubleClick.bind(this)}
			>
				<div>
					<img style={imgStyle} src={imgUrl} draggable="false" />
				</div>
				<div style={{ textAlign: "center" }}>
					<span style={nameStyle}>{this.props.name}</span>
				</div>
			</div>
		);
	}
}

class FileExplorerWindowSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (!this.props.file || !(this.props.file.type === "file")) {
			return "";
		}
		let containerStyle = {
			minWidth: "150px",
			maxWidth: "250px",
			height: "100%",
			float: "right",
			background: "#333"
		};
		let descDivStyle = {
			color: "#ccc",
			borderTop: "1px solid #ccc",
			borderBottom: "1px solid #ccc",
			marginTop: "10px"
		};
		let tableStyle = {
			width: "100%",
			borderCollapse: "collapse",
			marginTop: "10px"
		};
		let trStyle = {
			borderBottom: "1px solid #111",
			color: "#999",
			textAlign: "start"
		};
		let r1Style = {
			fontWeight: "bold"
		};
		let r2Style = {
			paddingRight: "3px"
		};
		let description = "";
		if (this.props.file.description) {
			description = (
				<div style={descDivStyle}>
					<h3 style={{ margin: "0px", textAlign: "center" }}>Description</h3>
					<p style={{ margin: "0px", overflow: "hidden" }}>
						{this.props.file.description}
					</p>
				</div>
			);
		}
		let rows = [];
		let metadata = Object.entries({ ...this.props.file.metadata });
		for (let i = 0; i < metadata.length; i++) {
			rows.push(
				<tr key={`metadata-row-${metadata[i][0]}`} style={{ ...trStyle, background: i % 2 === 0 ? "#222" : "#111" }}>
					<td style={r1Style}>{metadata[i][0]}:</td>
					<td style={r2Style}>{metadata[i][1]}</td>
				</tr>
			);
		}
		return (
			<div style={containerStyle}>
				{description}
				<table style={tableStyle}>
					<tbody>{rows}</tbody>
				</table>
			</div>
		);
	}
}