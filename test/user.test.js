let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

let mainUser = {name:"william", email:"teste@teste.com", password: "123456"}

beforeAll(()=>{
    return request.post("/user")
    .send(mainUser)
    .then(res=>{})
    .catch(err =>{console.log(err)})
});
afterAll(()=>{
   return request.delete("/user/" + mainUser.email)
    .then(res =>{})
    .catch(err =>{console.log(err)})
});

describe("Cadastro de usuário",()=>{
    test("Deve cadastrar um usuário",()=>{
        let time = Date.now();
        let email = `${time}@gmail.com`
        let user = {name:"william",email, password: "123456"}

      return request.post("/user")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)
        })
    })
    test("Deve impedir que um usuário se cadastre com dados vazios",()=>{
    
        let user = {name:"",email:"", password: ""}

      return request.post("/user")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(400);
           
        })
    })
    test("Deve impedir que um usuário se cadastre com email repetido",()=>{
        let time = Date.now();
        let email = `${time}@gmail.com`
        let user = {name:"william",email, password: "123456"}

      return request.post("/user")
        .send(user)
        .then(res => {
            expect(res.statusCode).toEqual(200)
            expect(res.body.email).toEqual(email)

       return request.post("/user").send(user)
        .then(res =>{
            expect(res.status).toEqual(400)
            expect(res.body.error).toEqual("Email já cadastrado")    
        }).catch(err = {
            
        })
    })
    })

});
describe("Autenticação",()=>{
    test("Deve me retornar um token quando logar",()=>{
       return  request.post("/auth").send({email:mainUser.email})
        .then(res =>{
            expect(res.statusCode).toEqual(200)
            expect(res.body.token).toBeDefined()
        })
        
    })
    test("Deve impedir que um usuario nao cadastrado se logue",()=>{
        return request.post("/auth")
        .send({email:mainUser[1],password:"12"})
        .then(res =>{
            expect(res.statusCode).toEqual(403)
            expect(res.body.errors.email).toEqual("email não cadastrado");
        })
    })

    test("Deve impedir que um usuario se logue com uma senha errada",()=>{
        return request.post("/auth")
        .send({email:mainUser.email,password:"senha invalida"})
        .then(res =>{
            expect(res.statusCode).toEqual(403)
            
        })
    })
});
 