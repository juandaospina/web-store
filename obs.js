const { Observable, filter } = require("rxjs");

// Solo se resuelve una vez
function doSomethingPromise() {
  return new Promise((resolve) => {
    resolve("Response value 1");
  });
}

(async () => {
  const res = await doSomethingPromise();
  console.log("[promise]", res);
})();

// Permite resolver y y transmitir varios valores
// Permite cancelar el observable
// Permite la implementación de pipes con filters, maps, etc...
// NOTA: Al realizar peticiones Http con observables están son matadas
// en cuanto se resuelve la petición, no se suscribe a datos o eventos de una api
function doSomethingObservable() {
  return new Observable((observer) => {
    observer.next("observable response 1");
    observer.next(null);
    observer.next("observable response 2");
    observer.next("observable response 3");
    observer.next(null);
    setTimeout(() => {
      observer.next("observable response 4");
    }, 4000);
  });
}

(() => {
  doSomethingObservable()
    .pipe(
      filter((value) => {
        return value !== null;
      })
    )
    .subscribe((item) => {
      console.log("[observable-filter]", item);
    });
})();
