/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const { DB_HOST, PORT = 5000 } = process.env;

const app = require("../../app");

describe("test login routes", () => {
	beforeAll(() => {
		mongoose.connect(DB_HOST).then(() => (server = app.listen(PORT)));
	});
	afterAll(() => server.close());

	test("test send login ", async () => {
		const loginUser = {
			password: "123456",
			email: "user5@mail.com",
		};

		const response = await request(app)
			.post("/api/users/login")
			.send(loginUser);

		const { token, user } = response.body.data;

		expect(response.statusCode).toBe(200);
		expect(token).toBeTruthy();
		expect(user).toBeDefined();
		expect(typeof user.email).toBe("string");
		expect(typeof user.subscription).toBe("string");

		// done();
	});
});
