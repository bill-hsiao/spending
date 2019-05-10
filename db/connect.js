const mongoose = require('mongoose')
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`

async function connect() {
  const connection = await mongoose.connect(uri, { useNewUrlParser: true })
  if (connection) {
    console.log('connected to mlab');
    return connection
  } else {
    throw 'e'
  }
}


try {
  connect()
} catch (err) {
  console.log(err);
}
