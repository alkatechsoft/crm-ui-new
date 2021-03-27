
export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    // inject('hello', msg => console.log(`Hello ${msg}!`))
    // setInterval(abs, 10000);
    // setInterval(abs, 10000);
    function abs(){
    var i = 123123;
      console.log('this is global data value:', i);
      console.log('user id ::');
    }
    inject('hello', msg => console.log(`Hellooooooooooooooooo  + ${msg}!`))
    // inject('hello', abs())
    console.log('global function...')
  }
