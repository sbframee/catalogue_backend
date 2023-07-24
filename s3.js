const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { v4 } = require("uuid")
const path = require("path")

const bucketName = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const client = new S3Client({
	region: "ap-south-1",
	credentials: {
		accessKeyId,
		secretAccessKey
	}
})

const getObjectURL = async key => {
	const command = new GetObjectCommand({
		Bucket: bucketName,
		Key: key
	})
	const url = await getSignedUrl(client, command, { expiresIn: 100 })
	return url
}

const putObjectURL = async (filename, contentType) => {
	console.log({ filename, contentType })
	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: v4() + path.extname(filename),
		ContentType: contentType
	})
	const url = await getSignedUrl(client, command, { expiresIn: 100 })
	return url
}

const deleteObject = async key => {
	const command = new DeleteObjectCommand({
		Bucket: bucketName,
		Key: key
	})
	await client.send(command)
}

module.exports = { getObjectURL, putObjectURL, deleteObject }
