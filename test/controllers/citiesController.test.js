const citiesController = require("../../src/controllers/citiesController");

describe("get all cities", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            query: {}
        };
        mockNext = jest.fn();
        sistersOf = async () => Promise.resolve({});
    });

    it("should return 405", async () => {
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(405);
    })
})

describe("get all cities by country", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            query: {
                country: "CO"
            }
        };
        mockNext = jest.fn();
        sistersOf = async () => Promise.resolve({});
    });

    it("should return 200 if country has cities", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if country has no cities", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([])
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })
})
describe("get all cities by country and region", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

    beforeEach(() => {
        mockResponse = {
            status: function(code) {
                this.statusCode = code;
                return { send: () => {} }
            }
        };
        mockRequest = {
            query: {
                country: "CO",
                region: "C0.02"
            }
        };
        mockNext = jest.fn();
        sistersOf = async () => Promise.resolve({});
    });

    it("should return 200 if country and region have cities", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([1,2,3])
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if country and region has no cities", async () => {
        mockModel = {
            findAll: async () => Promise.resolve([])
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findAll: async () => Promise.reject(new Error("Problem"))
        }
        await citiesController.getCities(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })
})


describe("get one city", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

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
        sistersOf = async () => Promise.resolve({});
    });

    it("should return 200 if city is found", async () => {
        mockRequest.params.city = "FOO";
        mockModel = {
            findByPk: async (code) => Promise.resolve({code})
        }
        await citiesController.getCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 404 if no city is found", async () => {
        mockRequest.params.city = "BAZ";
        mockModel = {
            findByPk: async (code) => Promise.resolve()
        }
        await citiesController.getCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should call error middleware if query fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await citiesController.getCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("create city", () => {
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
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should return 405 when country and/or region doesn't exist", async () => {
        mockRequest.params.country = "BAZ";
        mockRequest.params.region = "RAR";
        mockModel = {
            findByPk: async (code) => Promise.resolve(),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if find country and/or region fails", async () => {
        mockModel = {
            findByPk: async () => Promise.reject(new Error("Problem"))
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should return 400 when city code is empty", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city name is empty", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city latitude is empty", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city latitude is not a number", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": "lat",
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city longitude is empty", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city longitude is not a number", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "longitude": "lon",
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city population is empty", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city population is not an integer", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000.786
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should call error middleware if create fails", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.body = {
            "code": "123",
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.reject(new Error("Problem"))
        }
        await citiesController.createCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("update or create city", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

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
        sistersOf = async () => Promise.resolve({});
    });

    it("should return 200 if it is modified", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(200);
    })

    it("should return 201 when doesn't exist so it is created", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(201);
    })

    it("should return 405 when tries to create and country and/or region doesn't exist", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve(),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should return 400 when city name is empty when creating", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city latitude is empty when creating", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city latitude is not a number", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": "lat",
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city longitude is empty when creating", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city longitude is not a number", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": "lon",
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city population is empty when creating", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should return 400 when city population is not an integer", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000.786
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(1),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (city) => Promise.resolve(city)
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(400);
    })

    it("should call error middleware if update fails", async () => {
        mockModel = {
            update: async () => Promise.reject(new Error("Problem"))
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if find country and/or region fails", async () => {
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (country) => Promise.reject(new Error("Problem"))
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if create fails", async () => {
        mockRequest.params.country = "CO";
        mockRequest.params.region = "CO.02";
        mockRequest.params.city = "123";
        mockRequest.body = {
            "name": "city",
            "latitude": 20.0,
            "longitude": 34.7,
            "population": 120000
        }
        mockModel = {
            update: async (record, options) => Promise.resolve(0),
            findByPk: async (code) => Promise.resolve({code}),
            create: async (country) => Promise.reject(new Error("Problem"))
        }
        await citiesController.updateCity(mockRequest, mockResponse, mockNext, mockModel, mockModel, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })
})

describe("delete city", () => {
    let mockResponse;
    let mockRequest;
    let mockNext;
    let mockModel;
    let sistersOf;

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

    it("should return 204 when city is deleted because it has no sisters", async () => {
        sistersOf = async () => Promise.resolve({sisters: []});
        mockRequest.params.city = "FOO";
        mockModel = {
            destroy: async () => Promise.resolve(1)
        }
        await citiesController.deleteCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(204);
    })

    it("should return 404 if given city is not found", async () => {
        sistersOf = async () => Promise.resolve({sisters: []});
        mockRequest.params.city = "BAR";
        mockModel = {
            destroy: async () => Promise.resolve(0)
        }
        await citiesController.deleteCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(404);
    })

    it("should return 405 when it violates sisters foreign key", async () => {
        sistersOf = async () => Promise.resolve({sisters: [1]});
        mockRequest.params.city = "FO";
        mockModel = {
            destroy: async () => Promise.resolve(0)
        }
        await citiesController.deleteCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockResponse.statusCode).toBe(405);
    })

    it("should call error middleware if delete fails", async () => {
        sistersOf = async () => Promise.resolve({sisters: []});
        mockRequest.params.city = "BAZ";
        mockModel = {
            destroy: async () => Promise.reject(new Error("Error in db"))
        }
        await citiesController.deleteCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })

    it("should call error middleware if find sisters fails", async () => {
        sistersOf = async () => Promise.reject(new Error("Error in db"));
        mockRequest.params.city = "BAZ";
        await citiesController.deleteCity(mockRequest, mockResponse, mockNext, mockModel, sistersOf);
        expect(mockNext).toHaveBeenCalled();
    })
})