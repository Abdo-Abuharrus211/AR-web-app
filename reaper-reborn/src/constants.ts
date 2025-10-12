const isProduction = process.env.NODE_ENV === 'production';

const APIBaseURL = isProduction
    ? process.env.API_BASE_URL
    : 'http://localhost:5000'


export {APIBaseURL, isProduction}