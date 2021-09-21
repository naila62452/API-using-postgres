"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mythical_wolrd_1 = require("../mythical-wolrd");
var store = new mythical_wolrd_1.MythicalWorldStore();
describe('Mythical model test', function () {
    it('Index methid', function () {
        expect(store.index).toBeDefined();
    });
});
