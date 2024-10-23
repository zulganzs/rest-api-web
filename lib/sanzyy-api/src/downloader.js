const axios = require("axios");
const fetch = require("node-fetch");
const formData = require("form-data");
const {
  isUrl
} = require("../function/isUrl.js");
const cheerio = require("cheerio");
const {
  igStalk
} = require("./search.js");
async function twitterdl2(link) {
  try {
    const twitter = {
      status: true,
      type: "",
      media: []
    };
    const {
      data: result
    } = await axios("https://savetwitter.net/api/ajaxSearch", {
      method: "post",
      data: {
        q: link,
        lang: "en"
      },
      headers: {
        accept: "*/*",
        "user-agent": "PostmanRuntime/7.32.2",
        "content-type": "application/x-www-form-urlencoded"
      }
    });
    let res = cheerio.load(result.data);
    if (res("div.tw-video").length === 0) {
      res("div.video-data > div > ul > li").each(function () {
        twitter.type = "image";
        twitter.media.push(res(this).find("div > div:nth-child(2) > a").attr("href"));
      });
    } else {
      res("div.tw-video").each(function () {
        twitter.type = "video";
        twitter.media.push({
          quality: res(this).find(".tw-right > div > p:nth-child(1) > a").text().split("(")[1].split(")")[0],
          url: res(this).find(".tw-right > div > p:nth-child(1) > a").attr("href")
        });
      });
    }
    return twitter;
  } catch (_0x4189a2) {
    const _0x4734fe = {
      status: false,
      message: "Media not found!" + String(_0x4189a2)
    };
    console.log(_0x4734fe);
    return _0x4734fe;
  }
}
async function threads(_0xdadb68) {
  try {
    const {
      data: _0x37b5b1
    } = await axios.get("https://api.threadsphotodownloader.com/v2/media?url=" + _0xdadb68);
    return _0x37b5b1;
  } catch (_0x45750b) {
    return String(_0x45750b);
  }
}
async function fbdl(_0x1896cd) {
  try {
    const {
      data: _0x172048
    } = await axios("https://fdownload.app/api/ajaxSearch", {
      method: "post",
      data: {
        p: "home",
        q: _0x1896cd,
        lang: "en"
      },
      headers: {
        accept: "*/*",
        "content-type": "application/x-www-form-urlencoded",
        "x-requested-with": "XMLHttpRequest"
      }
    });
    const _0x301a0e = cheerio.load(_0x172048.data);
    let _0x55b8fa = [];
    _0x301a0e("#fbdownloader > div.tab-wrap > div:nth-child(5) > table > tbody > tr").each(function () {
      if (_0x301a0e(this).find("td:nth-child(2)").text() === "Yes") {
        var _0x38e1fc = _0x301a0e(this).find("td:nth-child(3) > button").attr("data-videourl");
      } else {
        var _0x38e1fc = _0x301a0e(this).find("td:nth-child(3) > a").attr("href");
      }
      _0x55b8fa.push({
        quality: _0x301a0e(this).find("td.video-quality").text().split("p")[0],
        render: _0x301a0e(this).find("td:nth-child(2)").text(),
        url: _0x38e1fc
      });
    });
    if (_0x55b8fa.length === 0) {
      const _0x40977e = {
        status: false,
        message: "Couldn't fetch data of url"
      };
      return _0x40977e;
    }
    return _0x55b8fa.filter(_0x33b283 => _0x33b283.render === "No");
  } catch (_0x2df0bb) {
    const _0x2649b6 = {
      status: false,
      message: "Couldn't fetch data of url\n\n" + String(_0x2df0bb)
    };
    console.log(_0x2649b6);
    return _0x2649b6;
  }
}
async function twitterdl(_0x2dff68) {
  const {
    data: _0xbdc355
  } = await axios.get("https://twitsave.com/info?url=" + _0x2dff68);
  let _0x34adcb = cheerio.load(_0xbdc355);
  let _0x16bf50 = [];
  _0x34adcb("div.origin-top-right > ul > li").each(function () {
    _0x16bf50.push({
      width: _0x34adcb(this).find("a > div > div > div").text().split("Resolution: ")[1].split("x")[0],
      height: _0x34adcb(this).find("a > div > div > div").text().split("Resolution: ")[1].split("x")[1],
      url: _0x34adcb(this).find("a").attr("href")
    });
  });
  if (_0x16bf50.length === 0 || _0x16bf50.length === null) {
    const _0x234d8f = {
      status: false,
      message: "Tidak dapat menemukan video"
    };
    console.log(_0x234d8f);
    return _0x234d8f;
  }
  resolt = _0x16bf50.sort(function (_0x67be77, _0x44e347) {
    return _0x67be77.height - _0x44e347.height;
  });
  arrayResult = resolt[resolt.length - 1];
  return resolt.filter(_0x544ea7 => _0x544ea7.width === arrayResult.width);
}
async function tiktokdl(_0x333dfe) {
  try {
    const {
      data: _0x2651b4
    } = await axios("https://downloader.bot/api/tiktok/info", {
      method: "post",
      data: {
        url: _0x333dfe
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return _0x2651b4;
  } catch (_0x296383) {
    const _0x1a1b6d = {
      status: false,
      message: "Video not found",
      messageCmd: String(_0x296383)
    };
    console.log(_0x1a1b6d);
    return _0x1a1b6d;
  }
}
async function igdl2(_0x43ff39) {
  try {
    let _0x64d1c8 = {
      status: true,
      media: []
    };
    const {
      data: _0x54b7e6
    } = await axios("https://www.y2mate.com/mates/analyzeV2/ajax", {
      method: "post",
      data: {
        k_query: _0x43ff39,
        k_page: "Instagram",
        hl: "id",
        q_auto: 0
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "PostmanRuntime/7.32.2"
      }
    });
    await _0x54b7e6.links.video.map(_0x330710 => _0x64d1c8.media.push(_0x330710.url));
    return _0x64d1c8;
  } catch (_0x444112) {
    const _0x379206 = {
      status: false,
      message: "Media not found"
    };
    return _0x379206;
  }
}
async function igdl(_0x501bf4) {
  try {
    const _0x43e5cb = await axios.post("https://saveig.app/api/ajaxSearch", new URLSearchParams({
      q: _0x501bf4,
      t: "media",
      lang: "id"
    }), {
      headers: {
        accept: "*/*",
        "user-agent": "PostmanRuntime/7.32.2"
      }
    });
    let _0x53e173 = {
      status: true,
      data: []
    };
    const _0x2a1a7a = cheerio.load(_0x43e5cb.data.data);
    _0x2a1a7a(".download-box > li > .download-items").each(function () {
      _0x53e173.data.push(_0x2a1a7a(this).find(".download-items__btn > a").attr("href"));
    });
    return _0x53e173;
  } catch {
    const _0x3fab37 = {
      status: false,
      message: "Couldn't fetch data of url"
    };
    console.log(_0x3fab37);
    return _0x3fab37;
  }
}
async function pindl(_0x4fa295) {
  try {
    const {
      data: _0x56383d
    } = await axios.get("https://www.savepin.app/download.php?url=" + _0x4fa295 + "&lang=en&type=redirect");
    const _0x1ef212 = cheerio.load(_0x56383d);
    const _0x259a1d = {
      status: true,
      url: decodeURIComponent(_0x1ef212(".download-link > div:nth-child(2) > div > table > tbody >  tr:nth-child(1) > td:nth-child(3) > a").attr("href").split("url=")[1])
    };
    console.log(_0x259a1d);
    return _0x259a1d;
  } catch (_0x5af81b) {
    result = {
      status: false,
      msg: "Error: Invalid URL!"
    };
    console.log(result);
    return result;
  }
}
async function tiktokdl2(_0x4965e4) {
  let _0x1bc412 = {};
  const _0x10cb22 = new formData();
  _0x10cb22.append("q", _0x4965e4);
  _0x10cb22.append("lang", "id");
  try {
    const {
      data: _0x1da8cb
    } = await axios("https://savetik.co/api/ajaxSearch", {
      method: "post",
      data: _0x10cb22,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": "PostmanRuntime/7.32.2"
      }
    });
    const _0xcc740c = cheerio.load(_0x1da8cb.data);
    _0x1bc412.status = true;
    _0x1bc412.caption = _0xcc740c("div.video-data > div > .tik-left > div > .content > div > h3").text();
    _0x1bc412.server1 = {
      quality: "MEDIUM",
      url: _0xcc740c("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
    };
    _0x1bc412.server2 = {
      quality: "MEDIUM",
      url: _0xcc740c("div.video-data > div > .tik-right > div > p:nth-child(2) > a").attr("href")
    };
    _0x1bc412.serverHD = {
      quality: _0xcc740c("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
      url: _0xcc740c("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
    };
    _0x1bc412.audio = _0xcc740c("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");
    return _0x1bc412;
  } catch (_0x19fe86) {
    _0x1bc412.status = false;
    _0x1bc412.message = "Video not found!";
    console.log(_0x1bc412);
    return _0x1bc412;
  }
}
async function soundcloud(_0x53b5f4) {
  if (!isUrl(_0x53b5f4)) {
    throw new Error("Please input url");
  }
  if (!_0x53b5f4.includes("soundcloud.com")) {
    throw new Error("Invalid soundcloud url");
  }
  try {
    const {
      data: _0x4a0535
    } = await axios("https://api.downloadsound.cloud/track", {
      method: "post",
      data: {
        url: _0x53b5f4
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
    return _0x4a0535;
  } catch (_0x22c7e5) {
    console.log(_0x22c7e5.response.data);
    return _0x22c7e5.response.data;
  }
}
async function spotify(_0xb8e678) {
  if (!isUrl(_0xb8e678)) {
    throw new Error("Please input Url");
  }
  if (_0xb8e678.includes("spotify.link")) {
    const _0x39fee3 = async () => {
      const _0x351508 = await fetch(_0xb8e678);
      return _0x351508.url;
    };
    const _0x286018 = await _0x39fee3(_0xb8e678);
    const _0x3bd7b0 = await axios.get("https://api.spotifydown.com/metadata/track/" + _0x286018.split("track/")[1].split("?")[0], {
      headers: {
        Origin: "https://spotifydown.com",
        Referer: "https://spotifydown.com/"
      }
    });
    const {
      data: _0x320e4e
    } = await axios.get("https://api.spotifydown.com/download/" + _0x3bd7b0.data.id, {
      headers: {
        Origin: "https://spotifydown.com",
        Referer: "https://spotifydown.com/"
      }
    });
    return _0x320e4e;
  } else if (_0xb8e678.includes("open.spotify.com")) {
    const {
      data: _0x21222b
    } = await axios.get("https://api.spotifydown.com/download/" + _0xb8e678.split("track/")[1].split("?")[0], {
      headers: {
        Origin: "https://spotifydown.com",
        Referer: "https://spotifydown.com/"
      }
    });
    return _0x21222b;
  } else {
    const _0x2778e1 = {
      status: false,
      message: "Please input valid spotify url"
    };
    console.log(_0x2778e1);
    return _0x2778e1;
  }
}
async function igStory(_0x47205f) {
  try {
    const {
      pkId: _0x38bbb7
    } = await igStalk(_0x47205f);
    const {
      data: _0xf4a8d6
    } = await axios.get("https://instasupersave.com/api/ig/stories/" + _0x38bbb7);
    let _0x4fb204 = {
      status: true,
      media: []
    };
    _0xf4a8d6.result.map(_0x16d237 => {
      if (_0x16d237.has_audio === true) {
        var _0x29f894 = _0x16d237.video_versions[0].url;
      } else {
        var _0x52a969 = _0x16d237.image_versions2.candidates.find(_0x1f27ff => _0x1f27ff.height <= 3000);
        var _0x29f894 = _0x52a969.url;
      }
      _0x4fb204.media.push(_0x29f894);
    });
    if (_0x4fb204.media.length === 0) {
      _0x4fb204.status = false;
      _0x4fb204.media = null;
      _0x4fb204.message = "The account you're looking for doesn't have any stories or maybe the account is private.";
    }
    return _0x4fb204;
  } catch (_0x564754) {
    console.log(_0x564754);
    const _0xda7178 = {
      status: false,
      message: "Unknown error occurred."
    };
    return _0xda7178;
  }
}
module.exports = {
  tiktokdl2: tiktokdl2,
  soundcloud: soundcloud,
  spotify: spotify,
  igStory: igStory,
  twitterdl2: twitterdl2,
  igdl2: igdl2,
  threads: threads,
  fbdl: fbdl,
  twitterdl: twitterdl,
  tiktokdl: tiktokdl,
  pindl: pindl,
  igdl: igdl
};