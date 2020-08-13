/* global React, Dock */
/* exported Site */
class Site extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windows: {},
			heldWindow: undefined,
			windowZOrder: [],
			activeWindow: undefined,
			windowCounter: 0,
			booted: false
		};

		this.newWindow = function(content, minWidth=0, minHeight=0){
			let winSet = this.state.windows;
			if(!content.id){content.id = this.state.windowCounter+1}
			if(!content.pos){
				content.pos = {}
			}
			if(!content.pos.x){
				let bufferspace = minWidth ||( window.innerWidth	* 0.9)
				content.pos.x = Math.random() * (window.innerWidth - (bufferspace))
			}
			if(!content.pos.y){
				let bufferspace = minHeight || (window.innerHeight	* 0.9)
				content.pos.y = Math.random() * (window.innerHeight - (bufferspace))	
			}
			winSet[content.id] = content;
			this.setState({ windows: winSet, windowCounter: this.state.windowCounter + 1 });
			this.makeWindowActive(undefined, content.id);
		}

		this.newTerminal = function () {
			let newWindow = {
				title: "Terminal",
				folded: false,
				hidden: false,
				type: "terminal",
				props: {}
			};
			newWindow.props.bodyChunks = [
				{ string: "pi@thor", bold: true, color: 0 },
				{ string: ":" },
				{ string: "~/rileylahddotme ", bold: true, color: 1 },
				{ string: "python3 -m http.server\n" },
				{
					string: "Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...\n"
				},
				{
					string: '10.0.0.117 - - [24/Jul/2020 15:12:40] "GET / HTTP/1.1" 200 -\n'
				},
				{
					string:
						'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /js/main.js HTTP/1.1" 200 -\n'
				},
				{
					string:
						'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /js/rileylahddotme-react.min.js HTTP/1.1" 200 -\n'
				},
				{
					string:
						"10.0.0.117 - - [24/Jul/2020 15:12:40] code 404, message File not found\n"
				},
				{
					string:
						'10.0.0.117 - - [24/Jul/2020 15:12:40] "GET /favicon.ico HTTP/1.1" 404 -\n'
				}
			];
			this.newWindow(newWindow, 200, 200)
		};

		this.eduWindow = function () {
			let winSet = this.state.windows;
			let id = "edu";
			if (winSet[id]) {
				this.makeWindowVisible(undefined, id);
				return;
			}
			let newWindow = {
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "terminal",
				props: {}
			};
			newWindow.props.bodyChunks = EDU_HISTORY_TERMINAL;
			this.newWindow(newWindow, 400, 200)
		};

		this.ideWorkHistoryWindow = function () {
			let winSet = this.state.windows;
			let id = "ideWork";
			if (winSet[id]) {
				this.makeWindowVisible(undefined, id);
				return;
			}
			let newWindow = {
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "ide",
				props: {}
			};
			newWindow.props.windowHeight = "500px";
			newWindow.props.windowWidth = "700px";
			newWindow.props.defaultCurrentTab = "README.md";
			newWindow.props.files = WORK_HISTORY_IDE;
			this.newWindow(newWindow, 700, 500)
		};

		this.ideSkillsWindow = function () {
			let winSet = this.state.windows;
			let id = "ideSkills";
			if (winSet[id]) {
				this.makeWindowVisible(undefined, id);
				return;
			}
			let newWindow = {
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "ide",
				props: {}
			};
			newWindow.props.windowHeight = "500px";
			newWindow.props.windowWidth = "700px";
			newWindow.props.defaultCurrentTab = "README.md";
			newWindow.props.files = SKILLS_IDE;
			this.newWindow(newWindow, 700, 500)
		};

		this.browserWindow = function () {
			let winSet = this.state.windows;
			let id = "browser";
			if (winSet[id]) {
				this.makeWindowVisible(undefined, id);
				return;
			}
			let newWindow = {
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "browser",
				props: {
					startUrl: "rileylahd.me"
				},
				children: (<FakeSite />)
			};
			this.newWindow(newWindow, 500, 500)
		};

		this.fileExplorerWindow = function () {
			let winSet = this.state.windows;
			let id = "fileexplorer";
			if (winSet[id]) {
				this.makeWindowVisible(undefined, id);
				return;
			}
			let newWindow = {
				id: id,
				title: "",
				folded: false,
				hidden: false,
				type: "fileexplorer",
				props: {
					startPath: "/home/rlahd",
					fileTree: FILE_TREE_HOBBIES
				}
			};
			this.newWindow(newWindow, 600, 400)
		};

		this.grabWindow = function (ev, id) {
			ev.preventDefault();
			this.makeWindowActive(undefined, id);
			if (ev.targetTouches) {
				ev = ev.targetTouches[0];
			}
			this.setState({
				heldWindow: id,
				windowPickupPos: { x: ev.pageX, y: ev.pageY }
			});
		};

		this.releaseWindow = function () {
			this.setState({ heldWindow: undefined });
		};

		this.moveWindow = function (ev) {
			ev.preventDefault();
			if (!this.state.windows[this.state.heldWindow]) {
				this.releaseWindow();
				return;
			}
			let oldPos = this.state.windows[this.state.heldWindow].pos;
			if (ev.targetTouches) {
				ev = ev.changedTouches[0];
				ev.movementX = ev.pageX - this.state.windowPickupPos.x;
				ev.movementY = ev.pageY - this.state.windowPickupPos.y;
			}
			let newPos = { x: oldPos.x + ev.movementX, y: oldPos.y + ev.movementY };
			let newWindows = { ...this.state.windows };
			newWindows[this.state.heldWindow].pos = newPos;
			this.setState({
				windows: newWindows,
				windowPickupPos: { x: ev.pageX, y: ev.pageY }
			});
		};

		this.makeWindowVisible = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			if (winSet[id]) {
				winSet[id].folded = false;
				winSet[id].hidden = false;
				this.setState({ windows: winSet });
				this.makeWindowActive(undefined, id);
				return;
			}
		};

		this.makeWindowActive = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let zOrder = this.state.windowZOrder;
			zOrder = zOrder.filter((x) => {
				return x !== id;
			});
			zOrder = [...zOrder, id];
			this.setState({
				windowZOrder: zOrder,
				activeWindow: id
			});
		};

		this.startDeleteWindow = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			winSet[id].closing = true;
			this.setState({
				windows: winSet
			});
			setTimeout(
				(ev, id) => {
					this.deleteWindow(ev, id);
				},
				200,
				undefined,
				id
			);
		};

		this.deleteWindow = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			delete winSet[id];
			let zOrder = this.state.windowZOrder;
			zOrder = zOrder.filter((x) => {
				return x !== id;
			});
			this.setState({
				windows: winSet,
				heldWindow: undefined,
				windowZOrder: zOrder
			});
		};

		this.toggleFoldWindow = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			winSet[id].folded = !winSet[id].folded;
			this.setState({
				windows: winSet
			});
		};

		this.hideWindow = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			winSet[id].hidden = true;
			this.setState({
				windows: winSet
			});
		};

		this.showWindow = function (ev, id) {
			if(ev){ev.stopPropagation()}
			let winSet = this.state.windows;
			winSet[id].hidden = false;
			this.setState({
				windows: winSet
			});
		};
	}

	componentDidMount() {
		let releaseWindow = function () {
			this.releaseWindow();
		}.bind(this);
		window.addEventListener("mouseup", releaseWindow);
		window.addEventListener("touchend", releaseWindow);
		let mvWindow = function (ev) {
			if (this.state.heldWindow !== undefined) {
				this.moveWindow(ev);
			}
		}.bind(this);
		window.addEventListener("mousemove", mvWindow);
		window.addEventListener("touchmove", mvWindow);
	}

	render() {
		let windows = Object.entries(this.state.windows).map((w) => {
			let globalProps = {
				title: w[1].title,
				topPos: w[1].pos.y,
				leftPos: w[1].pos.x,
				grabWindow: (ev) => {
					this.grabWindow(ev, w[1].id);
				},
				isHeld: w[1].id === this.state.heldWindow,
				isHidden: w[1].hidden,
				isFolded: w[1].folded,
				makeActive: (ev) => {
					this.makeWindowActive(ev, w[1].id);
				},
				isActive: w[1].id === this.state.activeWindow,
				layer: this.state.windowZOrder.indexOf(w[1].id),
				closing: w[1].closing,
				close: (ev) => {
					this.startDeleteWindow(ev, w[1].id);
				},
				toggleFold: (ev) => {
					this.toggleFoldWindow(ev, w[1].id);
				},
				hide: (ev) => {
					this.hideWindow(ev, w[1].id);
				}
			};
			if (w[1].type === "terminal") {
				return <TerminalWindow {...globalProps} {...w[1].props} key={w[1].id} />;
			} else if (w[1].type === "ide") {
				return <IDEWindow {...globalProps} {...w[1].props} key={w[1].id} />;
			} else if (w[1].type === "browser") {
				return (
					<BrowserWindow {...globalProps} {...w[1].props} key={w[1].id}>
						{w[1].children}
					</BrowserWindow>
				);
			} else if (w[1].type === "fileexplorer") {
				return (
					<FileExplorerWindow {...globalProps} {...w[1].props} key={w[1].id}></FileExplorerWindow>
				);
			} else {
				return <Window {...globalProps} key={w[1].id}>{w[1].children}</Window>;
			}
		});
		//Show boot sequence on first visit
		let bootSeq = ""
		if(!this.state.booted){
			bootSeq = (
				<BootSequence
					completeBoot={()=>{this.setState({booted: true})}}
				/>
			)
		}
		return (
			<div
				style={{
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 0
				}}
			>
				{bootSeq}
				<div hidden={this.state.booted===false}>
					<br />
					{windows}
					<Desktop
						clearSelected={() => {
							this.setState({ selectedShortcut: undefined });
						}}
					>
						<DesktopShortcut
							name="Education"
							imgUrl="/img/terminalicon.svg"
							isSelected={this.state.selectedShortcut === "EducationShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "EducationShortcut" });
							}}
							onDoubleClick={this.eduWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Work History"
							imgUrl="/img/idelogo.svg"
							isSelected={this.state.selectedShortcut === "WorkShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "WorkShortcut" });
							}}
							onDoubleClick={this.ideWorkHistoryWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Skills"
							imgUrl="/img/idelogo.svg"
							isSelected={this.state.selectedShortcut === "SkillsShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "SkillsShortcut" });
							}}
							onDoubleClick={this.ideSkillsWindow.bind(this)}
						/>
						<DesktopShortcut
							name="Links"
							imgUrl="/img/browserlogo.svg"
							isSelected={this.state.selectedShortcut === "BrowserShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "BrowserShortcut" });
							}}
							onDoubleClick={this.browserWindow.bind(this)}
						/>
						<DesktopShortcut
							name="About"
							imgUrl="/img/folderlogo.svg"
							isSelected={this.state.selectedShortcut === "FileShortcut"}
							setSelected={() => {
								this.setState({ selectedShortcut: "FileShortcut" });
							}}
							onDoubleClick={this.fileExplorerWindow.bind(this)}
						/>
					</Desktop>
					<Dock>
						<DockButton onClick={this.newTerminal.bind(this)}>
							<img
								src="/img/terminalicon.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.eduWindow.bind(this)}
							isOpen={this.state.windows.edu}
						>
							<img
								src="/img/terminalicon.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.ideWorkHistoryWindow.bind(this)}
							isOpen={this.state.windows.ideWork}
						>
							<img
								src="/img/idelogo.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.ideSkillsWindow.bind(this)}
							isOpen={this.state.windows.ideSkills}
						>
							<img
								src="/img/idelogo.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.browserWindow.bind(this)}
							isOpen={this.state.windows.browser}
						>
							<img
								src="/img/browserlogo.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
						<DockButton
							onClick={this.fileExplorerWindow.bind(this)}
							isOpen={this.state.windows.fileexplorer}
						>
							<img
								src="/img/folderlogo.svg"
								style={{
									height: "55px"
								}}
							/>
						</DockButton>
					</Dock>
				</div>
			</div>
		);
	}
}