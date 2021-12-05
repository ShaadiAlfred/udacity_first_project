import app from "../index";
import request from "supertest";

describe("GET /", () => {
    it("should return hello world", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .end((err, res) => {
                expect(res.text).toEqual("Hello World");
                done();
            });
    });
});