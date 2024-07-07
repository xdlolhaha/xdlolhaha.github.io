const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express(); // Use your existing app instance
const port = 3000; // Use your existing port or the one you're using

// Set up storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// EJS
app.set('view engine', 'ejs'); // If not already set

// Public folder
app.use(express.static('./public')); // If not already set

// Routes
app.get('/upload', (req, res) => res.render('upload', { msg: '', file: '' }));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('upload', { msg: err, file: '' });
    } else {
      if (req.file == undefined) {
        res.render('upload', { msg: 'Error: No File Selected!', file: '' });
      } else {
        const imageUrl = `/uploads/${req.file.filename}`;
        const discordEmbedLink = `https://your-domain.com${imageUrl}`;
        res.render('upload', {
          msg: 'File Uploaded!',
          file: discordEmbedLink
        });
      }
    }
  });
});

// Listen on the appropriate port
app.listen(port, () => console.log(`Server started on port ${port}`)); // Use your existing listen method
