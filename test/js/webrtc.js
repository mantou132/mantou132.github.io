// 先通过服务器连接用户。
// 交换信息后创建通道。
//实际上比较难。

// channel-id
var MODERATOR_CHANNEL_ID = 'ABCDEF-' + window.RMCDefaultChannel; 

var MODERATOR_SESSION_ID = 'XYZ';    // room-id
var MODERATOR_ID         = 'JKL';    // user-id
var MODERATOR_SESSION    = {         // media-type
    audio: true,
    video: true
};
var MODERATOR_EXTRA      = {};       // empty extra-data

// moderator
document.getElementById('open-room').onclick = function() {
    this.disabled = true;

    var moderator = new RTCMultiConnection(MODERATOR_CHANNEL_ID);
    moderator.session = MODERATOR_SESSION;
    moderator.userid = MODERATOR_ID;
    moderator.extra = MODERATOR_EXTRA;
    moderator.open({
        dontTransmit: true,
        sessionid: MODERATOR_SESSION_ID
    });
};

// participants
document.getElementById('join-room').onclick = function() {
    this.disabled = true;
    var participants = new RTCMultiConnection(MODERATOR_CHANNEL_ID);
    participants.join({
        sessionid: MODERATOR_SESSION_ID,
        userid: MODERATOR_ID,
        extra: MODERATOR_EXTRA,
        session: MODERATOR_SESSION
    });
};