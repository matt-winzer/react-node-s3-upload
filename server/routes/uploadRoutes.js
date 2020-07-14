const express = require('express');
const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const keys = require('../../config/keys');
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

router.get('/', (req, res) => {
  const { type } = req.query;
  const extension = type.slice(6);
  // generate key (filename)
  // check authentication & use actual user id in real app (rather than 1234)
  const key = `${1234}/${uuid()}.${extension}`;

  // get presigned url from s3
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'savvored-bucket',
      ContentType: type,
      Key: key,
    },
    (err, url) => res.json({ key, url })
  );
});

module.exports = router;
