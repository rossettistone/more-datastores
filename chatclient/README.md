# SQL

You've already learned to store data for your server-side applications "in-memory", using JavaScript variables. Most web applications need some form of persistance--i.e. to remember users' data even after the server is restarted. In this assignment, you'll learn how to store data using SQL (Structured Query Language) to interact with a relational database.

First you'll experiment with defining table schema and writing queries; then, you'll use what you learned to add persistence to your Node chat server from the previous assignment. The new version of your server should use MySQL to store and retrieve chat messages, as well as any other data you'd like to persist.

## Relevant documentation
* [Introduction to SQL tutorial](http://www.sqlcourse.com/intro.html)
* [MySQL CREATE TABLE reference docs](https://dev.mysql.com/doc/refman/5.1/en/create-table.html)
* [MySQL SELECT reference docs](https://dev.mysql.com/doc/refman/5.0/en/select.html)
* [MySQL INSERT reference docs](http://dev.mysql.com/doc/refman/5.5/en/insert.html)
* [Node mysql module docs](https://github.com/felixge/node-mysql)
* [Executing SQL statements from a file](https://dev.mysql.com/doc/refman/5.0/en/batch-commands.html)

## What's in this repo
* `schema.sql` is a skeleton schema file. In this file you should write one or more `CREATE TABLE` statements that will define the structure of your database tables. You can then create the tables for real by running the schema file on the command line.
  * note: if you run your SQL code from this file, and find a bug in the schema or how it was generated, you'll want to "drop" all the new tables before running it again. This will reset your database by throwing away all data and schema information, to give you a blank slate before re-running your improved version of the SQL code.
* `persistent_server.js` will be the main file of your Node server code, just like `basic-server.js` in the previous assignment. It includes some code showing how to use Node's `mysql` module to connect to the database.
* `spec` contains a Jasmine spec for testing your Node server's ability to read and write the database. This spec is not complete! It contains several lines commented with "TODO". You'll need to customize those lines to match the details of the database tables you create.

## Your goals

You should:
* Learn how to do SQL queries using the four basic statements - SELECT, INSERT, UPDATE, and DELETE. Read [SQLCourse.com](http://www.sqlcourse.com/intro.html) and do their example SQL query exercieses on the dummy dataset they provide.
* Learn how to design schema for SQL tables. Use [WWW SQL Designer](http://ondras.zarovi.cz/sql/demo/) to design the schema for storing data about each of these sites:
  * Twitter
  * a public library
  * a sports score tracking site
  * a geneology tree site
* Now that the tutorials have given you an overview of SQL, try it out on a real database! MySQL should be set up on your machine. Get a username and password and figure out how to log into MySQL on the command line. Choose one of your schema designs from the previous step and create the table using the CREATE TABLE statement. Then INSERT some made-up data into it and SELECT the data back out.
* Design a schema to hold data for your chat application. Edit the file `schema.sql` to define the table (or tables) you want, then run that file to create the database and the table. Log into MySQL from the command line again and use DESCRIBE TABLE to verify that it was created correctly.
* You'll need the `mysql` module for Node to be able to talk to MySQL. Install it using `sudo npm install -g mysql`.
* Take a look at the tests in `spec/LiveSpec.js`. Before you start hacking on your persistent server, read the tests and try to understand what they're trying to do. The tests depend on your database username and password, and also on the details of the schema you created, so you will need to customize the spec file with some of these details before it will be able to run.
* Put all the pieces together to create a persistent SQL-backed chat application! Use `persistent_server.js` as your main file. You can copy over js files from your nodechat assignment and `require` them into `persistent_server.js`. Have your server connect to MySQL, and use the database connection to store data as messages come in.
  * Note: This will mean you remove the in-memory messages array that used to store your data as part of the node process. Every new message will result in a write to the database, and every request for data will result in a read. You should no longer need to cache any of that data in memory as part of the application.
* Test your server's persistence: Send some chat messages to your server, then stop Node. Start your server up again, connect to it with the client, and see whether the messages you sent last time are still there! Finally, make all the unit tests pass.

Extra credit:

* Add a users table to your database. Make up some settings that a user can change, such as text color, font, witty sign-off message, etc. Store these settings in the users table, and when the user returns, make sure to recognize them and apply their settings.
* But wait - it's bad database design to store the same piece of data, such as a username, in multiple tables. Store the username ONLY in the users table, and use a foreign key to relate messages to the user who said them.
* What's that? You need to make changes to the table schema, but there's already precious user data stored in those tables that must not be lost? If you were to DROP the table and re-CREATE, your users would be furious! Time to teach yourself the ALTER TABLE command.
* Add a search feature! Make a page where you can type in a user's name and see everything that they've said, or type in a quotation from a message and find out which user said it.
* Let me password-protect my chat username so other people can't impersonate me. Add a password column to the users table, and create an interface for a user to register their username and password. Show an error message to anybody who tries to use a registered username without knowing the right password.
* Read up on indexing, and Investigate how it can improve the performance of your queries. Profile a query against a non-primary column. Then index the column and re-run. Optionally, profile similar lookups in a non-relational db.
