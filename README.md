# Expenses Tracker
A Django-React-Framework/React.JS based expenses tracking app, written for an interview take-home exercise.

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

## Point of interest

Note that Django backend exports the entire schema for the REST API to a file to `client/src/api/swagger.js`. This is picked up by the front end, which uses *swagger.js* to construct an Javascript API. So for example

	api.expenses.expenses_list()

fires `GET /expenses`.

On top of this, I built a generic API-action processor in `sagas.js` which 

1. listens to 'CALL_API' actions
2. makes an appropriate call to the swagger API (although, the API could be any object containing functions)
3. normalizes the response data, if a normalizr schema is provided
4. dispatches actions on request success/failures
5. dispatches any additional actions specified

This allows for `actions/index.js`, in which one-line action-creators can be created to fire off the relatively common process of "call this API, dispatch some actions, get the data", instead of relatively complicated thunks/sagas for every single API endpoint.

