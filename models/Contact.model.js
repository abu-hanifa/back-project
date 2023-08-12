const mongoose = require('mongoose')

const ContactShema = mongoose.Schema(
    
    {
        contacts: []
      
    }

)
const Contact = mongoose.model('Contact',ContactShema )
module.exports = Contact
