# Top Rick and Morty

During the implementation of this exercise I prioritized robustness, code testability and client-server performance. For the styling, I modified the Materio MUI template. The` @core` folder contains stripped down code from Materio.

Live demo here: https://top-rickandmorty.vercel.app

-------
## How to run in local

- Prerequisites: `docker`

### Instructions

1. Clone this repository with **git** and open the terminal inside the downloaded folder.
2. Run the following command: `./run.sh`
3. When the output shows the message *"Listening on port 3000"*, open your browser and go to http://localhost:3000

### Troubleshooting

Make sure your port 3000 is free, your internet connection is stable and and you have enough space and memory to run Docker.

---------------
## Known Issues

There is some flickering on the rendering that is more apparent on Vercel. In local usually doesn't show.

---------------
## Development environment

The previous method is indicated to run a production-like environment on your local machine. This is ideal for doing QA of the project, and for identifying issues that would show up in the CI pipeline or in production only. But unfortunately, it's not the best experience for development.

If you'd like to start a dev-friendly environment, I'd recommend you to use the standard **npm** commands for **Next.js** projects:

- `npm run dev`
- `npm test`

-----------------

## Check some of my other open sourced projects:

- [display-sim](https://github.com/theypsilon/display-sim): Lit, WASM, Rust, and WebGL experimental simulation that runs on the browser but can also run on native targets.
- [MiSTer Downloader](https://github.com/MiSTer-devel/Downloader_MiSTer/): Package Manager written in Python with strong emphasis on robustness, performance and security, designed for the *MiSTer FPGA* ecosytem.
