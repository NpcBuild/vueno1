<template>
  <div class="body">
    <div class="container clearfix">
      <div class="people-list" id="people-list">
        <div class="search">
          <input type="text" placeholder="search" />
          <i class="fa fa-search"></i>
        </div>
        <ul class="list">
          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Vincent Porter</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Aiden Chavez</div>
              <div class="status">
                <i class="fa fa-circle offline"></i> left 7 mins ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Mike Thomas</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Erica Hughes</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Ginger Johnston</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_06.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Tracy Carpenter</div>
              <div class="status">
                <i class="fa fa-circle offline"></i> left 30 mins ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Christian Kelly</div>
              <div class="status">
                <i class="fa fa-circle offline"></i> left 10 hours ago
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Monica Ward</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Dean Henry</div>
              <div class="status">
                <i class="fa fa-circle offline"></i> offline since Oct 28
              </div>
            </div>
          </li>

          <li class="clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg" alt="avatar" />
            <div class="about">
              <div class="name">Peyton Mckinney</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="chat">
        <div class="chat-header clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

          <div class="chat-about">
            <div class="chat-with">Chat with Vincent Porter</div>
            <div class="chat-num-messages">already 1 902 messages</div>
          </div>
          <i class="fa fa-star"></i>
        </div> <!-- end chat-header -->

        <div class="chat-history">
          <ul>
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

              </div>
              <div class="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                <span class="message-data-time">10:12 AM, Today</span>
              </div>
              <div class="message my-message">
                Are we meeting today? Project has been already finished and I have results to show you.
              </div>
            </li>

            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>

              </div>
              <div class="message other-message float-right">
                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                <span class="message-data-time">10:20 AM, Today</span>
              </div>
              <div class="message my-message">
                Actually everything was fine. I'm very excited to show this to our team.
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
                <span class="message-data-time">10:31 AM, Today</span>
              </div>
              <i class="fa fa-circle online"></i>
              <i class="fa fa-circle online" style="color: #AED2A6"></i>
              <i class="fa fa-circle online" style="color:#DAE9DA"></i>
            </li>

          </ul>

        </div> <!-- end chat-history -->

        <div class="chat-message clearfix">
          <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>

          <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i class="fa fa-file-image-o"></i>

          <button>Send</button>

        </div> <!-- end chat-message -->

      </div> <!-- end chat -->

    </div> <!-- end container -->
  </div>
</template>

<script id="message-template" type="text/x-handlebars-template">
<li class="clearfix">
<div class="message-data align-right">
  <span class="message-data-time" >, Today</span> &nbsp; &nbsp;
  <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
</div>
<div class="message other-message float-right">

</div>
</li>
</script>

<script id="message-response-template" type="text/x-handlebars-template">
<li>
<div class="message-data">
  <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
  <span class="message-data-time">{{time}}, Today</span>
</div>
<div class="message my-message">
  {{response}}
</div>
</li>
</script>
<script>
// (function(){
//
//   var chat = {
//     messageToSend: '',
//     messageResponses: [
//       'Why did the web developer leave the restaurant? Because of the table layout.',
//       'How do you comfort a JavaScript bug? You console it.',
//       'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
//       'What is the most used language in programming? Profanity.',
//       'What is the object-oriented way to become wealthy? Inheritance.',
//       'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
//     ],
//     init: function() {
//       this.cacheDOM();
//       this.bindEvents();
//       this.render();
//     },
//     cacheDOM: function() {
//       this.$chatHistory = $('.chat-history');
//       this.$button = $('button');
//       this.$textarea = $('#message-to-send');
//       this.$chatHistoryList =  this.$chatHistory.find('ul');
//     },
//     bindEvents: function() {
//       this.$button.on('click', this.addMessage.bind(this));
//       this.$textarea.on('keyup', this.addMessageEnter.bind(this));
//     },
//     render: function() {
//       this.scrollToBottom();
//       if (this.messageToSend.trim() !== '') {
//         var template = Handlebars.compile( $("#message-template").html());
//         var context = {
//           messageOutput: this.messageToSend,
//           time: this.getCurrentTime()
//         };
//
//         this.$chatHistoryList.append(template(context));
//         this.scrollToBottom();
//         this.$textarea.val('');
//
//         // responses
//         var templateResponse = Handlebars.compile( $("#message-response-template").html());
//         var contextResponse = {
//           response: this.getRandomItem(this.messageResponses),
//           time: this.getCurrentTime()
//         };
//
//         setTimeout(function() {
//           this.$chatHistoryList.append(templateResponse(contextResponse));
//           this.scrollToBottom();
//         }.bind(this), 1500);
//
//       }
//
//     },
//
//     addMessage: function() {
//       this.messageToSend = this.$textarea.val()
//       this.render();
//     },
//     addMessageEnter: function(event) {
//       // enter was pressed
//       if (event.keyCode === 13) {
//         this.addMessage();
//       }
//     },
//     scrollToBottom: function() {
//       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
//     },
//     getCurrentTime: function() {
//       return new Date().toLocaleTimeString().
//       replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
//     },
//     getRandomItem: function(arr) {
//       return arr[Math.floor(Math.random()*arr.length)];
//     }
//
//   };
//
//   chat.init();
//
//   var searchFilter = {
//     options: { valueNames: ['name'] },
//     init: function() {
//       var userList = new List('people-list', this.options);
//       var noItems = $('<li id="no-items-found">No items found</li>');
//
//       userList.on('updated', function(list) {
//         if (list.matchingItems.length === 0) {
//           $(list.list).append(noItems);
//         } else {
//           noItems.detach();
//         }
//       });
//     }
//   };
//
//   searchFilter.init();
//
// })();
export default {
  name: "index2",
  data: {
    return: {
      time: '',
      messageOutput: ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@use 'sass:color';
@import url(https://fonts.googleapis.com/css?family=Lato:400,700);

$green: #86BB71;
$blue: #94C2ED;
$orange: #E38968;
$gray: #92959E;

*, *:before, *:after {
  box-sizing: border-box;
}

.body {
  background: #C5DDEB;
  font: 14px/20px "Lato", Arial, sans-serif;
  padding: 40px 0;
  color: white;
}

.container {
  margin: 0 auto;
  width: 750px;
  background: #444753;
  border-radius: 5px;
}

.people-list {
  width:260px;
  float: left;

  .search {
    padding: 20px;
  }

  input {
    border-radius: 3px;
    border: none;
    padding: 14px;
    color: white;
    background: #6A6C75;
    width: 90%;
    font-size: 14px;
  }

  .fa-search {
    position: relative;
    left: -25px;
  }

  ul {
    padding: 20px;
    height: 770px;

    li {
      padding-bottom: 20px;
    }
  }

  img {
    float: left;
  }

  .about {
    float: left;
    margin-top: 8px;
  }

  .about {
    padding-left: 8px;
  }

  .status {
    color: $gray;
  }

}

.chat {
  width: 490px;
  float:left;
  background: #F2F5F8;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  color: #434651;

  .chat-header {
    padding: 20px;
    border-bottom: 2px solid white;

    img {
      float: left;
    }

    .chat-about {
      float: left;
      padding-left: 10px;
      margin-top: 6px;
    }

    .chat-with {
      font-weight: bold;
      font-size: 16px;
    }

    .chat-num-messages {
      color: $gray;
    }

    .fa-star {
      float: right;
      color: #D8DADF;
      font-size: 20px;
      margin-top: 12px;
    }
  }

  .chat-history {
    padding: 30px 30px 20px;
    border-bottom: 2px solid white;
    overflow-y: scroll;
    height: 575px;

    .message-data {
      margin-bottom: 15px;
    }

    .message-data-time {
      color: color.adjust($gray, $lightness: 8%);
      padding-left: 6px;
    }

    .message {
      color: white;
      padding: 18px 20px;
      line-height: 26px;
      font-size: 16px;
      border-radius: 7px;
      margin-bottom: 30px;
      width: 90%;
      position: relative;

      &:after {
        bottom: 100%;
        left: 7%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: $green;
        border-width: 10px;
        margin-left: -10px;
      }
    }

    .my-message {
      background: $green;
    }

    .other-message {
      background: $blue;

      &:after {
        border-bottom-color: $blue;
        left: 93%;
      }
    }

  }

  .chat-message {
    padding: 30px;

    textarea {
      width: 100%;
      border: none;
      padding: 10px 20px;
      font: 14px/22px "Lato", Arial, sans-serif;
      margin-bottom: 10px;
      border-radius: 5px;
      resize: none;

    }

    .fa-file-o, .fa-file-image-o {
      font-size: 16px;
      color: gray;
      cursor: pointer;

    }

    button {
      float: right;
      color: $blue;
      font-size: 16px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      font-weight: bold;
      background: #F2F5F8;

      &:hover {
        color: color.adjust($blue, $lightness: -7%);
      }
    }
  }
}

.online, .offline, .me {
  margin-right: 3px;
  font-size: 10px;
}

.online {
  color: $green;
}

.offline {
  color: $orange;
}

.me {
  color: $blue;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

</style>