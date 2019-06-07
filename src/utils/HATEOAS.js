function countryHATEOAS(country) {
    const { code, name } = country;
    return {
        code,
        name,
        links: [
            {
                rel: "self",
                href: `/countries/${code}`
            },
            {
                rel: "regions",
                href: `/regions/${code}`
            },
            {
                rel: "cities",
                href: `/cities/?country=${code}`
            }
        ]
    }
}

function regionHATEOAS(region) {
    const { code, name, country } = region;
    return {
        code,
        name,
        country,
        links: [
            {
                rel: "self",
                href: `/regions/${country}/${code}`
            },
            {
                rel: "country",
                href: `/countries/${country}`
            },
            {
                rel: "cities",
                href: `/cities/?country=${country}&region=${code}`
            }
        ]
    }
}

function cityHATEOAS(city) {
    const { code, name, latitude, longitude, population, region, country, sisters } = city;
    return {
        code, name, latitude, longitude, population, region, country, sisters,
        links: [
            {
                rel: "self",
                href: `/cities/${code}`
            },
            {
                rel: "country",
                href: `/countries/${country}`
            },
            {
                rel: "region",
                href: `/regions/${country}/${region}`
            },
            {
                rel: "sisters",
                href: `/sisters/${code}`
            }
        ]
    }
}

function sisterHATEOAS(sister) {
    const { city1, city2 } = sister;
    return {
        city1, city2,
        links: [
            {
                rel: "self",
                href: `/sisters/${city1}/${city2}`
            },
            {
                rel: "city1",
                href: `/cities/${city1}`
            },
            {
                rel: "city2",
                href: `/cities/${city2}`
            }
        ]
    }
}

module.exports = {
    countryHATEOAS,
    regionHATEOAS,
    cityHATEOAS,
    sisterHATEOAS
}