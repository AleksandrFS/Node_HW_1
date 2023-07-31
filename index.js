const { program } = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getAll();
      return console.table(allContacts);
    case "get":
      const findContact = await contacts.getById(id);
      return console.table(findContact);
    case "add":
      const newContact = await contacts.add({ name, email, phone });
      return console.table(newContact);

    case "update":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.table(updateContact);

    case "remove":
      const deletedContact = await contacts.removeById(id);
      return console.table(deletedContact);
    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();
invokeAction(options);
