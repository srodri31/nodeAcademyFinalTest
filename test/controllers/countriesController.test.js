const countriesController = require("../../src/controllers/countriesController");

describe("get all countries", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;

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
        mockNext = jest.fn();
    });

    it("should return 200 when countries are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await countriesController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await countriesController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("get one country", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;

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
        mockNext = jest.fn();
    });

    it("should return 200 if country is found", async () => {
        mockRequest.params.country = "FOO";
        mockModel = {
            findByPk: async (code) => Promise.resolve({code})
        }
        await countriesController.getCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if not country is found", async () => {
        mockRequest.params.country = "BAZ";
        mockModel = {
            findByPk: async (code) => Promise.resolve()
        }
        await countriesController.getCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await countriesController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("update or create country", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;

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
        mockNext = jest.fn();
    });

    it("should return 200 if it is modified", async () => {
        mockRequest.params.country = "FOO";
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code})
        }
        await countriesController.updateCreateCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 201 when doesn't exist so it is created", async () => {
        mockRequest.params.country = "BOR";
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            create: async (country) => Promise.resolve(country)
        }
        await countriesController.updateCreateCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should call error middleware if update fails", async () => {
        mockModel = {
            update: async () => Promise.reject(new Error("Problem"))
        }
        await countriesController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            create: async (country) => Promise.reject(new Error("Problem"))
        }
        await countriesController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("delete country", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;

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
        mockNext = jest.fn();
    });

    it("should return 204 when country is deleted", async () => {
        mockRequest.params.country = "FOO";
        mockModel = {
            destroy: async () => Promise.resolve(1)
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(204);
    })

    it("should return 404 if given country is not found", async () => {
        mockRequest.params.country = "BAR";
        mockModel = {
            destroy: async () => Promise.resolve(0)
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockRequest.params.country = "BAZ";
        mockModel = {
            destroy: async () => Promise.reject(new Error("Error in db"))
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    // it("should return 405 violates region foreign key", async () => {
    //     mockRequest.params.country = "FO";
    //     mockModel = {
    //         destroy: async () => Promise.resolve(0)
    //     }
    //     await countriesController.deleteCountry(mockRequest, mockResponse, () => {}, mockModel);
    //     expect(mockResponse.statusCode).toBe(405);
    // })
})