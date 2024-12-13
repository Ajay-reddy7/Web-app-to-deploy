// Backend: Express Server



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://ajayreddyvanga:EQ5Nw4QuUUbvSDT0@cluster0.gfhav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Schema and Model
const formSchema = new mongoose.Schema({
  name: String,
  age: Number,
  comment: String,
});

const Form = mongoose.model('Form', formSchema);

// API Route
app.post('/submit', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving form' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
