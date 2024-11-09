import request from 'supertest';
import app from '../../app';

describe("Auth Controller Login", () => {
  
  it('should login and return a token', async () => {

    const { statusCode, text } = await request(app)
      .post("/api/auth/login")
      .send({
        "username": "kindred",
        "password": "Admin@123"
      });

    const result = await JSON.parse(text);
    const {
      token,
      refreshToken,
      message,
      success,
    } = result;
    
    expect(statusCode).toEqual(200);
    expect(result).toEqual({
      "success": true,
      "token": expect.any(String),
      "refreshToken": expect.any(String),
    });
  });

  it('should not login and return a message', async () => {
    const { statusCode, text } = await request(app)
      .post("/api/auth/login")
      .send({
        "username": "kindred1",
        "password": "Admin@123"
      });

    const result = await JSON.parse(text);
    const {
      token,
      refreshToken,
      message,
      success,
    } = result;
    
    expect(statusCode).toEqual(400);
    expect(result).toEqual({
      "success": false,
      "message": 'User not found or inactive',
    });
  });

  it('should not login and return a message Incorrect Password', async () => {
    const { statusCode, text } = await request(app)
      .post("/api/auth/login")
      .send({
        "username": "kindred",
        "password": "Admin@1233"
      });

    const result = await JSON.parse(text);
    const {
      token,
      refreshToken,
      message,
      success,
    } = result;
    
    expect(statusCode).toEqual(400);
    expect(result).toEqual({
      "success": false,
      "message": 'Incorrect password',
    });
  });

});

describe("Auth Controller Verify", () => {
  
  it('should login and return a token', async () => {
    const { text: tempText } = await request(app)
      .post("/api/auth/login")
      .send({
        "username": "kindred",
        "password": "Admin@123"
      });

    const tempTesult = await JSON.parse(tempText);
    const {
      token,
      refreshToken,
    } = tempTesult;

    const { statusCode, text } = await request(app)
      .post("/api/auth/verify")
      .send({
        "token": token,
        "refreshToken": refreshToken
      });
    
    const result = await JSON.parse(text);
    
    expect(statusCode).toEqual(200);
    expect(result).toEqual({
      "success": true, 
      "decoded": expect.any(Object),
      "accessToken": expect.any(String), 
      "refreshToken": expect.any(String),
      "profile": expect.any(Object),
      "message": `Decoded Token` 
    });
  });

});

describe("Auth Controller Register", () => {
  
  it('register new user', async () => {

    const { statusCode, text } = await request(app)
      .post("/api/auth/register")
      .send({
        "username": "test1",
        "email": "test1@mail.com",
        "password": "Admin@123"
      });
    
    const result = await JSON.parse(text);
    
    expect(statusCode).toEqual(200);
    expect(result).toEqual({
      "success": true, 
      "message": 'Registration successful'
    });
  });

  it('can\'t register existing email or username', async () => {

    const { statusCode, text } = await request(app)
      .post("/api/auth/register")
      .send({
        "username": "kindred",
        "email": "gbtm.workspace@gmail.com",
        "password": "Admin@123"
      });
    
    const result = await JSON.parse(text);
    
    expect(statusCode).toEqual(400);
    expect(result).toEqual({
      "success": false, 
      "message": 'Username or email already exists'
    });
  });

});