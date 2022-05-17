# Trust Framework
A trust framework for self-sovereign identity systems.

## Example
The example scenario showcases the working of the framework against the scenario described in the master's thesis.

## Setup

Get a GNUnet source tarball (or build one using `make dist`) and place it here as `tem/gnunet.tar.gz`.

Build the gnunet container via `cd tem/ && docker build -t gnunet . && docker-compose up -d`

Start setup via `docker-compose up --build`
