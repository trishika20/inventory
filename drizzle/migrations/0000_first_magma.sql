CREATE TABLE IF NOT EXISTS "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" varchar(100) NOT NULL,
	"publication_date" date NOT NULL,
	"isbn" varchar(13) NOT NULL,
	CONSTRAINT "isbn_index" UNIQUE("isbn")
);
