var chai = require('chai');
var assert = chai.assert;
var Jsonrpc = require('../lib/web3_hpb/jsonrpc');

describe('lib/web3_hpb/jsonrpc', function () {
    describe('id', function () {
        it('should increment the id', function () {
            
            // given
            var method = 'm';

            // when
            var p1 = Jsonrpc.toPayload(method);
            var p2 = Jsonrpc.toPayload(method);

            // then
            assert.equal(p2.id, p1.id + 1); 
        });
    });
});

