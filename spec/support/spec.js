var request = require("request");
const { response } = require("../../app");

var host = "localhost:8080";

describe("Users API", function() {
    
    describe("/GET all users", function() {
        it("returns status code 200", function (done) {
            request(host + "/users", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("/GET a specific user", function() {
        it("returns status code 200", function (done) {
            request(host + "/users/1", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe("/GET a none existing user", function() {
        it("returns status code 400", function (done) {
            request(host + "/users/asdfrvr", function(error, resopnse, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });

    describe("/PUT a user", function() {
        it("returns status code 200", function (done) {
            request(host + "/users", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});

describe("Quesitions API", function() {
    
    describe("/GET all questions", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("/GET a specific question", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions/1", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe("/GET a none existing questions", function() {
        it("returns status code 400", function (done) {
            request(host + "/questions/asdfrvr", function(error, resopnse, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });

    describe("/PUT a question", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});

describe("Comments API", function() {
    
    describe("/GET all comments from a specific question", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions/1/comments", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("/GET a specific comment", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions/1/comments/1", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe("/GET a none existing comment", function() {
        it("returns status code 400", function (done) {
            request(host + "/questions/1/comments/asdfrvr", function(error, resopnse, body) {
                expect(response.statusCode).toBe(400);
                done();
            });
        });
    });

    describe("/PUT a comment", function() {
        it("returns status code 200", function (done) {
            request(host + "/questions/1/comments", function(error, resopnse, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});