let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

test("Deve responder na porta 8080",()=>{
  return request.get("/").then(res =>{
        let status = res.statusCode
        expect(status).toEqual(200)
    }).catch(err => {
        fail(err)
    })
});