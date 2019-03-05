const App = require('spectron').Application;
const chai = require('chai');
var path = require('path');
const chaiAsPromised = require('chai-as-promised');
var electronPath = path.join(__dirname,'..', 'node_modules', '.bin', 'electron');
var helloApp = path.join(__dirname,'hello-world-win',)
var appPath = path.join(__dirname, "..");
var assert = require('assert')


if (process.platform === 'win32') {
  electronPath += '.cmd';
}
// global.before(function () {
//   chai.should();
//   chai.use(chaiAsPromised);
// });
console.log(electronPath, appPath);
var app = new App({
    path: electronPath,
    args: [appPath ]
});


app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)

}).then(()=> {
  return app.browserWindow.getTitle();
}).then((title)=> {
  assert.equal(title,'hello-world')
}).then((title)=> {
  return app.stop();
}).catch((e)=> {
  app.stop();
  throw(e);
  
}).finally(()=>{
  console.log('all tests passed');
  console.log('test end');
})


// describe('Test Example', function () {
//   beforeEach(function () {
//       return app.start();
//   });

//   afterEach(function () {
//       return app.stop();
//   });

//   it('opens a window', function () {
//     return app.client.waitUntilWindowLoaded()
//       .getWindowCount().should.eventually.equal(1);
//   });

//   it('tests the title', function () {
//     return app.client.waitUntilWindowLoaded()
//       .getTitle().should.eventually.equal('Hello World!');
//   });

// });



