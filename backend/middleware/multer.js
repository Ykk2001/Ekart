import multer from 'multer';

const storage=multer.memoryStorage();//Stores uploaded files in RAM (memory) instead of saving to disk

//single upload
export const singleUpload=multer({storage:storage}).single('file')

//multiple upload upto 5 images
export const multipleUpload=multer({storage}).array('files',5);//<input type="file" name="files" multiple />







//NOTES-->1)Multer is middleware for Node.js + Express used to handle file uploads

//It processes incoming requests that contain files and:
// Parses form data
// Extracts uploaded files
// Stores them (disk or memory)
// Makes them available in your route

// memoryStorage() → stores file in RAM as buffer
// .single('file') → upload 1 file → req.file
// .array('files', 5) → upload max 5 files → req.files
// Used mainly for cloud upload or processing