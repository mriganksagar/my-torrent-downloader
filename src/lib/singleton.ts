import WebTorrent from "webtorrent";
// import trackers from "../trackers.json";
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

// console.log(trackers.trackers);
// let webTorrentClient: WebTorrent.Instance;

// fetch(
// 	"https://ngosang.github.io/trackerslist/trackers_all.txt",
// ).then(_ => _.text()).then(_ => _.match(/[^\r\n]+/g)).then(trackers_fetched => {
//     webTorrentClient = new WebTorrent({
//         tracker:{
//             announce: [
//                 ...trackers_fetched
//             ]    
//         }
//     })
// });

// const webTorrentClient = new WebTorrent({
// 	tracker: {
// 		announce: trackers.trackers,
// 	},
// });
const webTorrentClient = new WebTorrent();

export { webTorrentClient };