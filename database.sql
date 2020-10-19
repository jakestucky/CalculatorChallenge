---DATABASE SETUP QUERIES ----

CREATE TABLE "calc_history" (
    "id" SERIAL PRIMARY KEY,
    "firstNumber" VARCHAR (80) NOT NULL,
  "mathOperator" VARCHAR (80) NOT NULL,
  "secondNumber" VARCHAR (80) NOT NULL,
    "solution" VARCHAR (80) NOT NULL,
    "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
   ;
   
   INSERT INTO "calc_history" 
    ("firstNumber", "mathOperator", "secondNumber","solution")
    VALUES ('2', '*', '3', '4');
    
 SELECT * FROM "calc_history" ORDER BY "time" DESC LIMIT 10;
 
 DROP TABLE "calc_history";
 
 CREATE TABLE "calc_history" (
    "id" SERIAL PRIMARY KEY,
    "firstNumber" VARCHAR (80) NOT NULL,
  "mathOperator" VARCHAR (80) NOT NULL,
  "secondNumber" VARCHAR (80) NOT NULL,
    "solution" VARCHAR (80) NOT NULL,
    "time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
   ;