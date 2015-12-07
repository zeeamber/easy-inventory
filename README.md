# easy-inventory

REST API for mobile applications using Node.js and Express.js framework with Mongoose.js for working with MongoDB. For access control this project use OAuth 2.0, with the help of OAuth2orize and Passport.js.


## Running project

You need to have installed Node.js and MongoDB 

### Setup project 

To setup project enter project folder and run following command:
```
sh setup.sh
```

### Make Requests

Creating User and Client:
```
http POST http://localhost:3000/users/register  username=user1234 password=abc1234
http POST http://localhost:3000/clients/register  name=androidClient clientId=client2645
```

Creating and refreshing access tokens:
```
http POST http://localhost:3000/oauth/token grant_type=password client_id=client2645 client_secret=your_client_secret username=user1234 password=abc1234
http POST http://localhost:3000/oauth/token grant_type=refresh_token client_id=client2645 client_secret=your_client_secret refresh_token=REFRESH_TOKEN
```

Adding a new product:
```
http POST http://localhost:3000/api/products accessToken=Your_Access_Token title='OnePlus One' description='Sandstone Black, 64 GB' price=2190 quantity=150
```
Refer API Documentation to know about more APIs.
