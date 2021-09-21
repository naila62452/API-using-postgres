import { Wolrd, MythicalWorldStore } from "../mythical-wolrd";

const store = new MythicalWorldStore()

describe('Mythical model test', ()=> {
    it ('Index methid', () => {
        expect(store.index).toBeDefined();
    });
});