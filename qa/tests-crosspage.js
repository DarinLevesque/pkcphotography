// var Browser = require('zombie'),
//     assert = require('chai').assert;
// var browser;
// suite('Cross-Page Tests', function() {
//     setup(function() {
//         browser = new Browser();
//     });
//     test("requesting PKC photo's homepage from JoB " + 
//         'should populate the referrer field',
//         function(done) {
//             var referrer = 'http://www.journeyofbirth.com/';
//             browser.visit(referrer, function() {
//                 browser.clickLink('.requestGroupRate', function() {
//                     assert(browser.field('referrer').value === referrer);
//                     done();
//                 });
//             });
//         });
//     test('requesting a group rate from the oregon coast tour page should ' +
//         'populate the referrer field',
//         function(done) {
//             var referrer = 'http://localhost:3000/tours/oregon-coast';
//             browser.visit(referrer, function() {
//                 browser.clickLink('.requestGroupRate', function() {
//                     assert(browser.field('referrer').value === referrer);
//                     done();
//                 });
//             });
//         });
//     test('visiting the home page directly should result ' +
//         'in an empty referrer field',
//         function(done) {
//             browser.visit('http://localhost:3000',
//                 function() {
//                     assert(browser.field('referrer').value === '');
//                     done();
//                 });
//         });
// });
