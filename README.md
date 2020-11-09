# A Node JS script to show message count and conversation messages

# Requirments

1) Node js installed

2) Acess token from version 2.2,2.3 with read_mailbox permission as new versions dont have this permission 
https://developers.facebook.com/tools/explorer/

3) npm Fb module to interact with facebook graph Api
https://www.npmjs.com/package/fb

4) Chat thread Id of the conversation you want to see the messages and count



I always had this thought of getting the count of all the messages I sent & received in my group chat with friends and log those messages automatically daily. But never made it into script.

I used the Graph API v2.2 to get the converstaion details. This is the link for the docs of Graph API. I used Graph API Explorer to check whether I am getting all the required details from the API call.

The most important thing needed for this script is the initial URL for which request must be send to retrieve the details. That url can be accessed by selecting any of your conversations from here. Please note that Conversation ID is different from Profile/User ID.

After selecting the conversation ID, a request is called from the explorer and the response is displayed. Copy the url from the Get Code button at the bottom right of the explorer. It looks similar to https://graph.facebook.com/v2.2/<conversationID>?access_token=###
