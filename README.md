This app prototype for displaying epitope data by participant

The following layout was used as a template for displaying data.

<img src="./docs/original_layout.jpeg" style="width: 200px; height: 200px;" />

Data follows the structure below:

<img src="./prisma/ERD.svg" style="width: 200px; height: 200px;" />

## Installation and running:

1. Ensure your Docker client is running
2. Run the following commands in this directory:

   `docker-compose build`

   `docker-compose up`

Note: This does not show changes made to the code without a rebuild.

3. Open a webpage at localhost:3000

## Uninstall

Run the following command in this directory:

`docker-compose down`
