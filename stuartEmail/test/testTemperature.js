const assert = require('chai').assert;
const expect = require('chai').expect;
const temperature = require('../temperature');
const sinon = require('sinon');
const axios = require('axios');

//mock getTemperature in Degrees

describe('Test Temperature', function() {

    before(function() {

        const mock = sinon.stub(axios, 'get');

        mockGet.withArgs("https://api.openweathermap.org/data/2.5/weather?q=Kampala&appid=b224a548fa8abc35fc18c056f35f2674")
            .returns(Promise.resolve({
                data: {
                    main: {
                        temp_min: 298.15,
                        temp_max: 300.15
                    }
                }
            }))
    })

    after(function() {

    })

    it('returns the average in degrees', async function(){
        const degrees = await temperature.getTemperatureInDegrees('Kampala')

        assert.equal(degrees, 26)
    })
})