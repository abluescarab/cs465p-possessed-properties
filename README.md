# Possessed Properties
Welcome to **Possessed Properties**! May we interest you in a haunted home for you and your family?

*Possessed Properties is my term project for Full Stack Web Development at Portland State University.*

## How to run the project
### Prerequisites
* You will need [Docker](https://www.docker.com/), [PostgreSQL](https://www.postgresql.org/), and [pnpm](https://pnpm.io/) installed.
* PostgreSQL will need a user named "admin" with the password "password".
* Close any other servers on the internal ports 88, 5432, 8080, 9000, or 9001.

### Steps
1. Clone this repository to a local directory with `git clone`.
2. In a terminal, `cd` into the directory and run `docker compose up`.
3. In a terminal connected to the `backend` Docker instance, run the command `pnpm db:reset`.

You may now connect to the website at http://localhost:88.
