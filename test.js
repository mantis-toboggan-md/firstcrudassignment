const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./server.js');
const fs = require('fs')
chai.use(chaiHttp);

fs.writeFileSync('./storage.json', '[]')

describe('PUT /create', ()=>{
  it('should add a profile with id 1 if the storage file is empty', function(done){
    chai.request(app)
      .put('/create/nancy/420/WA')
      .end((err,res)=>{
        expect(err).to.be.null;
        expect(require('./storage.json')[0].id.toString()).to.equal('1');
      })
      done()
  })
  it('should increment id for each new profile', function(done){
    chai.request(app)
      .put('/create/johnson/69/AZ')
      .end((err,res)=>{
        expect(err).to.be.null;
        expect(require('./storage.json')[1].id.toString()).to.equal('2');
      })
      done()
  })
})

describe('PUT profile update by id', ()=>{
  it('should update profile in storage.json associated with given id', function(done){
    chai.request(app)
      .put('/update/1/jefferson/420/NM')
      .end((err,res)=>{
        expect(err).to.be.null;
        console.log(require('./storage.json'))
        setTimeout(()=>expect(require('./storage.json')[0].name).to.equal('jefferson'), 10)
      })
      done()
  })
})

describe('GET all profiles', ()=>{
  it('should return a json object with all profile ids', function(done){
    chai.request(app)
      .get('/')
      .end((err,res)=>{
        expect(err).to.be.null;
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify(require('./storage.json')))
      })
      done()
  })
})

describe('GET user profile by id', ()=>{
  it('should return json only of the specified user associated with given id', function(done){
    chai.request(app)
      .get('/2')
      .end((err,res)=>{
        expect(err).to.be.null;
        setTimeout(()=>expect(JSON.stringify(res.body)).to.equal('[{"id":2,"name":"johnson","email":"69","state":"AZ"}]'), 1)
      })
      done()
  })
})

describe('DELETE profile by id', ()=>{
  it('should delete the profile associated with the given id', function(done){
    chai.request(app)
      .delete('/3')
      .end((err,res)=>{
        expect(err).to.be.null
        setTimeout(()=>expect(res.body).filter(user=>user.id==req.params.id).to.equal(''),1)
      })
      done()
  })
})
