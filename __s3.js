const aws = require("aws-sdk")
const { v4: uuid } = require("uuid")
const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
	region: "ap-south-1",
	accessKeyId,
	secretAccessKey,
	signatureVersion: "v4"
})

const generateUploadURL = async () => {
	const imageName = uuid()
	const params = {
		Bucket: bucketName,
		Key: imageName,
		Expires: 60
	}
	const uploadURL = await s3.getSignedUrlPromise("putObject", params)
	return uploadURL
}

module.exports = generateUploadURL
