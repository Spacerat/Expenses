# Expenses Tracker

## Installation

#### To set up the Django backend

	$ mkdir gigstertest
	$ cd gigstertest
	$ git clone https://github.com/Spacerat/Expenses
	$ virtualenv env
	$ source env/bin/activate
	$ cd Expenses
	$ pip install -r requirements.txt

#### To run the backend

	$ python manage.py runserver

#### To set up the client

	$ cd client
	$ npm install

#### To run the client

	$ export NODE_PATH="src/"
	$ npm start

The variable is required to enable absolute imports in the code.

Assuming that the Django server actually gets run on port 8000, everything should now be working fine.

## Usage

The sqlite database comes shipped with some test data and some users, namely: 

- admin:adminadmin
- Bob:bobsburgers
- joe:joejoejoe

Bob is a standard user with the most expenses. Admin and joe are admins, with only a few.

## To run the tests

Currently there are only backend tests.

	$ python manage.py test