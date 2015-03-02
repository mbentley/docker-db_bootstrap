# docker-db_bootstrap

Example of how to bootstrap a MySQL database with a .sql file while using docker-compose.

## Instructions

### Environment Setup
  - Install docker-compose (http://docs.docker.com/compose/install/)
  - Install Docker
    - Install Docker natively on a linux host (http://docs.docker.com/installation/)
    - If you are not running linux (OS X or Windows), install boot2docker (http://boot2docker.io/)
      - Start your boot2docker VM and ensure Docker is available (i.e. - `docker ps` returns properly)

### Customization (optional)
  - Place your .sql file in the `bootstrap` directory
  - In `docker-compose.yml`, update the `SQLFILE` environment variable to your match your .sql filename

### Using docker-compose
  - Execute `docker-compose up` to launch the docker containers in attached mode
    - Alternatively, you may use `docker-compose up -d` to run docker-compose in detached mode
    - In detached mode, use `docker-compose logs` to view the logs

  - To stop the docker containers, use CTRL+c in attached mode 
    - Use `docker-compose stop` if you ran docker-compose in detached mode
    - Note: If you run a `docker-compose up` after stopping; docker-compose will re-attach the database volume so your data in MySQL will persist.  To clear the database, you will either have to remove any databases manually or remove the docker containers (see below for instructions)

  - To remove the docker containers created by docker-compose, use `docker-compose rm -v`
    - The `-v` is important as extra volumes are added by the MySQL docker image so `-v` removes them

  - To rebuild the docker images, use `docker-compose build`
    - This is required if you modify your application code or your .sql file for bootstrapping since they are included in the images

### Getting a list of environment variables from the db container
  - Start the docker containers using `docker-compose up` as seen above
  - Manually run a docker container with the following command:
    - `docker run --rm --link dockerdbbootstrap_db_1:db mysql:latest env`

### Bootstrapping an empty database
  - If you just want an empty database, the `mysql` image can already do that for you.  Utilize the commented out variables in the `docker-compose.yml` (`MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD`).  You should then comment out the `bootstrap` section of the `docker-compose.yml` file so that the `bootstrap` container doesn't run unless you still want to bootstrap data into the empty database.
