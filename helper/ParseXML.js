const convertXML = require('xml2json');

function parseXml(xml) {
  const dataJSON = convertXML.toJson(xml);
  return dataJSON;
}

module.exports = parseXml;
