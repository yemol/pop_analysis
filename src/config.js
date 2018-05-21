export default {
	sites: [
		{
			name: "Bilibili",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"https://space.bilibili.com/ajax/member/getSubmitVideos?mid=21838789&pagesize=50&tid=0&page=1&keyword=&order=pubdate",
				"https://space.bilibili.com/ajax/member/getSubmitVideos?mid=21838789&pagesize=50&tid=0&page=2&keyword=&order=pubdate",
				"https://space.bilibili.com/ajax/member/getSubmitVideos?mid=21838789&pagesize=50&tid=0&page=3&keyword=&order=pubdate",
				"https://space.bilibili.com/ajax/member/getSubmitVideos?mid=21838789&pagesize=50&tid=0&page=4&keyword=&order=pubdate"
			]
		},
		{
			name: "douyu",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"https://v.douyu.com/video/author/getAuthorVideoListByNew?uid=4314&cate2_id=0&limit=50&page=1",
				"https://v.douyu.com/video/author/getAuthorVideoListByNew?uid=4314&cate2_id=0&limit=50&page=2",
				"https://v.douyu.com/video/author/getAuthorVideoListByNew?uid=4314&cate2_id=0&limit=50&page=3",
				"https://v.douyu.com/video/author/getAuthorVideoListByNew?uid=4314&cate2_id=0&limit=50&page=4"
			]
		},
		{
			name: "huya",
			type: "video",
			searchFor: "ul.video-list li",
			retunType: "html",
			links: [
				"http://v.huya.com/u/1544288349/video.html?p=1",
				"http://v.huya.com/u/1544288349/video.html?p=2",
				"http://v.huya.com/u/1544288349/video.html?p=3",
				"http://v.huya.com/u/1544288349/video.html?p=4",
				"http://v.huya.com/u/1544288349/video.html?p=5",
				"http://v.huya.com/u/1544288349/video.html?p=6",
				"http://v.huya.com/u/1544288349/video.html?p=7",
				"http://v.huya.com/u/1544288349/video.html?p=8",
				"http://v.huya.com/u/1544288349/video.html?p=9",
				"http://v.huya.com/u/1544288349/video.html?p=10"
			]
		},
		{
			name: "youku_o",
			type: "video",
			searchFor: "div.videos-list div.items div.va",
			retunType: "html",
			links: [
				"http://i.youku.com/i/UMTAxMTA2MDY0/videos?order=1&page=1",
				"http://i.youku.com/i/UMTAxMTA2MDY0/videos?order=1&page=2",
				"http://i.youku.com/i/UMTAxMTA2MDY0/videos?order=1&page=3",
				"http://i.youku.com/i/UMTAxMTA2MDY0/videos?order=1&page=4"
			]
		},
		{
			name: "youku_d",
			type: "video",
			searchFor: "div.videos-list div.items div.va",
			retunType: "html",
			links: [
				"http://i.youku.com/i/UNTc4NTc2ODg4/videos?order=1&page=1",
				"http://i.youku.com/i/UNTc4NTc2ODg4/videos?order=1&page=2",
				"http://i.youku.com/i/UNTc4NTc2ODg4/videos?order=1&page=3",
				"http://i.youku.com/i/UNTc4NTc2ODg4/videos?order=1&page=4"
			]
		}
	],
	acceptLanguage: 'zh-CN,zh;q=0.8',
	UserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
	Cookie: '',
	heartbeat: 2000,
	log: "info",
	mysql: {
		host: '10.0.0.185',
		username: "root",
		password: "gamefy123",
		database: "report"
	}
}
