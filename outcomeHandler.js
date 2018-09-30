

module.exports = {
    write: function(request, response) {
        var outcome = {
            error: 'You are not allowed to access this api'
        };

        // Extra security layer
        if (request.headers.referer === 'http://127.0.0.1:8000/') {
            outcome = this.create();
        }

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify(outcome), 'utf-8');
    },
    create: function() {

        return {
            value: [
                this.randomFromTo(0, 3),
                this.randomFromTo(0, 3),
                this.randomFromTo(0, 3)
            ],
        };
    },
    randomFromTo: function(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}