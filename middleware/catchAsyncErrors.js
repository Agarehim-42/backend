export default (controllerFunction) => (req , res , next) => Promise.resolve(controllerFunction(req , res , next)).catch(next)
// callback cehennemi () => Promise => Async
// AJAX
// Promise 3 dene fazasi var 1) Pending - gozleme  , 2) Fullfild  3) Reject - melumat gelmedi

// Asinxron xeta yeni parolu unudanda , giris ede bilmeyende ve saire 