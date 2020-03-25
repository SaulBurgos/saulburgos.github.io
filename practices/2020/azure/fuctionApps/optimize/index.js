
const stream = require('stream');
const Jimp = require('jimp');


//https://github.com/Azure/azure-sdk-for-js
//https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-storage-blob/12.1.1/index.html
// const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
// const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
// const blobServiceClient = new BlobServiceClient(
// 	`https://${account}.blob.core.windows.net`,
// 	sharedKeyCredential
// );

//TODO: We are using SDK v2, we need to improve this using the newer version (see the up)
//https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs
const storage = require('azure-storage');
const account = "";
const accountKey = "";
const blobService = storage.createBlobService(account, accountKey);

//https://stackoverflow.com/questions/49432579/await-is-only-valid-in-async-function
//http://xreactive.com/post/Azure/5d6849685b650500155db75e/How-to-create-thumbnail-using-JIMP-and-upload-to-Azure-blob-storage
const uploadImageToBlob = async (containerName, pathBlobName, file, lenght, options) => {
	let promise = new Promise((resolve, reject) => {

		blobService.createBlockBlobFromStream(containerName, pathBlobName, file, lenght, options, err => {
			if (err) {
				reject(err);
			} else {
				resolve({
					uploaded: 'successed',
				});
			}
		});

	});
	return promise;
};

const readImage = async function (currentBlob) {
	return Jimp.read(currentBlob);
}

const getBufferStream = async function (jimpFile) {

	let promise = new Promise((resolve, reject) => {

		jimpFile.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
			const readStream = stream.PassThrough();
			readStream.end(buffer);

			resolve({
				buffer: buffer,
				readStream: readStream
			});
		});
	});

	return promise;
}

const resizeImage = async function (jimpFile, width) {

	let promise = new Promise((resolve, reject) => {

		let jimFileClone = jimpFile.clone(); //because you can not undo a operation
		jimFileClone.resize(width, Jimp.AUTO, Jimp.RESIZE_BEZIER);
		jimFileClone.quality(90);

		getBufferStream(jimFileClone).then((buffer) => {
			resolve(buffer);
		});

	});

	return promise;
}

const resizeAndUpload = async function (containerName, jimpFile, currentBlobName, width, optionsBlob) {

	let promise = new Promise((resolve, reject) => {

		resizeImage(jimpFile, width).then((imageResized) => {

			uploadImageToBlob(
				containerName,
				currentBlobName,
				imageResized.readStream,
				imageResized.buffer.length,
				optionsBlob
			).then(() => {
				resolve();
			});

		});

	});

	return promise;
}

const uploadToContainer = async function(containerName,jimpFile,currentBlobName,optionsBlob) {
	let promise = new Promise((resolve, reject) => {

		let jimFileClone = jimpFile.clone(); //because you can not undo a operation
		jimFileClone.quality(90);

		getBufferStream(jimpFile).then((buffer) => {
			
			uploadImageToBlob(
				containerName,
				currentBlobName,
				buffer.readStream,
				buffer.buffer.length,
				optionsBlob
			).then(() => {
				resolve();
			})

		});
	});

	return promise;
}


const getBlobNameWithPath = function (path, subfix, blobName) {
	let finalName = '';

	if(subfix == '') {
		finalName = path + blobName[0] + '.' + blobName[1];
	} else {
		finalName = path + blobName[0] + '_' + subfix + '.' + blobName[1];
	}
	return finalName;
}

module.exports = function (context, myBlob) {
	let blobName = context.bindingData.blobTrigger.split('/')[1];
	blobName = blobName.split('.');
	blobName[1] = blobName[1].toLocaleLowerCase();
	var optionsBlob = { contentSettings: { contentType: 'image/jpeg' } };

	readImage(myBlob).then((jimpFile) => {

		//let promiseOriginal = uploadToContainer('upload-temp-destiny', jimpFile,  getBlobNameWithPath('', '', blobName),optionsBlob);
		let promiseOriginal = resizeAndUpload('upload-temp-destiny', jimpFile, getBlobNameWithPath('', '', blobName), jimpFile.bitmap.width, optionsBlob);
		let promise1 = resizeAndUpload('upload-temp-destiny', jimpFile, getBlobNameWithPath('', '4096', blobName), 4096, optionsBlob);
		let promise2 = resizeAndUpload('upload-temp-destiny', jimpFile, getBlobNameWithPath('', '2048', blobName), 2048, optionsBlob);
		let promise3 = resizeAndUpload('upload-temp-destiny', jimpFile, getBlobNameWithPath('', '1024', blobName), 1024, optionsBlob);

		Promise.all([promiseOriginal, promise1, promise2, promise3]).then(() => {
			context.done();
			return;
		});

	}).catch((err) => {
		context.done();
		return;
	});

};

//context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");


