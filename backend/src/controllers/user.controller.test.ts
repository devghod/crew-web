import request from 'supertest';
import app from '../../app';

describe("User Controller", () => {
  
  it('should return an array of users', async () => {
    const { statusCode, text } = await request(app)
      .get("/api/user/get-users");

    const result = await JSON.parse(text);
    const {
      data,
      message,
      success,
    } = result;
    
    expect(statusCode).toEqual(200);
    expect(result).toEqual({
      "success": true,
      "message": "Users",
      "data": expect.any(Array),
    });
  });
});