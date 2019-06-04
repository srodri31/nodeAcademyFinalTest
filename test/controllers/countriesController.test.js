const countriesController = require("../../src/controllers/countriesController");

describe("get all countries", () => {
    let mockResponse;
    let mockRequest;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            body: {}
        };
    });

    it("should return 200", async () => {
        await countriesController.all(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(200);
    })
})

describe("get one country", () => {
    let mockResponse;
    let mockRequest;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            params: {},
            body: {}
        };
    });

    it("should return 200", async () => {
        mockRequest.params.country = "CO";
        await countriesController.getCountry(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if not found", async () => {
        mockRequest.params.country = "BOR";
        await countriesController.getCountry(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(404);
    })
})

describe("update country", () => {
    let mockResponse;
    let mockRequest;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            params: {},
            body: {}
        };
    });

    it("should return 200", async () => {
        mockRequest.params.country = "CO";
        await countriesController.getCountry(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if not found", async () => {
        mockRequest.params.country = "BOR";
        await countriesController.getCountry(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(404);
    })
})