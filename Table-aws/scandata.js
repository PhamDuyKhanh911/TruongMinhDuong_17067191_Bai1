const AWS = require('aws-sdk');
var secret = require('../secret/ASW');
AWS.config.update({
  region: "us-east-2",
    endpoint: "http://dynamodb.us-east-2.amazonaws.com",
    accessKeyId: "", secretAccessKey:"" ,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: 'Students',
};
console.log('Scanning Users table.');

docClient.scan(params, onScan);
function onScan(err, data) {
  if (err) {
    console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Scan succeeded.');
    data.Items.forEach((user) => {
      console.log(user.HoTen, user.MSSV);

    });

    if (typeof data.LastEvaluatedKey !== 'undefined') {
      console.log('Scanning for more...');
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    }
  }
}
