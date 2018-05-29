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
		},
		{
			name: "qq_o",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=1&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=2&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=3&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=4&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=5&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7306d7e4109ddadb73641ebb97994585&qm=1&pagenum=6&num=30&sorttype=0&orderflag=0"
			]
		},
		{
			name: "qq_d",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=1&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=2&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=3&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=4&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=5&num=30&sorttype=0&orderflag=0",
				"http://c.v.qq.com/vchannelinfo?otype=json&uin=7806c8c564e3ac7df120dc8a37aa61aa&qm=1&pagenum=6&num=30&sorttype=0&orderflag=0"
			]
		},
		{
			name: "aiqiyi",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747",
				"http://pub.m.iqiyi.com/h5/bubble/pgcFeeds.json?circleId=212358747"
			]
		},
		{
			name: "sohu",
			type: "video",
			searchFor: "",
			retunType: "json",
			cookie: "ppinf=2|1526340902|1527550502|bG9naW5pZDowOnx1c2VyaWQ6MTU6c3VuX2pAZ2FtZWZ5LmNufHNlcnZpY2V1c2U6MzA6MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwfGNydDoxMDoyMDE4LTA1LTE1fGVtdDoxOjB8YXBwaWQ6NjoxMDc0MDV8dHJ1c3Q6MToxfHBhcnRuZXJpZDoxOjB8cmVsYXRpb246MDp8dXVpZDoxNjo4ZDA3Y2M5NTgzOTY0YTdvfHVpZDoxNjo4ZDA3Y2M5NTgzOTY0YTdvfHVuaXFuYW1lOjA6fA; pprdig=bvB7Va1GmTveA0m_YEfdCchJIS78q1qyd_k74haD6bIt4w5zOOQZR49C4K6njfkND2VuF3-hzMcgo88bY8gXsFVJ7XFMXvye0nmm0ynZQmawi2NN3KALukP2hM5W7ITHYZLYq9yGTqpxMZTpDJcEx55ZYb-4K1cISxztFTYzhlQ",
			links: [
				"https://my.tv.sohu.com/user/wm/ta/v.do?uid=180712077&pg=1&size=50&sortType=2",
				"https://my.tv.sohu.com/user/wm/ta/v.do?uid=180712077&pg=2&size=50&sortType=2",
				"https://my.tv.sohu.com/user/wm/ta/v.do?uid=180712077&pg=3&size=50&sortType=2",
				"https://my.tv.sohu.com/user/wm/ta/v.do?uid=180712077&pg=4&size=50&sortType=2"
			]
		},
		{
			name: "163",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"https://c.m.163.com/nc/subscribe/list/T1472186716135/video/0-200.html"
			]
		},
		{
			name: "toutiao",
			type: "video",
			searchFor: "",
			retunType: "json",
			links: [
				"http://www.365yg.com/c/user/article/?user_id=6646873498&max_repin_time=0&count=50&page_type=0",
				"http://www.365yg.com/c/user/article/?user_id=6646873498&max_repin_time=0&count=50&page_type=0",
				"http://www.365yg.com/c/user/article/?user_id=6646873498&max_repin_time=0&count=50&page_type=0",
				"http://www.365yg.com/c/user/article/?user_id=6646873498&max_repin_time=0&count=50&page_type=0"
			]
		}
	],
	acceptLanguage: 'zh-CN,zh;q=0.8',
	UserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
	Cookie: '',
	heartbeat: 2000,
	living: 5,
	log: "info",
	mysql: {
		host: '10.0.0.185',
		username: "root",
		password: "gamefy123",
		database: "report"
	}
}
