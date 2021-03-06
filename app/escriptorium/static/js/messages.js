var msgSocket;

var alerts = {};
class Alert {
    constructor(id, message, level, link) {
        this.id = id;
        this.count = 1;
        this.message = message;
        this.level = level || 'info';
        this.link = link;
        var $new = $('.alert', '#alert-tplt').clone();
        $new.addClass('alert-' + this.level);
        $('.message', $new).html(message);
        if (this.link) {
            $('.additional', $new).html('<a href="'+'/media/'+this.link.src+'" download>'+this.link.text+'</a>');
            $('.additional', $new).css('display', 'block');
        }
        this.$element = $new;
        $('#alerts-container').append($new);
        $new.show();

        this.$element.on('closed.bs.alert', $.proxy(function () {
            delete alerts[this.id];
        }, this));
    }

    static add(id, message, level, link) {
        var id_ = id || new Date().getTime();
        if (alerts[id_] === undefined) {
            alerts[id_] = new Alert(id_, message, level, link);
        } else {
            alerts[id_].incrementCounter();
        }
    }

    incrementCounter() {
        this.count++;
        $('.counter', this.$element).text('('+this.count+')').show();
    }
}

$(document).ready(function() {
    msgSocket = new ReconnectingWebSocket('ws://' + window.location.host + '/ws/notif/');
    msgSocket.maxReconnectAttempts = 3;
    
    msgSocket.addEventListener('open', function(e) {
        if (DEBUG) {
            console.log('Connected to notification socket');
        }
    });
    
    msgSocket.addEventListener('message', function(e) {
        var data = JSON.parse(e.data);
        if (DEBUG) {
            console.log('Received ws message: ', data);
        }

        if (data.type == 'message') {
            var message = data['text'];
            Alert.add(data['id'], message, data['level'], data['link']);
        } else if (data.type == 'event') {
            var $container = $('#alerts-container');
            $container.trigger(data["name"], data["data"]);
        }
    });
    
    msgSocket.addEventListener('close', function(e) {
        if (DEBUG) {
            console.error('Notification socket closed unexpectedly');
        }
    });
});
