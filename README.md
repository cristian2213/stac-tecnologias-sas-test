<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Stac Tecnologias Sas Test</h3>

  <p align="center">
    "Fast Buy Company"
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a> -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<a id="about-the-project"></a>
This's a test project to get hired as Back-end Developer in Node.js, This one implements the basic logic to commit authentication with email and password, also It contains the basic functionalities to list products, query products by categories, functionalities of roles, verification by JWT, creation of orders with billing details and packaging processes.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

<a id="built-with"></a>
These are the technologies with which this project is being built, I had thought to develop it with Nest.js, but I will leave it for another project.

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize-cli](https://sequelize.org/master/manual/migrations.html)
- [Docker-compose](https://docs.docker.com/compose/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

<a id="getting-started"></a>
First, make sure you have the following dependencies with this version or a newer one.

### Prerequisites

<a id="prerequisites"></a>

- node & npm
  ```sh
  v16.13.1 & v8.1.2
  ```
- Docker & Docker-compose

### Installation

<a id="installation"></a>
_To run this project with DOCKER, please follow the steps below._

1. Clone the repo
   ```sh
   git clone https://github.com/cristian2213/stac-tecnologias-sas-test.git
   ```
2. Run the Docker container
   ```sh
   # This command create a docker container to run MySQL
   docker-compose up -d
   ```
3. Create a .env file in the root and paste this variables:
   ```js
   APP_HOST = localhost;
   APP_PORT = 8000;
   JWT_SECRET = your_secret_important;
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Run the migrations

   ```sh
   npx sequelize-cli db:migrate

   # If you have problems, you can try again with this command👇
   npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate
   ```

6. Run the seeders

   ```sh
   npx sequelize-cli db:seed:all

   # If you have problems, you can try again with this command👇
   npx sequelize-cli db:seed:undo:all && npx sequelize-cli db:seed:all
   ```

7. Run the server

   ```sh
   # To run in production mode
   npm run start

   # To run in development mode
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<a id="usage"></a>
_Test Users:_
1. Use these users to query the API using POSTMAN to do authentication, the file POSTMAN is found in the root is this project:
```js
const adminUser = {
  name: 'admin',
  email: 'admin@admin.com',
  password: 'admin123A@',
};
const customerUser = {
  name: 'customer',
  email: 'customer@gmail.com',
  password: 'customer123A@',
};
```

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- ## Roadmap

<a id="roadmap"></a>

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## Contributing

<a id="contributing"></a>
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

<a id="license"></a>
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

<a id="contact"></a>
My Linkedin: [https://www.linkedin.com/in/cristian-johany/](https://www.linkedin.com/in/cristian-johany/)

<p align="right">(<a href="#top">back to top</a>)</p>
