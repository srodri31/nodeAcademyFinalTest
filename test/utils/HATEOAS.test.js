const { countryHATEOAS, regionHATEOAS, cityHATEOAS, sisterHATEOAS } = require("../../src/utils/HATEOAS");

describe("HATEOAS for countries", () => {
    it("should return the right links for a country", () => {
        const country = {
            code: "BA",
            name: "BAVARIA"
        };
        const expectedResult = {
            code: "BA",
            name: "BAVARIA",
            links: [
                {
                    rel: "self",
                    href: `/countries/BA`
                },
                {
                    rel: "regions",
                    href: `/regions/BA`
                },
                {
                    rel: "cities",
                    href: `/cities/?country=BA`
                }
            ]
        };
        expect(countryHATEOAS(country)).toStrictEqual(expectedResult);
    })
});

describe("HATEOAS for regions", () => {
    it("should return the right links for a region", () => {
        const region = {
            code: "BA.34",
            name: "Barbuda",
            country: "BA"
        };
        const expectedResult = {
            code: "BA.34",
            name: "Barbuda",
            country: "BA",
            links: [
                {
                    rel: "self",
                    href: `/regions/BA/BA.34`
                },
                {
                    rel: "country",
                    href: `/countries/BA`
                },
                {
                    rel: "cities",
                    href: `/cities/?country=BA&region=BA.34`
                }
            ]
        };
        expect(regionHATEOAS(region)).toStrictEqual(expectedResult);
    })
});

describe("HATEOAS for cities", () => {
    it("should return the right links for a city", () => {
        const city = {
            code: "123",
            name: "city",
            latitude: 20.0,
            longitude: 34.7,
            population: 120000,
            country: "CO",
            region: "CO.02",
            sisters: [1,2,3]
        };
        const expectedResult = {
            code: "123",
            name: "city",
            latitude: 20.0,
            longitude: 34.7,
            population: 120000,
            country: "CO",
            region: "CO.02",
            sisters: [1,2,3],
            links: [
                {
                    rel: "self",
                    href: `/cities/123`
                },
                {
                    rel: "country",
                    href: `/countries/CO`
                },
                {
                    rel: "region",
                    href: `/regions/CO/CO.02`
                },
                {
                    rel: "sisters",
                    href: `/sisters/123`
                }
            ]
        };
        expect(cityHATEOAS(city)).toStrictEqual(expectedResult);
    })
});

describe("HATEOAS for sisters", () => {
    it("should return the right links for a sisters pair", () => {
        const sister = {
            city1: "2344",
            city2: "818181"
        };
        const expectedResult = {
            city1: "2344",
            city2: "818181",
            links: [
                {
                    rel: "self",
                    href: `/sisters/2344/818181`
                },
                {
                    rel: "city1",
                    href: `/cities/2344`
                },
                {
                    rel: "city2",
                    href: `/cities/818181`
                }
            ]
        };
        expect(sisterHATEOAS(sister)).toStrictEqual(expectedResult);
    })
});