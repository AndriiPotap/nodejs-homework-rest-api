const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const getById = async (id) => {
  const products = await listContacts();
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  return products[idx];
};

const removeContact = async (id) => {
  const data = await listContacts();
  const contact = data.filter((item) => item.id !== id);
  fs.writeFile(contactsPath, JSON.stringify(contact));
  return contact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};


module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateById,
  updateContacts,
};

