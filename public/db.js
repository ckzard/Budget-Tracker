const { get } = require("mongoose");

let db;

const request =  indexedDB.open("budget", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    //make a new objectstore or basically table called pending and set auto increment to true
    db.createObjectStore("pending", {autoIncrement: true})
}

request.onsuccess = (event) => {
    db = event.target.result;

    //check if online then check db
    if (navigator.onLine) {
        checkDatabase();
    }
}

request.onerror = (event) => {
    //log error if we can't connect
    console.log("We have encountered an error...." + event.target.errorCode)
}

const saveRecord = (record) => {
    // make a transaction in pending table and give it readwrite permissions
    const transaction = db.transaction(["pending"], "readwrite");
    // access pending
    const store = transaction.objectStore("pending");
    // add the record
    store.add(record)
}

const checkDatabase = () => {

    const transaction = db.transaction(["pending"], "readwrite");

    const store = transaction.objectStore("pending");
    //get all records and store in const
    const getAll = store.getAll();
}
