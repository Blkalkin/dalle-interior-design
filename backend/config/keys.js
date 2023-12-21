module.exports = {
    secretOrKey: process.env.SECRET_OR_KEY,
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    awsBucketName: process.env.BUCKET_NAME,
    awsBucketRegion: process.env.BUCKET_REGION,
    awsAccess: process.env.ACCESS_KEY,
    awsSecret: process.env.SECRET_ACCESS_KEY
}