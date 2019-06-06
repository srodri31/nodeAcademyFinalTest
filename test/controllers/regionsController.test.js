const regionsController = require("../../src/controllers/regionsController");

describe("get all regions", () => {
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

    it("should return 200 when regions are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await regionsController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await regionsController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("get all regions by country", () => {
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

    it("should return 200 when regions are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await regionsController.allByCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 when no regions are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve()
        }
        await regionsController.allByCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await regionsController.allByCountry(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("get one region", () => {
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

    it("should return 200 if region is found", async () => {
        mockRequest.params.country = "FOO";
        mockRequest.params.region = "BAR";
        mockModel = {
            findByPk: async (code) => Promise.resolve({code})
        }
        await regionsController.getRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if no region is found", async () => {
        mockRequest.params.country = "BAZ";
        mockRequest.params.region = "BAR";
        mockModel = {
            findByPk: async (code) => Promise.resolve()
        }
        await regionsController.getRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await regionsController.getRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("create region", () => {
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

    it("should return 201 when it is created", async () => {
        mockRequest.params.country = "FOO";
        mockModel = {
            create: async (region) => Promise.resolve(region),
            findByPk: async (code) => Promise.resolve({code})
        }
        await regionsController.createRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should return 405 when country does not exist", async () => {
        mockRequest.params.country = "BAR";
        mockModel = {
            create: async (region) => Promise.resolve(region),
            findByPk: async (code) => Promise.resolve()
        }
        await regionsController.createRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if select country fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await regionsController.createRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockModel = {
            create: async () => Promise.reject(new Error("Problem")),
            findByPk: async (code) => Promise.resolve({code})
        }
        await regionsController.createRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("update or create region", () => {
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
        mockRequest.params.region = "BAR";
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code})
        }
        await regionsController.updateRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 201 when doesn't exist so it is created", async () => {
        mockRequest.params.country = "BOR";
        mockRequest.params.region = "BAR";
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            create: async (country) => Promise.resolve(country)
        }
        await regionsController.updateRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should call error middleware if update fails", async () => {
        mockModel = {
            update: async () => Promise.reject(new Error("Problem"))
        }
        await regionsController.updateRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            create: async (country) => Promise.reject(new Error("Problem"))
        }
        await regionsController.updateRegion(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("delete region", () => {
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

    it("should return 204 when region is deleted because it has no cities", async () => {
        mockRequest.params.country = "FOO";
        mockRequest.params.region = "BAR";
        mockModel = {
            destroy: async () => Promise.resolve(1),
            findOne: async () => Promise.resolve()
        }
        await regionsController.deleteRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(204);
    })

    it("should return 404 if given region is not found", async () => {
        mockRequest.params.country = "BAR";
        mockRequest.params.region = "BAZ";
        mockModel = {
            destroy: async () => Promise.resolve(0),
            findOne: async () => Promise.resolve()
        }
        await regionsController.deleteRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should return 405 when it violates city foreign key", async () => {
        mockRequest.params.country = "FO";
        mockRequest.params.region = "RAR";
        mockModel = {
            destroy: async () => Promise.resolve(0),
            findOne: async () => Promise.resolve({code: "region"})
        }
        await regionsController.deleteRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if delete fails", async () => {
        mockRequest.params.country = "BAZ";
        mockRequest.params.region = "RAR";
        mockModel = {
            destroy: async () => Promise.reject(new Error("Error in db")),
            findOne: async () => Promise.resolve()
        }
        await regionsController.deleteRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if select regions fails", async () => {
        mockRequest.params.country = "BAZ";
        mockRequest.params.region = "RAR";
        mockModel = {
            findOne: async () => Promise.reject(new Error("Error in db"))
        }
        await regionsController.deleteRegion(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})