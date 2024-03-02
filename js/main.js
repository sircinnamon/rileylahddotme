// GLOBALS

const MONO_FONT = {
	fontFamily: "Fira Mono, monospace"
};

const SANS_FONT = {
	fontFamily: "Open Sans, sans-serif"
};

const TITLE_FONT = {
	fontFamily: "Catamaran, sans-serif"
};

const MONOKAI_COLOURS = [
	"#F8F8F0", //	0 ghost-white
	"#F8F8F2", //	1 light-ghost-white
	"#CCC", //	2 light-gray
	"#888", //	3 gray
	"#49483E", //	4 brown-gray
	"#282828", //	5 dark-gray
	"#E6DB74", //	6 yellow
	"#66D9EF", //	7 blue
	"#F92672", //	8 pink
	"#AE81FF", //	9 purple
	"#75715E", //	10 brown
	"#FD971F", //	11 orange
	"#FFD569", //	12 light-orange
	"#A6E22E", //	13 green
	"#529B2F" //	14 sea-green
];

//                light     dark
// 0  black       #383a42   #282c34
// 1  red         #e45649   #e06c75
// 2  green       #50a14f   #98c379
// 3  yellow      #c18401   #e5c07b
// 4  blue        #0184bc   #61afef
// 5  magenta     #a626a4   #c678dd
// 6  cyan        #0997b3   #56b6c2
// 7  white       #fafafa   #dcdfe4

const TERMINAL_COLOURS = [
	"#383a42",
	"#e45649",
	"#50a14f",
	"#c18401",
	"#0184bc",
	"#a626a4",
	"#0997b3",
	"#fafafa",
	"#282c34",
	"#e06c75",
	"#98c379",
	"#e5c07b",
	"#61afef",
	"#c678dd",
	"#56b6c2",
	"#dcdfe4",
]

const FILE_TREE_HOBBIES = {
	home: {
		rlahd: {
			Hobbies: {
				"3D Printing": {
					type: "file",
					onDoubleClick: () => {
						console.log("YEAH");
					},
					metadata: {
						Created: "2019",
						Printer: "AnyCubic i3 Mega",
						Fun: "High",
						Price: "High :("
					},
					imgUrl: "http://thor.sircinnamon.ca/img/apple-touch-icon.png"
				},
				Games: {
					"Board Games": {
						type: "file",
						metadata: {
							Genres: "Hidden Role, Bluffing, Co-op",
							Favourites: "Pandemic, Hanabi, Avalon"
						}
					},
					"Video Games": {
						type: "file",
						metadata: {
							Genres: "RPG, FPS, MOBA, Co-op, VR",
							Favourites: "Portal 1+2"
						}
					},
					"Tabletop Games": {
						type: "file",
						description: "Dungeon Master of a currently 3 year campaign",
						metadata: {
							Skills: "Teamwork, Leadership",
							Game: "Dungeons and Dragons",
							Edition: "5th"
						}
					}
				},
				Books: {
					"Science Fiction": {
						"Culture Series": {
							type: "file",
							metadata: {
								Author: "Iain Banks"
							}
						},
						"The Martian": {
							type: "file",
							metadata: {
								Author: "Andy Weir"
							}
						},
						"Three Body Problem": {
							type: "file",
							metadata: {
								Author: "Cixin Liu"
							}
						},
						"Hitchhikers Guide": {
							type: "file",
							metadata: {
								Author: "Douglas Adams"
							}
						}
					},
					"Fantasy": {
						"Stormlight Archive": {
							type: "file",
							metadata: {
								Author: "Brandon Sanderson"
							}
						},
						"The Kingkiller Chronicle": {
							type: "file",
							metadata: {
								Author: "Patrick Rothfuss"
							}
						}
					},
				}
			},
			"Personal Dev": {
				"Runescape Text": {
					type: "file",
					onDoubleClick: () => {
						Window.open("https://github.com/sircinnamon/runescape-text")
					},
					description: "A little tool and Discord Bot for emulating text from a popular MMO",
					metadata: {
						Created: "2018"
					}
				},
				"Spell Templates": {
					type: "file",
					onDoubleClick: () => {
						Window.open("https://github.com/sircinnamon/SpellTemplates")
					},
					description: "A progressive web app for doing some math checking for Dungeons and Dragons grid mechanics",
					metadata: {
						Created: "2018"
					}
				},
				"SenseHAT Listener": {
					type: "file",
					onDoubleClick: () => {
						Window.open("https://thor.sircinnamon.ca/sensehat/")
					},
					description: "A frontend public controller for an 8x8 LED grid (SenseHAT) attached to a Raspberry Pi",
					metadata: {
						Created: "2019"
					}
				},
				"rileylahd.me": {
					type: "file",
					onDoubleClick: () => {
						Window.open("https://github.com/sircinnamon/rileylahddotme")
					},
					description: "Built this site essentially from scratch using React, Babel and hosted on a Raspberry Pi",
					metadata: {
						Created: "2020"
					}
				},
			}
		}
	}
}

const EDU_HISTORY_TERMINAL = [
	{ string: "EDUCATION\n\n", bold: true, color: 2 },
	{ string: "University of Calgary ", bold: true, color: 4 },
	{ string: "[2013-2017]\n", bold: false, color: undefined },
	{ string: "\t[Calgary, AB]\n", bold: false, color: undefined },
	{ string: "\tGraduated 2017\n", bold: false, color: 6 },
	{ string: "\tBachelor of Science ", bold: true, color: 7 },
	{ string: "--", bold: false, color: 6 },
	{ string: " Computer Science\n\n", bold: true, color: 4 },
	{
		string: "Lindsay Thurber Comprehensive High School ",
		bold: true,
		color: 4
	},
	{ string: "[2008-2012]\n", bold: false, color: undefined },
	{ string: "\t[Red Deer, AB]\n", bold: false, color: undefined },
	{ string: "\tGraduated 2012\n", bold: false, color: 6 },
	{ string: "\tHonour Roll\n\n", bold: true, color: 7 }
]

const WORK_HISTORY_IDE = {
	"README.md": {
		bodyChunks: [
			{ string: "README\n\n", bold: true, color: 8 },
			{ string: "Each job is a file in the left hand sidebar, each named <jobtitle>-<company>.md!\n", color: 7 }
		]
	},
	"softwaredev-shaw.md": {
		bodyChunks: [
			{ string: "Software Developer II", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Shaw\n", bold: true, color: 11 },
			{ string: "Calgary, Alberta\n", bold: true, color: 6 },
			{ string: "[Apr 2019 – Present]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Software Developer I", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Shaw\n", bold: true, color: 11 },
			{ string: "Calgary, Alberta\n", bold: true, color: 6 },
			{ string: "[Jul 2017 – Apr 2019]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "Worked on a multipurpose team to develop internal and external facing tools. Worked with ", bold: false, color: 1 },
			{ string: "Docker, Kubernetes, NodeJS, React, ", bold: true, color: 1 },
			{ string: "and tons of other technologies. \n", bold: false, color: 1 },
			{ string: "I personally created a tool for generating ", bold: false, color: 1 },
			{ string: "LQIP", bold: true, color: 9 },
			{ string: "s (Low Quality Image Previews) dynamically with a request to an API. ", bold: false, color: 1 },
			{ string: "The images were cached for a configurable time and could linked to or embedded.", bold: false, color: 1 },
		]
	},
	"itsuppasst-cies.md": {
		bodyChunks: [
			{ string: "IT Support Asst.", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Calgary Immigrant Educational Society\n", bold: true, color: 11 },
			{ string: "Calgary, Alberta\n", bold: true, color: 6 },
			{ string: "[Jun 2016 – Aug 2016]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "As part of a summer contract, I performed full IT support for a staff of over 50 people across 2 locations. ", bold: false, color: 1 },
			{ string: "Performed all duties independently for 1 month while IT manager was on vacation. Assisted staff in setting up accounts, email, printing. ", bold: false, color: 1 },
			{ string: "Maintained ", bold: false, color: 1 },
			{ string: "SQL ", bold: true, color: 9 },
			{ string: "database. Managed server for all staff accounts and data. Relocated users and hardware.", bold: false, color: 1 },
		]
	},
	"reznettechsupport-uofc.md": {
		bodyChunks: [
			{ string: "Reznet Tech Support", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "University of Calgary\n", bold: true, color: 11 },
			{ string: "Calgary, Alberta\n", bold: true, color: 6 },
			{ string: "[Sep 2013 – Jun 2014]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "Assisted students with technical issues related to the university residence network and other basic issues.", bold: false, color: 1 },
		]
	},
	"nonrelevant-work.md":{
		bodyChunks: [
			{ string: "Cashier", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "IKEA\n", bold: true, color: 11 },
			{ string: "Calgary, Alberta\n", bold: true, color: 6 },
			{ string: "[Jun 2014 – Sep 2014]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "Helped customers scan purchases on regular and self checkout, assisted customers in finding things throughout the store, counted money and ensured the workplace was organized.", bold: false, color: 1 },
			{ string: "--\n", bold: true, color: 4 },
			{ string: "Hardlines Team Member", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Target\n", bold: true, color: 11 },
			{ string: "Red Deer, Alberta\n", bold: true, color: 6 },
			{ string: "[May 2013 - Aug 2013]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "Tasked with stocking shelves, assisting customers, working the cash register and organizing displays and shelves. Worked cooperatively with many other team members on a daily basis.", bold: false, color: 1 },
			{ string: "--\n", bold: true, color: 4 },
			{ string: "Shop Hand", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Source Energy Sales & Rentals\n", bold: true, color: 11 },
			{ string: "Blackfalds, Alberta\n", bold: true, color: 6 },
			{ string: "[Jul 2010 - Oct 2012]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "As a part time job while in high school I was tasked with cleaning the shop on the evenings and weekends, as well as doing miscellaneous labour. Occasionally ran errands and picked up office supplies etc.", bold: false, color: 1 },
			{ string: "--\n", bold: true, color: 4 },
			{ string: "Server", bold: true, color: 8 },
			{ string: " -- ", bold: false, color: undefined },
			{ string: "Tim Hortons\n", bold: true, color: 11 },
			{ string: "Red Deer, Alberta\n", bold: true, color: 6 },
			{ string: "[Nov 2008 - Jul 2010]\n", bold: false, color: 13 },
			{ string: "--\n", bold: false, color: 0 },
			{ string: "Description:\n", bold: true, color: 7 },
			{ string: "Was tasked with handling cash and operating the cash register as well as taking orders for customers and preparing their food both in the storefront and drive thru.", bold: false, color: 1 },
			{ string: "--\n", bold: true, color: 4 },
		]
	}
};

const SKILLS_IDE = {
	"README.md": {
		bodyChunks: [
			{ string: "README\n\n", bold: true, color: 8 },
			{ string: "Each skill is a file, with some extra detail stored within!\n", color: 7 }
		]
	},
	"linux.md": {
		bodyChunks: [
			{ string: "Since university I've primarily coded on Linux, specifically ", bold: false, color: 1 },
			{ string: "Arch ", bold: true, color: 7 },
			{ string: "though I have also used ", bold: false, color: 1 },
			{ string: "Debian/Raspbian ", bold: true, color: 11 },
			{ string: "a fair amount. I'm familiar with concepts like ", bold: false, color: 1 },
			{ string: "cron, systemd, bash scripting, etc.", bold: false, color: 13 },
		]
	},
	"python.md": {
		bodyChunks: [
			{ string: "Python is a personal favourite for rapid development and prototyping. ", bold: false, color: 1 },
			{ string: "I've worked extensively with both Python 2 and 3, and I am a (one time) contributor to one of the largest Python libraries, ", bold: false, color: 1 },
			{ string: "Pillow", bold: true, color: 7 },
			{ string: ". ", bold: false, color: 1 },
		]
	},
	"java.md": {
		bodyChunks: [
			{ string: "Java was the language of choice at the University, many classes required assignments to be written in Java 8", bold: false, color: 1 },
			{ string: " and while it has been a while since I wrote any Java code, I still occasionally have to read and translate it in a work capacity.", bold: false, color: 1 },
		]
	},
	"node_js.md": {
		bodyChunks: [
			{ string: "My work lately has primarily used NodeJS as the primary language and I would say it is one of my most proficient languages.", bold: false, color: 1 },
			{ string: "I've used libraries like ", bold: false, color: 1 },
			{ string: "Express, ", bold: true, color: 7 },
			{ string: "Axios, ", bold: true, color: 11 },
			{ string: "Winston, ", bold: true, color: 9 },
			{ string: "Mocha, ", bold: true, color: 6 },
			{ string: "and others, as well as writing reusable modules for my team.", bold: false, color: 1 },
		]
	},
	"golang.md": {
		bodyChunks: [
			{ string: "Go has been a newer pickup for me, harder to write but excellent at making performant and space saving code. ", bold: false, color: 1 },
			{ string: "Espescially nice when complemented with Docker to create small and highly reusable images containing a pure binary.", bold: false, color: 1 },
		]
	},
	"git.md": {
		bodyChunks: [
			{ string: "Version control is a must and I would say no tool beats Git for that. ", bold: false, color: 1 },
			{ string: "With my work I make daily use of that basics, as well as stash, branching, tagging, and via extension tools, pull requests and code reviews.", bold: false, color: 1 },
		]
	},
	"kubernetes.md": {
		bodyChunks: [
			{ string: "I have been using kubernetes for container orchestration for around 2 years and I have found it to be extremely convenient ", bold: false, color: 1 },
			{ string: "and powerful. I am familiar with both using the cluster as well as managing it as an administrator.", bold: false, color: 1 },
		]
	},
	"javascript.md": {
		bodyChunks: [
			{ string: "I have written multiple sites using pure js/html/css which I find great for smaller, single service and unchanging pages.", bold: false, color: 1 },
		]
	},
	"html+css.md": {
		bodyChunks: [
			{ string: "Obviously I have a working knowledge of web development, and have made simple sites using basic HTML and CSS.", bold: false, color: 1 },
		]
	},
	"react.md": {
		bodyChunks: [
			{ string: "I've been learning React.js to make the development of complex sites simpler to manage as a more backend-oriented person, ", bold: false, color: 1 },
			{ string: "and I've found it to be excellent, if a little complex at first. I started making this site to try and implement ", bold: false, color: 1 },
			{ string: "some more complex ideas to further my knowledge of React!", bold: false, color: 1 },
		]
	},
	"docker.md": {
		bodyChunks: [
			{ string: "My work has had me work daily with Docker to facilitate local runs while maintaining a safe environment, sharing run parameters etc. ", bold: false, color: 1 },
			{ string: "After being introduced at work I really liked the idea and behaviour and adopted it into a lot of my personal projects as well!", bold: false, color: 1 },
		]
	},
	"nginx.md": {
		bodyChunks: [
			{ string: "My work has used NGINX as the web server of choice and I quite liked it and have adopted it into my personal projects!", bold: false, color: 1 },
		]
	},
	"agile.md": {
		bodyChunks: [
			{ string: "My work has employed mostyl agile methodology at the team level, including ", bold: false, color: 1 },
			{ string: "sprint planning meetings, JIRA boards, and daily stand-ups. ", bold: false, color: 6 },
			{ string: "I think this is a great working methodology when it can be applied properly!", bold: false, color: 1 },
		]
	},
	"other.md": {
		bodyChunks: [
			{ string: "* SQL\n", bold: true, color: 13 },
			{ string: "* Tech Support\n", bold: true, color: 13 },
			{ string: "* Distributed Systems\n", bold: true, color: 13 },
			{ string: "* Github\n", bold: true, color: 13 },
			{ string: "* Hardware\n", bold: true, color: 13 },
			{ string: "* API Design\n", bold: true, color: 13 },
			{ string: "* Microsoft Office\n", bold: true, color: 13 },
		]
	},
};