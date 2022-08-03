# Top Rick and Morty
## How to run on local

- Prerequisites: `docker`

### Instructions

1. Clone this repository with **git** and open the terminal inside the downloaded folder.
2. Run the following command: `./run.sh`
3. When the output shows the message *"Listening on port 3000"*, open your browser and go to http://localhost:3000

### Troubleshooting

Make sure your port 3000 is free, your internet connection is stable and and you have enough space and memory to run Docker.


---------------
## Development environment

The previous method is indicated to run a production-like environment on your local machine. This is ideal for doing QA of the project, and for identifying issues that would show up in the CI pipeline or in production only. But unfortunately, it's not the best experience for development.

If you'd like to start a dev-friendly environment, I'd recommend you to use the standard **npm** commands for **Next.js** projects:

- `npm run dev`
- `npm test`
