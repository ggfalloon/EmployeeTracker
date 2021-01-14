USE emp_trackerDB;

INSERT INTO department
VALUES (01, "Marketing"), (02, "Human Resources"), (03, "Sales"), (04, "Engineering");

INSERT INTO role
VALUES (11, "Marketing Specialist", 85000, 01), (12, "HR Director", 75000, 02), (13, "Sales Manager", 95000, 03), (14, "Software Engineer", 110000, 04);

INSERT INTO employee
VALUES (21, "Brad", "Pitt", 12, null), (22, "Beyonce", "Knowles", 11, 21), (23, "Brenda", "Song", 13, 22), (24, "Seth", "Rogan", 14, null);