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

    it("should return 404 if no country is found", async () => {
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

    it("should return 204 when country is deleted because it has no regions", async () => {
        mockRequest.params.country = "FOO";
        mockModel = {
            destroy: async () => Promise.resolve(1),
            findOne: async () => Promise.resolve()
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(204);
    })

    it("should return 404 if given country is not found", async () => {
        mockRequest.params.country = "BAR";
        mockModel = {
            destroy: async () => Promise.resolve(0),
            findOne: async () => Promise.resolve()
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should return 405 when it violates region foreign key", async () => {
        mockRequest.params.country = "FO";
        mockModel = {
            destroy: async () => Promise.resolve(0),
            findOne: async () => Promise.resolve({code: "region"})
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, () => {}, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if delete fails", async () => {
        mockRequest.params.country = "BAZ";
        mockModel = {
            destroy: async () => Promise.reject(new Error("Error in db")),
            findOne: async () => Promise.resolve()
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if select regions fails", async () => {
        mockRequest.params.country = "BAZ";
        mockModel = {
            findOne: async () => Promise.reject(new Error("Error in db"))
        }
        await countriesController.deleteCountry(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})