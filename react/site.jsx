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
			windowCounter: 0
		};

		this.newWindow = function () {
			let winSet = this.state.windows;
			let counter = this.state.windowCounter;
			let id = "" + (counter + 1);
			let newWindow = {
				pos: { x: Math.random() * 200, y: Math.random() * 200 },
				id: id,
				title: id
			};
			newWindow.children = (
				<div
					style={{
						backgroundColor: "rgba(0,0,0,0.5)",
						height: "250px",
						width: "200px",
						color: "rgb(75,75,75)"
					}}
				>
					Test
				</div>
			)
			winSet[id] = newWindow;
			this.setState({ windows: winSet, windowCounter: counter + 1 });
		};

		this.grabWindow = function (ev, id) {
			this.setState({
				heldWindow: id,
				windowPickupPos: { x: ev.pageX, y: ev.pageX }
			});
			this.makeWindowActive(ev, id);
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
			let newPos = { x: oldPos.x + ev.movementX, y: oldPos.y + ev.movementY };
			let newWindows = { ...this.state.windows };
			newWindows[this.state.heldWindow].pos = newPos;
			this.setState({
				windows: newWindows,
				windowPickupPos: { x: ev.screenX, y: ev.screenY }
			});
		};

		this.makeWindowActive = function (ev, id) {
			ev.stopPropagation();
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

		this.deleteWindow = function (ev, id) {
			ev.stopPropagation();
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
	}

	componentDidMount() {
		window.addEventListener("mouseup", () => {
			this.releaseWindow();
		});
		window.addEventListener("mousemove", (ev) => {
			if (this.state.heldWindow !== undefined) {
				this.moveWindow(ev);
			}
		});
	}

	render() {
		let windows = Object.entries(this.state.windows).map((w) => {
			return (
				<Window
					title={w[1].title}
					topPos={w[1].pos.y}
					leftPos={w[1].pos.x}
					grabWindow={(ev) => {
						this.grabWindow(ev, w[1].id);
					}}
					isHeld={w[1].id === this.state.heldWindow}
					makeActive={(ev) => {
						this.makeWindowActive(ev, w[1].id);
					}}
					layer={this.state.windowZOrder.indexOf(w[1].id)}
					close={(ev) => {
						this.deleteWindow(ev, w[1].id);
					}}
				>
					{w[1].children}
				</Window>
			);
		});
		return (
			<div>
				<div>
					<button onClick={this.newWindow.bind(this)}>+</button>
					<br />
					{windows}
				</div>
			</div>
		);
	}
}