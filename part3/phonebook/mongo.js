const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://db_user:${password}@cluster0.eh5bu.mongodb.net/phone_book?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  created: { type: Date, default: Date.now },
  modified: Date,
  id: Number,
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number
  });
  person
    .save()
    .then((result) => {
      console.log("person saved!", result);
      mongoose.connection.close();
    })
    .catch((e) => console.log(e));
} else if (!name && !number) {
  Person.find({}).then((result) => {
    const n = result.length;
    if (n) {
      console.log(
        `${n} ${n > 1 ? "people were" : "person was"} returned.\nphonebook:`
      );
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    } else {
      console.log("No data was returned.");
    }
    mongoose.connection.close();
  });
}
