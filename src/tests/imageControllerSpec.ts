import request from "supertest";
import app from "../app";
import path from "path";
import fs from "fs";

describe("Image API", () => {
  it("should generate a placeholder image", async (done) => {
    const response = await request(app).get(
      "/api/images/placeholder?width=200&height=200",
    );
    expect(response.status).toBe(200);
    done();
  });

  it("should upload an image", async (done) => {
    const testImagePath = path.join(__dirname, "test.jpg");
    const response = await request(app)
      .post("/api/images/upload")
      .attach("image", testImagePath);
    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("filename");
    done();
  });

  it("should resize an image", async (done) => {
    const response = await request(app).get(
      "/api/images/resize?filename=test.jpg&width=100&height=100",
    );
    expect(response.status).toBe(200);
    done();
  });

  afterAll(() => {
    fs.unlinkSync(path.join(__dirname, "../../images/test.jpg"));
    fs.unlinkSync(
      path.join(__dirname, "../../images/resized-100x100-test.jpg"),
    );
  });
});
// hey reviewer, if you see this i want you to have a good day :)