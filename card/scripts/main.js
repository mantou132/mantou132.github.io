// requirejs.config({
//     config: {
//         'Deck': {
//            	test: 'testModuleConfig'
//         }
//     }
// });
require(["Deck","User"], function(Deck,User) {
	deck = new Deck(true);
});
require(["View"], function(View) {
	document.registerElement('mt-poker', View);
});

