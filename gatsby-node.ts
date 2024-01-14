const axios = require('axios');
const fs = require('fs');
import { writeFile } from 'node:fs';

exports.onPreBootstrap = async () => {
  const indices = await axios.get(
    'https://bestat.statbel.fgov.be/bestat/api/views/421fe907-cf4c-4399-a89a-f6e2c4e4c66d/result/JSON',
  );

  // console.log(indices.data.facts)

  const formattedIndices = {
    "facts":
      indices.data.facts.map((index: any) => ({
        Year: index.Year,
        Month: index.Month?.split(' ')[0],
        "Base year": index["Base year"]?.split(' ')[0],
        "Health index": index["Health index"],
      }))
  }


  writeFile('./src/formula/indices.json', JSON.stringify(formattedIndices, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    console.log('The file has been saved!');
    console.log('The file has been saved!');
    console.log('The file has been saved!');
  });


  // fs.writeFileSync('./src/formula/indices.json', JSON.stringify(formattedIndices, null, 2), 'utf8');
};
