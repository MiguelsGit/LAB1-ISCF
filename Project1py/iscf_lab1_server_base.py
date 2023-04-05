from flask import Flask
from flask_restful import Resource, Api, reqparse, request
from requests import post
import pyrebase

config = {
  "apiKey": "AIzaSyCo87-qBRJHu-g0mWlvAgBwG__-7L9yF00",
  "authDomain": "iscf-bd030.firebaseapp.com",
  "projectId": "iscf-bd030",
  "databaseURL": "https://iscf-bd030-default-rtdb.europe-west1.firebasedatabase.app/",
  "storageBucket": "iscf-bd030.appspot.com",
  "messagingSenderId": "729663094041",
  "appId": "1:729663094041:web:ac3454eb30833d65d61988",
  "measurementId": "G-LD4L5HJQ6T"
}

firebase = pyrebase.initialize_app(config)
database = firebase.database()
auth = firebase.auth()

def push_data(data):
    print(data)
    database.child("accelaration").push(data)
    # implementation of push_data function to store data in Firebase

# TODO LAB 1 - Implement the API resource (Accel) that should at least handle POST requests with the data to be stored.
class Accelaration(Resource):
    def post(self):
        data = request.get_json() # get the JSON data from the request
        push_data(data) # store the data in Firebase
        return 201 # return the stored data and a 201 status code

# TODO LAB 1 - add api resource and corresponding /data route to receive a JSON object with the data to be stored
app = Flask(__name__)
api = Api(app)
api.add_resource(Accelaration, '/data')

# TODO LAB 1 - Add your main section here
if __name__ == '__main__':
    app.run(debug=True)

