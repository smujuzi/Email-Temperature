const assert = require('chai').assert;
const sinon = require('sinon');
const index = require('../index');
const temperature = require('../temperature');
const email = require('../email');

describe('Test Index', function() {
    let spy;
    let stubTemp;

    before(function() {
        stubTemp = sinon.stub(temperature, 'getTemperatureInDegrees');
    })
    after(function() {
        stubTemp.resetHistory();
    })

    beforeEach(function(){
        spy = sinon.spy(email, 'sendCelebrationEmail');
    })

    afterEach(function() {
        email.sendCelebrationEmail.restore()
        spy.resetHistory()
        spy.restore()
        stubTemp.resetHistory();
    })

    describe('Hotter in Uganda', function(){

        before(function() {
            stubTemp.withArgs('Kampala').returns(Promise.resolve(26));
            stubTemp.withArgs('London').returns(Promise.resolve(6));

        })


        it('Celebration Email not called', async function(){
            await index.handler();

            sinon.assert.notCalled(spy);
        })
    })

    describe('Hotter in UK', function(){

        before(function() {
            stubTemp.withArgs('Kampala').returns(Promise.resolve(6));
            stubTemp.withArgs('London').returns(Promise.resolve(26));

        })


        it('Celebration Email called', async function(){
            await index.handler();

            sinon.assert.called(spy);
        })
    })

    after(function() {
        stubTemp.restore();
        spy.restore();
    })

})
