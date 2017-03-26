# s3-signature
This server returns the credentials and data necessary for performing a browser based upload (POST) to [AWS s3](http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-UsingHTTPPOST.html).  This server is intended to be used with [s3-uploader](https://github.com/jstiehl/s3-uploader) client app but can be used independently.

#Running App
To run the app

1. Clone this repo locally.
2. Navigate to the root directory of the project on your local machine.
3. Run `npm install` to install dependencies
4. Create a `.env` file at the root of the project. The `.env` file is what you will use to configure your this project to use your AWS credentials, s3 Bucket and AWS region.  The following is an example of the required parameters that you will need to enter into your `.env` file:
```
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
BUCKET=YOUR_BUCKET_NAME
REGION=AWS_REGION_FOR_YOUR_BUCKET
```
5. Server can then be started by running `node server.js` in the command line at the root of the project directory.
