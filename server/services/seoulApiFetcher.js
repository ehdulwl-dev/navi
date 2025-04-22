const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();

async function fetchSeoulJobs() {
  const API_URL = `http://openapi.seoul.go.kr:8088/43667249786d79653839584d757553/xml/GetJobInfo/1/1000/`;
  const { data } = await axios.get(API_URL, { responseType: 'text' });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(data);

  return parsed.GetJobInfo.row;
}

async function fetchEducationData() {
  const API_URL = `http://openapi.seoul.go.kr:8088/70784e5a706d7965313136596f7a416e/xml/jobEduCenterOpenInfo/1/1000/`;
  const { data } = await axios.get(API_URL, { responseType: 'text' });
  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(data);

  return parsed.jobEduCenterOpenInfo.row;
}

  
module.exports = {
fetchSeoulJobs,
fetchEducationData,
};
