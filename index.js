const db = require('./contacts');
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const list = await db.listContacts();
      return console.log(list);

    case 'get':
      const get = await db.getContactById(id);
      return console.log(get);

    case 'add':
      const add = await db.addContact(name, email, phone);
      return console.log(add);

    case 'remove':
      const remove = await db.removeContact(id);
      return console.log(remove);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);