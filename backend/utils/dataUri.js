import DataUriParser from 'datauri/parser.js';
import path from 'path';

const parser=new DataUriParser();//creating an object from the DataUriParser class.

const getDataUri=(file)=>{
    const extName=path.extname(file.originalname).toString();//extname function return the extension and then we will convert  that extension into string
    return parser.format(extName,file.buffer).content;
}

export default getDataUri;

// first we are passing the file inside the getDataUri function --->








