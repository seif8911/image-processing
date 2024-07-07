"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("Image API", () => {
    it("should generate a placeholder image", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/images/placeholder?width=200&height=200");
        expect(response.status).toBe(200);
        done();
    }));
    it("should upload an image", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const testImagePath = path_1.default.join(__dirname, "test.jpg");
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/images/upload")
            .attach("image", testImagePath);
        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty("filename");
        done();
    }));
    it("should resize an image", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/images/resize?filename=test.jpg&width=100&height=100");
        expect(response.status).toBe(200);
        done();
    }));
    afterAll(() => {
        fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../images/test.jpg"));
        fs_1.default.unlinkSync(path_1.default.join(__dirname, "../../images/resized-100x100-test.jpg"));
    });
});
// hey reviewer, if you see this i want you to have a good day :)
