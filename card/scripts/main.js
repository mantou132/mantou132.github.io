requirejs.config({
    config: {
        'Deck': {
            test: 'testModuleConfig'
        }
    }
});
require(["Deck","Robot","View"], function(Deck) {

});