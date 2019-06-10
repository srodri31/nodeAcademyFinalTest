const sistersController = require("../../src/controllers/sistersController");

describe("get all sister pairs", () => {
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

    it("should return 200 when sisters are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await sistersController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await sistersController.all(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("get all sisters from city", () => {
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

    it("should return 200 if sisters are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await sistersController.sistersOf(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 when no sisters are retrieved", async () => {
        mockModel = {
            findAll: async () => Promise.resolve()
        }
        await sistersController.sistersOf(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await sistersController.sistersOf(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("get one sisters pair", () => {
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

    it("should return 200 if sister pair is found", async () => {
        mockRequest.params.cityA = "FOO";
        mockRequest.params.cityB = "BAR";
        mockModel = {
            findOne: async () => Promise.resolve({})
        }
        await sistersController.sistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if no sister pair is found", async () => {
        mockRequest.params.cityA = "BAZ";
        mockRequest.params.cityB = "BAR";
        mockModel = {
            findOne: async () => Promise.resolve()
        }
        await sistersController.sistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findOne: async () => Promise.reject(new Error("Problem"))
        }
        await sistersController.sistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("create sister pair", () => {
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
        mockRequest.body.city1 = "FOO";
        mockRequest.body.city2 = "BAR";
        mockModel = {
            create: async (sister) => Promise.resolve(sister),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should return 400 if city 1 is empty", async () => {
        mockRequest.body.city2 = "BAR";
        mockModel = {
            create: async (sister) => Promise.resolve(sister),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 if city2 is empty", async () => {
        mockRequest.body.city1 = "FOO";
        mockModel = {
            create: async (sister) => Promise.resolve(sister),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 405 when at least one of the cities does not exist", async () => {
        mockRequest.body.city1 = "FOO";
        mockRequest.body.city2 = "BAZ";
        mockModel = {
            create: async (region) => Promise.resolve(region),
            findByPk: async (code) => Promise.resolve()
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if select city fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockRequest.body.city1 = "FOO";
        mockRequest.body.city2 = "BAR";
        mockModel = {
            create: async () => Promise.reject(new Error("Problem")),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.createSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("update or create sister pair", () => {
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
        mockRequest.params.cityA = "FOO";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: "BOR",
            city2: "MED"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 400 if city1 is not a string", async () => {
        mockRequest.params.cityA = "FOO";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: 345,
            city2: "MED"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 if city2 is not a string", async () => {
        mockRequest.params.cityA = "FOO";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: "BOR",
            city2: 345
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code})
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 201 when doesn't exist so it is created", async () => {
        mockRequest.params.cityA = "BOR";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: "BOR",
            city2: "MED"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (sister) => Promise.resolve(sister)
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should return 400 if city1 is empty when creating", async () => {
        mockRequest.params.cityA = "BOR";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city2: "MED"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (sister) => Promise.resolve(sister)
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 if city2 is empty when creating", async () => {
        mockRequest.params.cityA = "BOR";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: "BOR"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (sister) => Promise.resolve(sister)
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })
    
    it("should return 405 when tries to create and at least one of the cities doesn't exist", async () => {
        mockRequest.params.cityA = "BOR";
        mockRequest.params.cityB = "BAR";
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve(),
            create: async (sister) => Promise.resolve(sister)
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if update fails", async () => {
        mockModel = {
            update: async () => Promise.reject(new Error("Problem"))
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
    
    it("should call error middleware if find cities fails", async () => {
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.reject(new Error("Problem"))
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockRequest.params.cityA = "BOR";
        mockRequest.params.cityB = "BAR";
        mockRequest.body = {
            city1: "BOR",
            city2: "MED"
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (country) => Promise.reject(new Error("Problem"))
        }
        await sistersController.updateSistersPair(mockRequest, mockResponse, mockNext, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("delete sister pair", () => {
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

    it("should return 204 when sisters pair is deleted", async () => {
        mockRequest.params.cityA = "FOO";
        mockRequest.params.cityB = "BAR";
        mockModel = {
            destroy: async () => Promise.resolve(1)
        }
        await sistersController.deleteSistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(204);
    })

    it("should return 404 if given sisters pair is not found", async () => {
        mockRequest.params.cityA = "BAR";
        mockRequest.params.cityB = "BAZ";
        mockModel = {
            destroy: async () => Promise.resolve(0)
        }
        await sistersController.deleteSistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if delete fails", async () => {
        mockRequest.params.cityA = "BAZ";
        mockRequest.params.cityB = "RAR";
        mockModel = {
            destroy: async () => Promise.reject(new Error("Error in db"))
        }
        await sistersController.deleteSistersPair(mockRequest, mockResponse, mockNext, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})