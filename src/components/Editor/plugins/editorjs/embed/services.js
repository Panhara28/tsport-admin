/*eslint-disable*/
export default {
  facebook_video: {
    regex: /https:\/\/(www|web).facebook.com\/(.*\/videos\/\d*)/,
    embedUrl: 'https://www.facebook.com/<%= remote_id %>',
    html: '<div class="facebook-media"><div class="fb-video" data-href="<%= remote_source %>" data-show-text="false" data-width=""></div></div>',
    isDynamicScript: true,
    dynamicScript: "https://connect.facebook.net/en_US/sdk.js",
    //Function to load dynamic embed
    //https://stackoverflow.com/questions/11536314/how-to-re-init-facebook
    dynamicScriptCallback: {
      arguments: "",
      body: "FB.XFBML.parse();"
    },
    id: (ids) => ids[1]
  },
  facebook_post: {
    regex: /https:\/\/(www|web).facebook.com\/(.*\/posts\/\d*)/,
    embedUrl: 'https://www.facebook.com/<%= remote_id %>',
    html: '<div class="facebook-media"><div class="fb-post" data-href="<%= remote_source %>" data-show-text="true" data-width="auto"></div></div>',
    isDynamicScript: true,
    dynamicScript: "https://connect.facebook.net/en_US/sdk.js",
    //Function to load dynamic embed
    //https://stackoverflow.com/questions/11536314/how-to-re-init-facebook
    dynamicScriptCallback: {
      arguments: "",
      body: "FB.XFBML.parse();"
    },
    id: (ids) => ids[1]
  },
  youtube: {
    regex: /<iframe width="\d*" height="\d*" src="https:\/\/www.youtube.com\/embed\/([a-zA-Z0-9 \?\=\&\;\_\-]*)".*><\/iframe>/,
    embedUrl: 'https://www.youtube.com/embed/<%= remote_id %>',
    html: '<iframe src="<%= remote_source %>" width="<%= remote_width %>" height="<%= remote_height %>" style="border:none;overflow:hidden;max-width: 100%;" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    height: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe width="\d*" height="(\d*)" src="https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9 \?\=\&\;\_\-]*".*><\/iframe>/);
      let height = regexGroups[1];
      return height;
    },
    width: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe width="(\d*)" height="\d*" src="https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9 \?\=\&\;\_\-]*".*><\/iframe>/);
      let width = regexGroups[1];
      return width;
    }
  },
  dailymail: {
    regex: /<iframe.*width="\d*" height="\d*".* id="molvideoplayer" title="MailOnline Embed Player" src="https:\/\/www.dailymail.co.uk\/embed\/video\/(\d*.html)"><\/iframe>/,
    embedUrl: 'https://www.dailymail.co.uk/embed/video/<%= remote_id %>',
    html: '<iframe src="<%= remote_source %>" width="<%= remote_width %>" height="<%= remote_height %>" style="border:none;overflow:hidden;max-width: 100%;" allowfullscreen frameborder="0" scrolling="no" id="molvideoplayer" title="MailOnline Embed Player"></iframe>',
    height: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe.*width="\d*" height="(\d*)".* id="molvideoplayer" title="MailOnline Embed Player" src="https:\/\/www.dailymail.co.uk\/embed\/video\/(\d*.html)"><\/iframe>/);
      let height = regexGroups[1];
      return height;
    },
    width: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe.*width="(\d*)" height="\d*".* id="molvideoplayer" title="MailOnline Embed Player" src="https:\/\/www.dailymail.co.uk\/embed\/video\/(\d*.html)"><\/iframe>/);
      let width = regexGroups[1];
      return width;
    }
  },
  bbc: {
    regex: /<iframe.*width="\d*" height="\d*".*src="https:\/\/www.bbc.com\/news\/av\/embed\/([^\/\?\&]*\/\d*)"><\/iframe>/,
    embedUrl: 'https://www.bbc.com/news/av/embed/<%= remote_id %>',
    html: '<iframe src="<%= remote_source %>" width="<%= remote_width %>" height="<%= remote_height %>" style="border:none;overflow:hidden;max-width: 100%;" frameborder="0"></iframe>',
    height: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe.*width="\d*" height="(\d*)".*src="https:\/\/www.bbc.com\/news\/av\/embed\/[^\/\?\&]*\/\d*"><\/iframe>/);
      let height = regexGroups[1];
      return height;
    },
    width: (url) => {
      //Extract width from the iframe tag
      let regexGroups = url.match(/<iframe.*width="(\d*)" height="\d*".*src="https:\/\/www.bbc.com\/news\/av\/embed\/[^\/\?\&]*\/\d*"><\/iframe>/);
      let width = regexGroups[1];
      return width;
    },
    id: (ids) => ids.join('/')
  },
  twitter: {
    regex: /<blockquote class="twitter-tweet".*><p lang="[a-z]*" dir="ltr">.*<\/blockquote> <script async src="https:\/\/platform.twitter.com\/widgets.js" charset="utf-8"><\/script>/,
    isDynamicScript: true,
    dynamicScript: (url) => {
      let regexGroups = url.match(/<blockquote class="twitter-tweet".*><p lang="[a-z]*" dir="ltr">.*<\/blockquote> <script async src="(https:\/\/platform.twitter.com\/widgets.js)" charset="utf-8"><\/script>/);
      let script = regexGroups[1];
      return script;
    },
    //Function to load dynamic embed
    //https://stackoverflow.com/questions/9423182/can-twitters-embedded-tweets-be-rendered-dynamically
    dynamicScriptCallback: {
      arguments: "",
      body: "twttr.widgets.load();"
    }
  },
  instagram: {
    regex: /<blockquote class="instagram-media" .*data-instgrm-permalink="https:\/\/www.instagram.com\/(tv|p)\/[a-zA-Z0-9 \?\=\&\;\_\-]*\/.*" data-instgrm-version="\d*" .*<\/blockquote> <script async src="\/\/www.instagram.com\/embed.js"><\/script>/,
    isDynamicScript: true,
    dynamicScript: (url) => {
      let regexGroups = url.match(/<blockquote class="instagram-media" .*data-instgrm-permalink="https:\/\/www.instagram.com\/(tv|p)\/[a-zA-Z0-9 \?\=\&\;\_\-]*\/.*" data-instgrm-version="\d*" .*<\/blockquote> <script async src="(\/\/www.instagram.com\/embed.js)"><\/script>/);
      let script = regexGroups[2];
      return script;
    },
    //Function to load dynamic embed
    //https://stackoverflow.com/questions/27408917/instagram-embeds-not-working-when-adding-embeds-dynamically
    dynamicScriptCallback: {
      arguments: "",
      body: "window.instgrm.Embeds.process();"
    }
  },

  tiktok: {
    regex: /<blockquote class="tiktok-embed" cite="https:\/\/www.tiktok.com\/[@a-zA-Z0-9 \?\=\&\;\_\-]*\/video\/[0-9]*" data-video-id="[0-9]*" .*<\/blockquote> <script async src="https:\/\/www.tiktok.com\/embed.js"><\/script>/,
    isDynamicScript: true,
    dynamicScript: (url) => {
      let regexGroups = url.match(/<blockquote class="tiktok-embed" cite="https:\/\/www.tiktok.com\/[@a-zA-Z0-9 \?\=\&\;\_\-]*\/video\/[0-9]*" data-video-id="[0-9]*" .*<\/blockquote> <script async src="(https:\/\/www.tiktok.com\/embed.js)"><\/script>/);
      let script = regexGroups[1];
      return script;
    },
    //Function to load dynamic embed
    dynamicScriptCallback: {
      arguments: "",
      body: ""
    }
  }
};