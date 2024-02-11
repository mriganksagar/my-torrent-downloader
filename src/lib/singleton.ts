import WebTorrent from "webtorrent";

// const SingletonInstance = (function(){
//     let webTorrentClient:WebTorrent.Instance;
//     function initWebTorrentClient(){
//         const client = new WebTorrent();
//         return client;
//     }
//     return {
//         getWebTorrentClient: function(){
//             if(!webTorrentClient){
//                 webTorrentClient = initWebTorrentClient();
//             }
//             return webTorrentClient;
//         }
//     }
// })();

// const webTorrentClient = SingletonInstance.getWebTorrentClient();
const webTorrentClient = new WebTorrent();

export {
    webTorrentClient,
}