
auto.waitFor();//mode = "fast"
var delay_time = 3000;
device.wakeUpIfNeeded();
events.observeToast();
sleep(delay_time);

function paddle_ocr_api() {
  console.log('PaddleOCR文字识别中');
  let list = JSON.parse(JSON.stringify(paddle.ocr(arguments[0]))); // 识别文字，并得到results
  let eps = 30; // 坐标误差
  if (arguments.length >= 2) eps = arguments[1];
  for (
      var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
  ) {
      for (var j = i + 1; j < list.length; j++) {
          if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
              var tmp = list[i];
              list[i] = list[j];
              list[j] = tmp;
          }
      }
  }

  for (
      var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
  ) {
      for (var j = i + 1; j < list.length; j++) {
          // 由于上下坐标并不绝对，采用误差eps
          if (
              Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
              eps &&
              list[i]['bounds']['left'] > list[j]['bounds']['left']
          ) {
              var tmp = list[i];
              list[i] = list[j];
              list[j] = tmp;
          }
      }
  }
  let res = '';
  for (var i = 0; i < list.length; i++) {
      res += list[i]['words'];
  }
  list = null;auto.waitFor();
importClass(android.database.sqlite.SQLiteDatabase);
importClass("java.security.SecureRandom");
importClass("java.security.MessageDigest");
importClass("javax.crypto.spec.DESKeySpec");
importClass("javax.crypto.SecretKeyFactory");
importClass("javax.crypto.Cipher");
importClass("java.security.NoSuchAlgorithmException");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.SecretKey");
importClass("javax.crypto.spec.SecretKeySpec");
importClass("javax.crypto.KeyGenerator");
importClass("javax.crypto.spec.IvParameterSpec");

importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
importClass(java.io.File);
importClass(java.io.FileOutputStream);

var config = {
    iv: "abcdfui8701olkw4",
    bm: "UTF-8",
}

for (var k in config) {
    var v = config[k]
    config[k] = new java.lang.String(v)
}

var STUDY_CONFIG = storages.create("STUDY_CONFIG");
var BAIDUAPI = storages.create("BAIDUAPI");

function noverify() {
    var noverify_thread = threads.start(function () {
        //在新线程执行的代码
        while (true) {
            textContains("访问异常").waitFor();
            console.log("检测到滑动验证");
            var delay = STUDY_CONFIG.get("huakuaidelay", "300") * 1;
            var bound = idContains("nc_1_n1t").findOne().bounds();
            var hua_bound = text("向右滑动验证").findOne().bounds();
            var x_start = bound.centerX();
            var dx = x_start - hua_bound.left;
            var x_end = hua_bound.right - dx;
            var x_mid = (x_end - x_start) * random(5, 8) / 10 + x_start;
            var back_x = (x_end - x_start) * random(2, 3) / 10;
            var y_start = random(bound.top, bound.bottom);
            var y_end = random(bound.top, bound.bottom);
            log("y_start:", y_start, "x_start:", x_start, "x_mid:", x_mid, "x_end:", x_end);
            x_start = random(x_start - 7, x_start);
            x_end = random(x_end, x_end + 10);
            //       sleep(600);
            //       press(x_start, y_start, 200);
            //       sleep(200);
            gesture(random(delay, delay + 50), [x_start, y_start], [x_mid, y_end], [x_mid - back_x, y_start], [x_end, y_end]);
            //swipe(x_start, y_start, x_end, y_end, random(900,1000));
            sleep(500);
            if (textContains("刷新").exists()) {
                click("刷新");
                continue;
            }
            if (textContains("网络开小差").exists()) {
                click("确定");
                continue;
            }
            console.log("已完成滑动验证，若滑动失败请在配置中调整滑动时间");
            sleep(1000);
        }
    });
    return noverify_thread;
}

function javaDecrypt(ciphertext, privateKey) {
    var keyb = privateKey.getBytes(config.bm); // byte[]
    var md = MessageDigest.getInstance("SHA-256");
    var thedigest = md.digest(keyb); // byte[]
    var skey = new SecretKeySpec(thedigest, "AES");
    var dcipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    dcipher.init(Cipher.DECRYPT_MODE, skey, new IvParameterSpec(config.iv.getBytes()));
    var clearbyte = dcipher.doFinal(base64Decode(ciphertext));
    return new java.lang.String(clearbyte);
}

function base64Decode(r) {
    var r = android.util.Base64.decode(r, 0)
    return r
}

function decrypt(ciphertext) {
    var info = splitCiphertextAndPassword(ciphertext)
    var privateKey = info.privateKey
    var ciphertext = info.ciphertext
    privateKey = new java.lang.String(privateKey)
    ciphertext = new java.lang.String(ciphertext)
    return javaDecrypt(ciphertext, privateKey).toString()
}

function splitCiphertextAndPassword(ciphertext) {
    var firstThreeFigures = ciphertext.slice(0, 3)
    var keyLength = parseInt(firstThreeFigures.slice(0, 1)) + parseInt(firstThreeFigures.slice(1, 2)) + parseInt(firstThreeFigures.slice(2, 3))
    var privateKey = ciphertext.slice(100, 100 + keyLength)
    var ciphertext = ciphertext.slice(100 + keyLength)
    var result = {
        privateKey: privateKey,
        ciphertext: ciphertext
    }
    return result
}

var noverify_thread = noverify();

var url = 'https://ghproxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/Study/QuestionBank.db';
var path = '/sdcard/QuestionBank.db';
device.wakeUpIfNeeded(); //点亮屏幕
var first = true; //记录答题的第一次
var r; // 替换用；

var articles = STUDY_CONFIG.get("article", true);
var video = STUDY_CONFIG.get("video", 0);
var meiri = STUDY_CONFIG.get("meiri", true);
var tiaozhan = STUDY_CONFIG.get("tiaozhan", true);
var zhuanxiang_txt = STUDY_CONFIG.get("checkbox_01", true);
var meizhou_txt = STUDY_CONFIG.get("checkbox_02", true);
var siren = STUDY_CONFIG.get("checkbox_03", true);
var shuangren = STUDY_CONFIG.get("shuangren", true);

var 专项答题下滑 = STUDY_CONFIG.get("select", 0);
var 每周答题下滑 = STUDY_CONFIG.get("selectm", 0);
var choose = STUDY_CONFIG.get("select_01", 0);


var 订阅 = STUDY_CONFIG.get("ssub", 0);

var stronger = STUDY_CONFIG.get("stronger", 0); //每日答题增强模式
var token;
var ttt;

var question_list = [];
var init_true = false;
var downloadDialog = null;
var init_url = 'https://ghproxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/Study/question';
var file_tmp = false;
var tikus = '';
/**
 * 获取用户token
 */
function get_baidu_token() { // 百度ocr
    if (!BAIDUAPI.get("AK", "") || !BAIDUAPI.get("SK", "")) {
        console.error('百度ocr配置未填写!!!');
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    }
    var res = http.post(
        'https://aip.baidubce.com/oauth/2.0/token', {
            grant_type: 'client_credentials',
            client_id: BAIDUAPI.get("AK", "").replace(/ /g, ''),
            client_secret: BAIDUAPI.get("SK", "").replace(/ /g, '')
        }
    );
    var xad = res.body.json()['access_token'];
    if (xad == null) {
        console.error('百度文字识别（OCR）配置出错了！！！，脚本结束');
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    } else {
        console.info('百度文字识别（OCR）配置正确');
    }
    return xad;
}

function get_paddle_ocr() {
    console.info("你选择了助手内置文字识别PaddleOCR");
    if (app.versionName < "1.1.0") {
        console.error("请更新助手软件！！！，脚本结束");
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    }
}

var showlog = false;
if (shuangren == true || siren == true || 订阅 != 0 || stronger != 0 || tiaozhan) {
    console.show(true);
    if (siren == true || shuangren == true) {
        console.error('正在获取截图权限，并检查ocr配置是否正确');
        if (choose == 0) {
            get_paddle_ocr();
        } else if (choose == 1) token = get_baidu_token();
    }
    if (stronger != 0) {
        console.info('正在检测增强模式配置');
        if (siren == true && choose == 1) {
            ttt = token;
        } else {
            ttt = get_baidu_token();
        }
    }
    if (!files.exists(path)) {
        //toastLog('没有题库,正在下载题库，请等待！！！');
        threads.start(function () {
            var tiku = http.get(url).body.bytes();
            //console.log(tiku)
            files.writeBytes(path, tiku);
        });
    }
    delay(2);
    show_log();
    while (!showlog) {
        sleep(1000);
    };

    if (tiaozhan || siren || shuangren)
        init();
    if (tiaozhan && !(siren == true || shuangren == true || 订阅 != 0 || stronger != 0)) {} //只开了挑战答题的话
    else {
        threads.start(function () {
            if (!requestScreenCapture(false)) {
                toastLog("请求截图失败,脚本结束");
                if (noverify_thread.isAlive()) {
                    noverify_thread.interrupt();
                }
                exit();
            }
        });
        delay(1.5);
        if (textContains("立即开始").exists() || textContains("允许").exists()) {
            if (textContains("立即开始").exists()) {
                textContains("立即开始").className("Button").findOne().click();
            } else {
                textContains("允许").className("Button").findOne().click();
            }
            console.info('自动点击获取权限按键！！！');
        }
        while (true) {
            try {
                captureScreen();
                break;
            } catch (e) {
                console.log('等待截图权限中');
            };
            sleep(1500);
        }
        console.info('立即开始，允许截图权限已获取！！！');
    }

}

function show_log() {
    threads.start(function () {
        try {
            var text = http.get('https://ghproxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/Study/showlogs').body.string();
            if (text.length == 0) {
                show_log = true;
                return;
            }
            console.info('查看使用须知，5s后自动关闭');
            var d = dialogs.build({
                title: "使用须知",
                content: text,
                positive: "关闭",
            }).on("positive", () => {
                d.dismiss();
                // setClip(text);
                d = null;
                text = null;
                showlog = true;
            }).show();
            sleep(5000);
            if (!showlog) {
                d.dismiss();
                // setClip(text)
                d = null;
                text = null;
                showlog = true;
            }
        } catch (e) {
            try {
                d.dismiss();
                d = null;
            } catch (e) {}
            text = null;
            showlog = true;
        }
    });
}


var lCount = 1; //挑战答题轮数
var qCount = 5; //挑战答题每轮答题数

var asub = 2; //订阅数
var aCount = 6; //文章默认学习篇数
var vCount = 6; //小视频默认学习个数
var cCount = 2; //收藏+分享+评论次数
var dayCount = 1; // 每日答题
var tzCount = 1; // 挑战答题
var zsyCount = 1; //争上游答题 
var doubleCount = 1; // 双人对战
var meizhou = 1; //每周答题
var zhuanxiang = 1; //专项答题

var aTime = STUDY_CONFIG.get("time1", "61"); //有效阅读一分钟1分*6
var vTime = STUDY_CONFIG.get("time2", "6"); //每个小视频学习-5秒
var rTime = 370; //广播收听6分 * 60 = 360秒

var 点点通 = {
    '有效视听': 0,
    '有效浏览': 0,
    '挑战答题': 0
};
var myScores = {}; //分数
var article_list = [];
var delay_time = 1000;
/**
 * @description: 延时函数
 * @param: seconds-延迟秒数s
 * @return: null
 */
function delay(seconds) {
    sleep(1000 * seconds + randomNum(0, 500)); //sleep函数参数单位为毫秒所以乘1000
}
/**
 * @description: 随机秒数
 * @param: seconds-秒数s
 * @return: [seconds+100,seconds+1000]
 */
function random_time(time) {
    return time + random(100, 1000);
}
/**
 * @description: 点击文本控件
 * @param: 文本
 * @return: null
 */
function my_click_clickable(target) {
    text(target).waitFor();
    click(target);
}
/**
 * @description: 生成从minNum到maxNum的随机数
 * @param: minNum-较小的数
 * @param: maxNum-较大的数
 * @return: null
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

/**
 * @description: 文章学习计时(弹窗)函数
 * @param: n-文章标号 seconds-学习秒数
 * @return: null
 */
function article_timing(n, seconds) {
    var seconds = seconds * 1;
    seconds = seconds + randomNum(1, 5);
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    for (var i = 0; i < seconds; i++) {
        while (!textContains("欢迎发表你的观点").exists()) //如果离开了文章界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "文章界面，请重新返回文章页面...");
            delay(2);
        }
        if (i % 5 == 0) //每5秒打印一次学习情况
        {
            console.info("第" + (n + 1) + "篇文章已经学习" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        sleep(1000);
        if (i % 10 == 0) //每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
        {
            toast("这是防息屏toast,请忽视-。-");
            if (i <= seconds / 2) {
                swipe(x, h1, x, h2, 500); //向下滑动
            } else {
                swipe(x, h2, x, h1, 500); //向上滑动
            }
        }
    }
}

/**
 * @description: 视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing_bailing(n, seconds) {
    var seconds = seconds * 1;
    seconds = seconds + randomNum(1, 5);
    delay(1);
    for (var i = 0; i < seconds; i++) {
        sleep(1000);
        while (!(textContains("分享").exists() || textContains("播放").exists()) || desc("工作").exists()) //如果离开了百灵小视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个视频界面，请重新返回视频");
            delay(2);
        }
        console.info("第" + (n + 1) + "个视频已经观看" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
}

/**
 * @description: 广播学习计时(弹窗)函数
 * @param: r_time-已经收听的时间 seconds-学习秒数
 * @return: null
 */
function radio_timing(r_time, seconds) {
    var seconds = seconds * 1;
    for (var i = 0; i < seconds; i++) {
        sleep(1000);
        if (i % 5 == 0) //每5秒打印一次信息
        {
            console.info("广播已经收听" + (i + 1 + r_time) + "秒,剩余" + (seconds - i - 1) + "秒!");
        }
        if (i % 15 == 0) //每15秒弹一次窗防止息屏
        {
            toast("这是防息屏弹窗，可忽略-. -");
        }
    }
}

/**
 * @description: 已读文章判断
 * @param: null
 * @return: null
 */
function insertLearnedArticle(article) {
    article_list.push(article);
}

function getLearnedArticle(article) {
    for (var i = 0; i < article_list.length; i++) {
        if (article_list[i] == article) {
            return true;
        }
    }
    return false;
}


var commentText = ["歌颂共产党,永远跟党走。", "为中华崛起而读书！", "倡导富强、民主、文明、和谐", "自由，平等，公正，法治", "不忘初心，牢记使命", "努力奋斗，回报祖国！", "赞叹中共伟大成就 祝福中国美好未来！"]; //评论内容，可自行修改，大于5个字便计分
/**
 * @description: 分享评论
 * @param: null
 * @return: null
 */
function collectCommentShare() {
    while (!text("欢迎发表你的观点").exists()) {
        toastLog("需要在文章界面");
        delay(1);
    }
    var textOrder = text("欢迎发表你的观点").findOnce().drawingOrder();

    var zhuanOrder = textOrder + 3;


    var shareIcon = className("ImageView").filter(function (iv) {
        return iv.drawingOrder() == zhuanOrder;
    }).findOnce();

    toastLog("正在进行分享评论...");

    shareIcon.click(); //点击分享
    while (!textContains("分享到学习强").exists()); //等待弹出分享选项界面
    delay(2);
    click(decodeURI("%E5%88%86%E4%BA%AB%E5%88%B0%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD"));
    delay(1);
    toastLog("分享成功!");
    delay(1);
    back(); //返回文章界面
    delay(2);
    //评论

    var num = random(0, commentText.length - 1) //随机数
    click("欢迎发表你的观点");
    delay(1);
    setText(commentText[num]); //输入评论内容
    delay(1);
    click("发布"); //点击右上角发布按钮
    //toastLog("评论成功!");
    delay(2);
    click("删除"); //删除该评论
    delay(2);
    click("确认"); //确认删除
    //toastLog("评论删除成功!");
    delay(2);
    toastLog("分享,评论结束");
}


/**
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudy(x) {
    var aCatlog = '推荐'
    while (!desc("工作").exists()); //等待加载出主页
    var listView = className("ListView"); //获取文章ListView控件用于翻页
    if (x == 0) {
        desc("工作").click(); //点击主页正下方的"学习"按钮
        delay(2);
        click(aCatlog);
    }
    delay(2);
    var zt_flag = false; //判断进入专题界面标志
    var x = aCount;
    if (点点通['有效浏览']) {
        x = Math.max(点点通['有效浏览'] * 6 - (6 - aCount), 点点通['有效浏览'] * 6);
    }
    console.log('需要学习' + x + '篇');
    for (var i = 0, t = 0; i < x;) {
        if (aCount <= 0) aTime = 6;
        try {
            if ((text('播报').findOnce(t).parent().parent().parent().child(0).parent().parent().click()) == true) {
                delay(3);
                // // delay(10); //等待加载出文章页面，后面判断是否进入了视频文章播放要用到
                //获取当前正在阅读的文章标题
                let n = 0;
                while (!textContains("欢迎发表你的观点").exists()) { //如果没有找到评论框则认为没有进入文章界面，一直等待
                    delay(1);
                    console.warn("正在等待加载文章界面...");
                    if (n > 2) { //等待超过3秒则认为进入了专题界面，退出进下一篇文章
                        console.warn("没找到评论框!该界面非文章界面!");
                        zt_flag = true;
                        break;
                    }
                    n++;
                }
                if (text("展开").exists()) { //如果存在“展开”则认为进入了文章栏中的视频界面需退出
                    console.warn("进入了视频界面，退出并进入下一篇文章!");
                    t++;
                    back();
                    listView.scrollForward();
                    delay(1.5);
                    if (rTime != 0) {
                        while (!desc("工作").exists());
                        console.info("因为广播被打断，重新收听广播...");
                        delay(0.5);
                        listenToRadio(); //听电台广播
                        while (!desc("工作").exists());
                        desc("工作").click();
                    }
                    delay(2);
                    continue;
                }
                if (zt_flag == true) { //进入专题页标志
                    console.warn("进入了专题界面，即将退出并进下一篇文章!");
                    t++;
                    back();
                    delay(2);
                    zt_flag = false;
                    continue;
                }
                var currentNewsTitle = ""
                if (id("xxqg-article-header").exists()) {
                    currentNewsTitle = id("xxqg-article-header").findOne().child(0).text(); // 最终解决办法
                } else if (textContains("来源").exists()) {
                    currentNewsTitle = textContains("来源").findOne().parent().children()[0].text();
                } else if (textContains("作者").exists()) {
                    currentNewsTitle = textContains("作者").findOne().parent().children()[0].text();
                } else if (descContains("来源").exists()) {
                    currentNewsTitle = descContains("来源").findOne().parent().children()[0].desc();
                } else if (descContains("作者").exists()) {
                    currentNewsTitle = descContains("作者").findOne().parent().children()[0].desc();
                } else {
                    console.log("无法定位文章标题,即将退出并阅读下一篇")
                    t++;
                    back();
                    delay(2);
                    continue;
                }
                if (currentNewsTitle == "") {
                    console.log("标题为空,即将退出并阅读下一篇")
                    t++;
                    back();
                    delay(2);
                    continue;
                }
                var flag = getLearnedArticle(currentNewsTitle);
                if (flag) {
                    //已经存在，表明阅读过了
                    console.info("该文章已经阅读过，即将退出并阅读下一篇");
                    t++;
                    back();
                    delay(2);
                    continue;
                } else {
                    //没阅读过，添加到数据库
                    insertLearnedArticle(currentNewsTitle);
                }
                console.log("正在学习第" + (i + 1) + "篇文章,标题：", currentNewsTitle);
                //开始循环进行文章学习
                article_timing(i, aTime);
                aCount--;
                delay(2);
                if (sCount != 0) {
                    console.info("第" + (3 - sCount) + "次分享开始");
                    sCount--;
                    collectCommentShare(); //评论和分享
                }
                back(); //返回主界面
                console.info('返回主界面');
                delay(0.3);
                while (!desc("工作").exists()) { //等待加载出主页
                    console.info("等待加载主页");
                    delay(2);
                }
                delay(2);
                //console.info('i++，t++')
                listView.scrollForward();
                delay(1)
                i++;
                t++; //t为实际点击的文章控件在当前布局中的标号,和i不同,勿改动!
            } else {
                t++;
            }
        } catch (e) {
            listView.scrollForward();
            //console.info('异常')
            t = 0;
            delay(1.5);
        }
    }
    aTime = STUDY_CONFIG.get("time1", "61");
}

/**
 * @description:百灵小视频学习函数
 * @param: null
 * @return: null
 */
function videoStudy_news(tmp) {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    //delay(1)
    if (tmp == 1) {
        desc("工作").click();
        delay(2)
        click("百灵");
        delay(1)
    }
    click("推荐");
    delay(2);
    //获取listView视频列表控件用于翻页
    var v = className('android.widget.FrameLayout').clickable(true).depth(24).findOne().bounds();
    press(v.centerX(), v.centerY(), 150);
    delay(1);
    for (var i = 0; i < vCount;) {
        if (textContains("分享").exists()) {
            console.log("即将学习第" + (i + 1) + "个视频!");
            video_timing_bailing(i, vTime); //学习每个新闻联播小片段
            //back();//返回联播频道界面
            swipe(x, h1, x, h2, 500); // 下滑动
            delay(1);
            i++;
        } else {
            delay(1);
            console.error("等待百灵视频界面");
        }
    }
    delay(2);
    back();
}

function new_bailing_video(tmp) {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    //delay(1)
    if (tmp == 1) {
        desc("工作").click();
        delay(2)
        click("百灵");
        delay(1)
    }
    for (var i = 0; i < vCount;) {
        if (textContains("百灵").exists()) {
            try {
                if (i % 2 == 0) {
                    click("推荐");
                    delay(2);
                }
                className('android.widget.FrameLayout').clickable(true).depth(22).findOnce((i % 2)).click();
                console.log("即将学习第" + (i + 1) + "个视频!");
                video_timing_bailing(i, vTime); //学习每个新闻联播小片段
                back(); //返回联播频道界面
                delay(1);
                i++;
            } catch (e) {
                delay(1);
                console.error("等待百灵视频界面");
            }

        } else {
            delay(1);
            console.error("等待百灵视频界面");
        }

    }
}

function video_news_time(n, seconds) {
    var seconds = seconds * 1;
    seconds = seconds + randomNum(1, 5);
    for (var i = 0; i < seconds; i++) {
        sleep(1000);
        while (!desc("工作").exists()) //如果离开了看电视视频界面则一直等待
        {
            console.error("当前已离开第" + (n + 1) + "个视频界面，请重新返回视频");
            delay(2);
        }
        console.info("第" + (n + 1) + "个视频已经观看" + (i + 1) + "秒,剩余" + (seconds - i - 1) + "秒!");
    }
}

/**
 * @description:电视台视频学习
 * @param: null
 * @return: null
 */
function video_news(tmp) {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    //delay(1)
    var t = 6;
    if (tmp == 1) {
        desc("工作").click();
        delay(2);
        click("电视台");
        delay(1)
        click("看电视");
        delay(2);
        t = 0;
    }
    var s = textContains("中央广播电视总台").depth(22).findOnce().parent();
    s.click();
    console.info('改变提示框位置');
    delay(1);
    console.setPosition(device.width / 4, -device.height / 4);
    for (var i = 0; i < vCount; i++) {
        if (textContains("电视台").exists()) {
            console.log("即将学习第" + (i + 1) + "个视频!");
            var cctv = s.parent().parent().parent().parent().child(1).child(0).child(t).bounds();
            press(cctv.centerX(), cctv.centerY(), 150);
            delay(2);
            video_news_time(i, vTime); //学习每个直播小片段
            delay(1);
            t++;
            t = t % 8;
        } else {
            delay(1);
            console.error("等待电视台->看电视界面");
        }
    }
    console.setPosition(0, device.height / 2);
    delay(2);
    //back();
}

/**
 * @description: 听“电台”新闻广播函数  (视听学习+视听学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function listenToRadio() {
    click("电台");
    delay(1);
    click("听广播");
    delay(2);
    while (!(textContains("正在收听").exists() || textContains("最近收听").exists() || textContains("推荐收听").exists())) {
        log("等待加载");
        delay(1);
    }
    if (click("最近收听") == 0) {
        if (click("推荐收听") == 0) {
            click("正在收听");
        }
    }
    delay(2);
    if (id("btn_back").findOne().click() == 0) {
        delay(2);
        back(); //返回电台界面
    }
    delay(2);

}



/**
 * @description: 启动app
 * @param: null
 * @return: null
 */
function start_app() {
    console.setPosition(0, device.height / 2); //部分华为手机console有bug请注释本行
    console.show(true); //部分华为手机console有bug请注释本行
    console.log("正在启动app...");
    if (!(launchApp(decodeURI("%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD")) || launch('cn.xuexi.android'))) {
        console.error(decodeURI("%E6%89%BE%E4%B8%8D%E5%88%B0%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BDApp!%EF%BC%8C%E8%AF%B7%E8%87%AA%E5%B7%B1%E5%B0%9D%E8%AF%95%E6%89%93%E5%BC%80"));
        // return;
    }
    while (!desc("工作").exists()) {
        console.log("正在等待加载出主页，如果一直加载此信息，请检测是否在主界面，或者无障碍服务可能出现BUG，请停止运行助手软件并重新给无障碍服务");
        if (textContains("取消").exists() && textContains("立即升级").exists()) {
            //toast('1');
            text("取消").click();
        }
        delay(3);
    }
    delay(1);
}


/**
 * @description: 本地频道
 * @param: null
 * @return: null
 */
function localChannel() {
    delay(1)
    while (!desc("工作").exists()); //等待加载出主页
    desc("工作").click();
    console.log("点击本地频道");
    if (text("新思想").exists()) {
        text("新思想").findOne().parent().parent().child(3).click();
        delay(3);
        className("android.support.v7.widget.RecyclerView").findOne().child(2).click();
        delay(2);
        console.log("返回主界面");
        back();
        launchApp(decodeURI("%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD"));
        delay(1);
        text("新思想").findOne().parent().parent().child(0).click();
    } else {
        console.log("请手动点击本地频道！");
    }
}

/**
 * @description: 获取积分
 * @param: null
 * @return: null
 */
function getScores(i) {
    while (!desc("工作").exists()); //等待加载出主页
    console.log("正在获取积分...");
    delay(2);
    while (!text("积分明细").exists()) {
        if (id("comm_head_xuexi_score").exists()) {
            id("comm_head_xuexi_score").findOnce().click();
        } else if (text("积分").exists()) {
            text("积分").findOnce().parent().child(1).click();
        }
        delay(3);
    }
    while (!text('登录').exists()) {
        delay(0.5);
    }
    let err = false;
    while (!err) {
        try {
            className("android.widget.ListView").findOnce().children().forEach(item => {
                var name;
                try {
                    name = item.child(0).child(0).text();
                } catch (e) {
                    name = item.child(0).text();
                }
                let str = item.child(2).text().split("/");
                let score = str[0].match(/[0-9][0-9]*/g);
                myScores[name] = score;
            });
            err = true;
        } catch (e) {
            console.log(e);
        }
    }
    if (i == 3) {
        var score = textContains("今日已累积").findOne().text();
        score += '%0A四人赛：' + myScores["四人赛"] + '分';
        score += '%0A双人赛：' + myScores["双人对战"] + '分';
        score += '%0A成长总积分：' + textContains("成长总积分").findOne().parent().child(3).text() + '分%0A';
        log(score);
        back();
        return score;
    }
    console.log(myScores);

    aCount = Math.ceil((12 - myScores["我要选读文章"]) / 2); //文章个数
    if (i == 1) {
        console.info("检查阅读文章是否满分！")
        aCount = 12 - myScores["我要选读文章"];
        if (aCount != 0) {
            console.log("还需要阅读：" + aCount.toString() + "篇！");
        } else {
            console.info("已满分！");
        }
        delay(1);
        back();
        delay(1);
        return;
    }
    if (i == 2) {
        console.info("检查视频是否满分！")
        vCount = 6 - myScores["视听学习"];
        if (vCount != 0) {
            console.log("还需要观看：" + vCount.toString() + "篇！");
        } else {
            console.info("已满分！");
        }
        delay(1);
        back();
        delay(1);
        return;
    }
    if (aCount != 0) {
        aCount = aCount;
    }
    vCount = 6 - myScores["视听学习"];
    rTime = (6 - myScores["视听学习时长"]) * 60;
    asub = 2 - myScores["订阅"];
    sCount = 1
    cCount = 1 - myScores["发表观点"]
    if (myScores["每日答题"] < 5) dayCount = 1;
    else dayCount = 0;
    if (myScores["挑战答题"] < 6) tzCount = 1;
    else tzCount = 0;
    if (myScores["四人赛"] == 0) zsyCount = 1;
    else zsyCount = 0;
    if (myScores["双人对战"] == 0) doubleCount = 1;
    else doubleCount = 0;
    if (myScores["每周答题"] == 0) meizhou = 1;
    else meizhou = 0;
    if (myScores["专项答题"] == 0) zhuanxiang = 1;
    else zhuanxiang = 0;

    console.log('评论：' + cCount.toString() + '个')
    console.log('分享：' + sCount.toString() + '个')
    console.log('订阅：' + asub.toString() + '个')
    console.log('剩余文章：' + aCount.toString() + '篇')
    // console.log('剩余每篇文章学习时长：' + aTime.toString() + '秒')
    console.log('剩余视频：' + vCount.toString() + '个')
    console.log('剩视听学习时长：' + rTime.toString() + '秒')
    console.log('每日答题：\t' + dayCount.toString());
    console.log('挑战答题：\t' + tzCount.toString());
    console.log('四人赛：\t' + zsyCount.toString());
    console.log('双人对战：\t' + doubleCount.toString());
    if (meizhou_txt == "开启")
        console.log('每周答题：\t' + meizhou.toString());
    if (zhuanxiang_txt == "开启")
        console.log('专项答题：\t' + zhuanxiang.toString());

    delay(1);
    back();
    delay(1);
}

/**
@description: 停止广播
@param: null
@return: null
*/
function stopRadio() {
    console.log("停止收听广播！");
    click("电台");
    delay(1);
    click("听广播");
    delay(2);
    while (!(textContains("正在收听").exists() || textContains("最近收听").exists() || textContains("推荐收听").exists())) {
        log("等待加载");
        delay(2)
    }
    if (click("正在收听") == 0) {
        click("最近收听");
    }
    delay(3);
    id("v_play").findOnce(0).click();
    delay(2)
    if (id("btn_back").findOne().click() == 0) {
        delay(2);
        back();
    }
    delay(2);
    try {
        if (id("v_playing").exists())
            id("v_playing").findOnce(0).click();
    } catch (e) {}

}

/**
@description: 学习平台订阅
@param: null
@return: null
*/
function pic_click(a, b, s1) {
    while (asub > 0) {
        let result = findColor(captureScreen(), '#E42417', {
            max: 5,
            region: [s1, 100, device.width - s1, device.height - 200], //区域
            threshold: 10,
        });
        if (result) {
            console.log("已经订阅了" + (3 - asub) + "个");
            press(result.x + a, result.y + b, 100);
            asub--;
        } else {
            break;
        }
        delay(1);
    }
}

function sub() {
    console.info('正在订阅');
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    desc("工作").click();
    delay(1);
    click("订阅");
    delay(1);
    click("添加");
    delay(3);
    if (!desc('推荐').exists()) {
        console.info('没有找到，可能你的xxqg不是2.33及以下版本，不支持订阅！！！');
        back();
        delay(1);
        back_table();
        return 0;
    }
    var len = desc('推荐').depth(15).findOne().parent();
    var s1 = className("android.view.View").depth(14).scrollable(true).findOne().child(0).child(2).bounds().left;
    var old_names = '';
    console.log('搜索中');
    for (var i = 0; i < len.childCount() - 1 && asub != 0; i++) {
        if (订阅 == 2) i = 1;
        len.child(i).click();
        delay(1);
        while (true && asub != 0) {
            pic_click(20, 20, s1);
            swipe(x, h1, x, h2, random(800, 1200)); // 下滑动
            delay(1);
            pic_click(20, 20, s1);
            swipe(x, h1, x, h2, random(800, 1200)); // 下滑动
            delay(1);
            try {
                var list = className("android.view.View").depth(14).findOnce(1);
                var names = list.child(2).child(1).desc(); //看第二个
                if (names == old_names) {
                    break;
                } else old_names = names;
            } catch (e) {
                if (list != null && list.childCount() < 5) break;
            }
        }
        if (订阅 == 2) break;
    }
    if (asub == 0) {
        back();
        delay(1);
        back_table();
        console.info('订阅完成');
        return 0;
    }
    desc('地方平台\nTab 2 of 2').click();
    delay(2);
    len = desc('推荐').depth(15).findOne().parent();
    list = className("android.view.View").depth(14).scrollable(true).findOne();
    old_names = '';
    for (var i = 0; i < len.childCount() - 1 && asub != 0; i++) {
        if (订阅 == 2) i = 1;
        len.child(i).click();
        delay(1);
        while (true && asub != 0) {
            pic_click(20, 20, s1);
            swipe(x, h1, x, h2, random(800, 1200)); // 下滑动
            delay(1);
            pic_click(20, 20, s1);
            swipe(x, h1, x, h2, random(800, 1200)); // 下滑动
            delay(1);
            try {
                var list = className("android.view.View").depth(14).findOnce(1);
                var names = list.child(2).child(1).desc();
                if (names == old_names) {
                    break;
                } else old_names = names;
            } catch (e) {
                if (list != null && list.childCount() < 5) break;
            }
        }
        if (订阅 == 2) break;
    }
    if (asub == 0) {
        console.info('订阅完成');
    } else {
        console.info('订阅结束,已经没有订阅的了');
    }
    back();
    delay(1);
    back_table();
}

function questionShow() {
    while (!desc("工作").exists()) {
        console.log("等待加载出主页");
        delay(1);
        if (text("排行榜").exists()) {
            return;
        }
    }
    console.log("当前在主界面")
    if (text("我的").exists()) {
        text("我的").click();
        console.log("点击我的");
    }
    delay(1);
    while (!desc("我的信息").exists()) {
        console.log("等待 我的 界面");
        delay(1);
    }
    console.log("点击我要答题");
    text("我要答题").findOne().parent().click();
    delay(1);
}

function meizhouAnswer() {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    while (!text("排行榜").exists()) {
        console.info("等待我要答题界面");
        delay(1);
    }
    var textOrder = text("排行榜").findOnce().parent();
    while (text("排行榜").exists()) {
        console.info("点击每周答题");
        textOrder.child(3).click();
        delay(1);
    }
    delay(3);
    var t = 0;
    while (true) {
        if (text('未作答').exists()) {
            text("未作答").findOne().parent().click();
            dailyAnswer();
            break;
        } else {
            if (每周答题下滑 == 0) {
                console.info("没有可答题的题目，返回");
                back();
                delay(1);
                if (text("已作答").exists()) { // 防止出现网络卡顿
                    back();
                    delay(1);
                }
                break;
            } else {
                if (textContains('您已经看到了我的底线').exists()) {
                    console.log("已经没有可答题的题目了，返回");
                    back();
                    delay(1);
                    break;
                }
                swipe(x, h1, x, h2, 100); // 下滑动
                try {
                    textContains("月").findOnce(0).parent().parent().parent().scrollForward();
                } catch (e) {}
                delay(1);
                if (t % 10 == 0)
                    console.log("向下滑动中！！！");
                t++;
            }
        }
    }

}

function zhuanxiangAnswer() {
    h = device.height; //屏幕高
    w = device.width; //屏幕宽
    x = (w / 3) * 2;
    h1 = (h / 6) * 5;
    h2 = (h / 6);
    while (!text("排行榜").exists()) {
        console.info("等待我要答题界面");
        delay(1);
    }
    var textOrder = text("排行榜").findOnce().parent();
    while (text("排行榜").exists()) {
        console.info("点击专项答题");
        textOrder.child(3).click();
        delay(1);
    }
    delay(3);
    var t = 0;

    while (true) {
        if (text("继续答题").exists() || text("开始答题").exists()) {
            if (text("继续答题").exists())
                text("继续答题").findOne().click();
            else if (text("开始答题").exists())
                text("开始答题").findOne().click();
            delay(1);
            dailyAnswer();
            break;
        } else {
            if (专项答题下滑 == 0) {
                console.log('没有可答题的题目，返回');
                back();
                delay(1);
                if (text("已满分").exists() || text("继续答题").exists() || text("开始答题").exists()) { // 防止出现网络卡顿
                    back();
                    delay(1);
                }
                break;
            } else {
                if (textContains('您已经看到了我的底线').exists()) {
                    console.log("已经没有可答题的题目了，返回");
                    back();
                    delay(1);
                    break;
                }
                swipe(x, h1, x, h2, 100); // 下滑动
                try {
                    textContains("专项").findOnce(0).parent().scrollForward();
                } catch (e) {}

                //delay(1);
                if (t % 10 == 0)
                    console.log("向下滑动中！！！");
                t++;
            }
        }
    }
}


/**
 * @description: 获取填空题题目数组
 * @param: null
 * @return: questionArray
 */
function getFitbQuestion() {
    var questionCollections = className("EditText").findOnce().parent().parent();
    var questionArray = [];
    var findBlank = false;
    var blankCount = 0;
    var blankNumStr = "";
    var i = 0;
    questionCollections.children().forEach(item => {
        if (item.className() != "android.widget.EditText") {
            if (item.text() != "") { //题目段
                if (findBlank) {
                    blankNumStr = "|" + blankCount.toString();
                    questionArray.push(blankNumStr);
                    findBlank = false;
                }
                questionArray.push(item.text());
            } else {
                findBlank = true;
                blankCount = (className("EditText").findOnce(i).parent().childCount() - 1);
                i++;
            }
        }
    });
    return questionArray;
}


/**
 * @description: 获取选择题题目数组
 * @param: null
 * @return: questionArray
 */
function getChoiceQuestion() {
    var questionCollections = className("ListView").findOnce().parent().child(1);
    var questionArray = [];
    questionArray.push(questionCollections.text());
    return questionArray;
}


/**
 * @description: 获取提示字符串
 * @param: null
 * @return: tipsStr
 */
function getTipsStr() {
    var tipsStr = "";
    while (tipsStr == "") {
        if (text("查看提示").exists()) {
            var seeTips = text("查看提示").findOnce();
            seeTips.click();
            delay(1);
            click(device.width * 0.5, device.height * 0.41);
            delay(1);
            click(device.width * 0.5, device.height * 0.35);
        } else {
            console.error("未找到查看提示");
        }
        if (text("提示").exists()) {
            var tipsLine = text("提示").findOnce().parent();
            //获取提示内容
            var tipsView = tipsLine.parent().child(1).child(0);
            tipsStr = tipsView.text();
            //关闭提示
            tipsLine.child(1).click();
            break;
        }
        delay(1);
    }
    return tipsStr;
}


/**
 * @description: 从提示中获取填空题答案
 * @param: timu, tipsStr
 * @return: ansTips
 */
function getAnswerFromTips(timu, tipsStr) {
    var ansTips = "";
    for (var i = 1; i < timu.length - 1; i++) {
        if (timu[i].charAt(0) == "|") {
            if (timu[i].charAt(0) == "|") {
                var blankLen = timu[i].substring(1);
                var s = timu[i - 1].substr(Math.max(0, timu[i - 1].length - 12), 12);
                var indexKey = tipsStr.indexOf(s) + s.length;
                var ansFind = tipsStr.substr(indexKey, blankLen);
                ansTips += ansFind;
            }
        }
    }
    return ansTips;
}

/**
 * @description: 根据提示点击选择题选项
 * @param: tipsStr
 * @return: clickStr
 */
function clickByTips(tipsStr) {
    var clickStr = "";
    var isFind = false;
    if (className("ListView").exists()) {
        var listArray = className("ListView").findOne().children();
        listArray.forEach(item => {
            var ansStr = item.child(0).child(2).text();
            if (tipsStr.indexOf(ansStr) >= 0) {
                item.child(0).click();
                clickStr += item.child(0).child(1).text().charAt(0);
                isFind = true;
            }
        });
        if (!isFind) { //没有找到 点击第一个
            listArray[0].child(0).click();
            clickStr += listArray[0].child(0).child(1).text().charAt(0);
        }
    }
    return clickStr;
}


/**
 * @description: 根据答案点击选择题选项
 * @param: answer
 * @return: null
 */
function clickByAnswer(answer) {
    var click_true = false;
    if (className("ListView").exists()) {
        var listArray = className("ListView").findOnce().children();
        listArray.forEach(item => {
            var listIndexStr = item.child(0).child(1).text().charAt(0);
            //单选答案为非ABCD
            var listDescStr = item.child(0).child(2).text();
            if (answer.indexOf(listIndexStr) >= 0 || answer == listDescStr) {
                item.child(0).click();
                click_true = true;
            }
        });
    }
    if (!click_true) {
        console.error('没有找到选项，选A跳过');
        className("ListView").findOnce().child(0).child(0).click();
    }
}

/**
 * @description: 检查答案是否正确
 * @param: question, ansTiku, answer
 * @return: null
 */
function checkAndUpdate(question, ansTiku, answer) {
    sleep(500);
    if (textContains("答案解析").exists()) { //答错了
        swipe(device.width / 2, device.height - 200, 100, 100, 500);
        if (text("确定").exists()) {
            text("确定").click();
        } else if (textContains('下一题').exists()) {
            textContains('下一题').click();
        } else if (className("Button").exists()) {
            className("Button").findOnce().click();
        } else {
            click(device.width * 0.85, device.height * 0.06);
        }
    }
}

function daily_Answer(question, table_name) {
    try {
        var db = SQLiteDatabase.openOrCreateDatabase(path, null);
        sql = "SELECT answer FROM " + table_name + " WHERE question LIKE '" + question + "%'"
        var cursor = db.rawQuery(sql, null);
        if (cursor.moveToFirst()) {
            var answer = cursor.getString(0);
            cursor.close();
            return answer;
        } else {
            cursor.close();
            return '';
        }
    } catch (e) {
        return '';
    }

}
/**
 * @description: 每日答题循环
 * @param: null
 * @return: null
 */
function dailyQuestionLoop() {
    while (true) {
        if (textStartsWith("填空题").exists()) {
            var questionArray = getFitbQuestion();
            break;
        } else if (textStartsWith("多选题").exists() || textStartsWith("单选题").exists()) {
            var questionArray = getChoiceQuestion();
            break;
        }
        log('等待题目出现');
        delay(1);
    }


    var blankArray = [];
    var question = "";
    questionArray.forEach(item => {
        if (item != null && item.charAt(0) == "|") { //是空格数
            blankArray.push(item.substring(1));
        } else { //是题目段
            question += item;
        }
    });
    question = question.replace(/\s/g, "");
    console.log("题目：" + question);

    var ansTiku = daily_Answer(question, 'tiku');

    if (ansTiku.length == 0) { //tiku表中没有则到tikuNet表中搜索答案
        ansTiku = daily_Answer(question, 'tikuNet');
    }
    var answer = ansTiku.replace(/(^\s*)|(\s*$)/g, "");
    // getAnswer(question);

    if (textStartsWith("填空题").exists()) {
        if (answer == "") {
            if (stronger == 0) {
                var tipsStr = getTipsStr();
                answer = getAnswerFromTips(questionArray, tipsStr);
                console.info("提示中的答案：" + answer);
            } else {
                var seeTips = text("查看提示").findOnce();
                seeTips.click();
                delay(1);
                var img = captureScreen();
                try {
                    var t = text('提示').findOne(3000);
                    t = t.parent().parent().child(1).child(0).bounds();
                    img = images.clip(img, t.left, t.top, t.right - t.left, t.bottom - t.top);
                } catch (e) {}
                answer = baidu_ocr_api(images.inRange(img, '#FFFF0000', '#FFFF0000'), ttt);
                console.info("百度OCR识别的答案：" + answer);
                back();
            }

            if (answer == '') answer = '没有找到提示';
            setText(0, answer.substr(0, blankArray[0]));
            if (blankArray.length > 1) {
                for (var i = 1; i < blankArray.length; i++) {
                    setText(i, answer.substr(blankArray[i - 1], blankArray[i]));
                }
            }
        } else {
            console.info("答案：" + answer);
            setText(0, answer.substr(0, blankArray[0]));
            if (blankArray.length > 1) {
                for (var i = 1; i < blankArray.length; i++) {
                    setText(i, answer.substr(blankArray[i - 1], blankArray[i]));
                }
            }
        }
    } else if (textStartsWith("多选题").exists() || textStartsWith("单选题").exists()) {
        if (answer == "") {
            if (stronger == 0) {
                var tipsStr = getTipsStr();
                answer = clickByTips(tipsStr);
                console.info("提示中的答案：" + answer);
            } else {
                var seeTips = text("查看提示").findOnce();
                seeTips.click();
                delay(1);
                var img = captureScreen();
                try {
                    var t = text('提示').findOne(3000);
                    t = t.parent().parent().child(1).child(0).bounds();
                    img = images.clip(img, t.left, t.top, t.right - t.left, t.bottom - t.top);
                } catch (e) {}
                answer = baidu_ocr_api(images.inRange(img, '#FFFF0000', '#FFFF0000'), ttt);
                console.info("百度OCR识别的答案：" + answer);
                back();
                delay(1);
                click_answer(answer);
            }
        } else {
            console.info("答案：" + answer);
            clickByAnswer(answer);
        }
    }

    delay(0.5);

    if (text("确定").exists()) {
        text("确定").click();
        delay(0.5);
    } else if (text("下一题").exists()) {
        click("下一题");
        delay(0.5);
    } else if (text("完成").exists()) {
        text("完成").click();
        delay(0.5);
    } else {
        console.warn("未找到右上角确定按钮控件，根据坐标点击(可能是模拟器)");
        click(device.width * 0.85, device.height * 0.06); //右上角确定按钮，根据自己手机实际修改
    }

    checkAndUpdate(question, ansTiku, answer);
    console.log("------------");
    delay(2);
}

function click_answer(answer) {
    var f = true;
    if (className("ListView").exists()) {
        if (textStartsWith("多选题").exists()) {
            var listArray = className("ListView").findOnce().children();
            listArray.forEach(item => {
                var listIndexStr = item.child(0).child(2).text();
                var num = 0;
                for (var i = 0; i < listIndexStr.length; i++) {
                    if (answer.indexOf(listIndexStr[i]) != -1) {
                        num++;
                    }
                }
                if (num / listIndexStr.length > 1 / 2) {
                    item.child(0).click();
                    f = false;
                }
            });
        } else {
            var listArray = className("ListView").findOnce().children();
            listArray.forEach(item => {
                var listIndexStr = item.child(0).child(2).text();
                if (answer.indexOf(listIndexStr) != -1) {
                    item.child(0).click();
                    f = false;
                    return;
                }
            });
            if (f) {
                var a = 0;
                var num = 0;
                var ch = 0;
                listArray.forEach(item => {
                    var maxx = 0;
                    var listIndexStr = item.child(0).child(2).text();
                    for (var i = 0; i < listIndexStr.length; i++) {
                        if (answer.indexOf(listIndexStr[i]) != -1) {
                            maxx++;
                        }
                    }
                    if (maxx > num) {
                        num = maxx;
                        ch = a;
                    }
                    a++;
                });
                className("ListView").findOnce().child(ch).child(0).click();
                f = false;
            }

        }
        if (f) {
            if (textContains('A').exists()) {
                textContains('A').click();
            }
            console.error('没有找到,选A跳过');
        }
    }
}
/**
 * @description: 每日答题
 * @param: null
 * @return: null
 */
function dailyAnswer() {
    console.info("开始答题");
    console.setPosition(0, 0);
    delay(1);
    let dlNum = 0; //每日答题轮数
    var flag = true;
    if (textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists()) {
        flag = false;
    }
    if (flag) {
        var s = 1;
        while (!text("排行榜").exists()) {
            console.log("等待我要答题界面");
            delay(1)
            if ((textStartsWith("填空题").exists() || textStartsWith("多选题").exists() || textStartsWith("单选题").exists())) {
                s = 0;
                break;
            }
        }
        if (s == 1) {
            var textOrder = text("排行榜").findOnce().parent();
            while (!className(textOrder.child(2).className()).exists()) {
                toastLog("等待界面出现");
            }
            textOrder.child(2).click();
        }
    }
    delay(0.5);
    while (true) {
        delay(2);
        dailyQuestionLoop();
        if (text("再练一次").exists()) {
            console.log("每周答题结束！")
            text("返回").click();
            delay(2);
            back();
            break;
        } else if (text("查看解析").exists()) {
            console.log("专项答题结束！")
            back();
            delay(0.5);
            back();
            delay(0.5);
            break;
        } else if (text("再来一组").exists()) {
            delay(2);
            dlNum++;
            if (!text("领取奖励已达今日上限").exists()) {
                text("再来一组").click();
                console.warn("第" + (dlNum + 1).toString() + "轮答题:");
                delay(1);
            } else {
                console.log("每日答题结束！")
                text("返回").click();
                delay(2);
                break;
            }
        }
    }
    console.setPosition(0, device.height / 2);
}

////////////////////////////挑战答题模块功能////////////////////////
/**
 * @description: 从数据库中搜索答案
 * @param: question 问题
 * @return: answer 答案
 */
function getAnswer(question) {
    var question1 = question.split('来源：')[0]; //去除来源
    question1 = question1.replace(/ /g, ''); //再删除多余空格
    question1 = question1.replace(/  /g, '');
    try {
        var option = '';
        var similars = 0;
        var pos = -1;
        for (var i = 0; i < question_list.length; i++) {
            var s = similarity(question_list[i][0], '', question1, 0);
            if (s > similars) {
                similars = s;
                pos = i;
            }
        }
        option = question_list[pos][1];
        var ans = question_list[pos][2].split('	')[option[0].charCodeAt(0) - 65];
        if (!ans) return 'A';
        return ans;
        // return option;
    } catch (e) {
        return "A";
    }

}


function indexFromChar(str) {
    return str.charCodeAt(0) - "A".charCodeAt(0);
}

/**
 * @description: 每次答题循环
 * @param: conNum 连续答对的次数
 * @return: null
 */
function challengeQuestionLoop(conNum) {
    let ClickAnswer; //定义已点击答案
    if (conNum >= qCount) //答题次数足够退出，每轮qCount=5+随机1-3次
    {
        let listArray = className("ListView").findOnce().children(); //题目选项列表
        let i = random(0, listArray.length - 1);
        console.log("本轮答题数足够，随机点击答案");
        var question = className("ListView").findOnce().parent().child(0).text();
        question = question.replace(/\s/g, "");
        var options = []; //选项列表
        if (className("ListView").exists()) {
            className("ListView").findOne().children().forEach(child => {
                var answer_q = child.child(0).child(1).text();
                options.push(answer_q);
            });
        } else {
            console.error("答案获取失败!");
            return;
        } //20201217添加 极低概率下，答题数足够，下一题随机点击，碰到字形题
        if (question == "选择正确的读音" || question == "选择词语的正确词形" || question == "下列词形正确的是") {
            // 选择第一个
            console.log((conNum + 1).toString() + ".直接选第一个!!!");
            className('android.widget.RadioButton').depth(28).findOne().click();
            return;
        }
        console.log((conNum + 1).toString() + ".随机点击题目：" + question);
        delay(random(0.5, 1)); //随机延时0.5-1秒
        listArray[i].child(0).click(); //随意点击一个答案
        ClickAnswer = listArray[i].child(0).child(1).text();; //记录已点击答案
        console.log("随机点击:" + ClickAnswer);
        //如果随机点击答案正确，则更新到本地题库tiku表
        delay(0.5); //等待0.5秒，是否出现X
        console.log("---------------------------");
        return;
    }
    if (className("ListView").exists()) {
        var question = className("ListView").findOnce().parent().child(0).text();
    } else {
        console.error("提取题目失败!");
        let listArray = className("ListView").findOnce().children(); //题目选项列表
        let i = random(0, listArray.length - 1);
        console.log("随机点击");
        delay(random(0.5, 1)); //随机延时0.5-1秒
        listArray[i].child(0).click(); //随意点击一个答案
        return;
    }
    var chutiIndex = question.lastIndexOf("出题单位");
    if (chutiIndex != -1) {
        question = question.substring(0, chutiIndex - 2);
    }
    //question = question.replace(/\s/g, "");
    var options = []; //选项列表
    if (className("ListView").exists()) {
        className("ListView").findOne().children().forEach(child => {
            var answer_q = child.child(0).child(1).text();
            options.push(answer_q);
        });
    } else {
        console.error("答案获取失败!");
        return;
    }
    var reg = /.*择词语的正确.*/g;
    var rea = /.*择正确的读音.*/g;
    var reb = /.*不属于二十四史的是.*/g;
    if (reg.test(question) || rea.test(question) || reb.test(question)) { // 选择第一个
        console.log((conNum + 1).toString() + ".直接选第一个!!!");
        className('android.widget.RadioButton').depth(28).findOne().click();
        return;
    }
    console.log((conNum + 1).toString() + ".题目：" + question);
    var answer = getAnswer(question);
    console.info("答案：" + answer);
    if (/^[a-zA-Z]{1}$/.test(answer)) { //如果为ABCD形式
        var indexAnsTiku = indexFromChar(answer.toUpperCase());
        answer = options[indexAnsTiku];
        toastLog(answer);
    }
    let hasClicked = false;
    let listArray = className("ListView").findOnce().children(); //题目选项列表
    if (answer == "") //如果没找到答案
    {
        let i = random(0, listArray.length - 1);
        console.error("没有找到答案，随机点击");
        delay(random(0.5, 1)); //随机延时0.5-1秒
        listArray[i].child(0).click(); //随意点击一个答案
        ClickAnswer = listArray[i].child(0).child(1).text();; //记录已点击答案
        hasClicked = true;
        console.log("随机点击:" + ClickAnswer); //如果随机点击答案正确，则更新到本地题库tiku表
        delay(0.5); //等待0.5秒，是否出现X
        console.log("---------------------------");
    } else //如果找到了答案
    {
        listArray.forEach(item => {
            var listDescStr = item.child(0).child(1).text();
            if (listDescStr == answer) {
                delay(random(0.5, 1)); //随机延时0.5-1秒
                try {
                    item.child(0).click(); //点击答案
                    hasClicked = true;
                } catch (e) {}
                delay(0.5); //等待0.5秒，是否出现X
                if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                        "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
                {
                    // console.log("题库答案正确……");
                }
                if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                        "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
                {
                    console.error("答案错误!!!");
                    /*checkAndUpdate(question, answer, ClickAnswer);*/
                }
                console.log("---------------------------");
            }
        });
    }
    if (!hasClicked) //如果没有点击成功
    { //因导致不能成功点击问题较多，故该部分不更新题库，大部分问题是题库题目适配为填空题或多选题或错误选项
        console.error("未能成功点击，随机点击");
        let i = random(0, listArray.length - 1);
        delay(random(0.5, 1)); //随机延时0.5-1秒
        listArray[i].child(0).click(); //随意点击一个答案
        console.log("随机点击:" + ClickAnswer);
        delay(0.5); //等待0.5秒，是否出现X
        if (!text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
        {
            console.log("随机点击正确……");
        }
        if (text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists() || text("再来一局").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
        {
            console.error("随机点击错误!!!");
            /*checkAndUpdate(question, answer, ClickAnswer);*/
        }
        console.log("---------------------------");
    }
}


/**
 * @description: 挑战答题
 * @param: null
 * @return: null
 */
function challengeQuestion() {
    // init();
    if (!className("RadioButton").exists()) {
        while (!text("排行榜").exists()) {
            console.info("等待我要答题界面");
            delay(1);
        }
        var textOrder = text("排行榜").findOnce().parent();
        while (text("排行榜").exists()) {
            console.info("点击挑战答题");
            textOrder.child(10).click();
            delay(2);
        }
    }
    let conNum = 0; //连续答对的次数
    let lNum = 0; //轮数
    var 复活 = true;
    while (true) {
        delay(2);
        if (!className("RadioButton").exists()) {
            if (复活 == false) {
                console.log("出现错误，等5秒开始下一轮...")
                delay(3); //等待3秒才能开始下一轮
                text("再来一局").click();
                delay(4);
                conNum = 0;
                复活 = true;
            } else {
                // toastLog("没有找到题目！请检查是否进入答题界面！");
                console.error("没有找到题目！请检查是否进入答题界面！");
                console.log("停止");
                break;
            }
        }
        challengeQuestionLoop(conNum);
        delay(1);
        if (text('wrong@3x.9ccb997c').exists() || text('2kNFBadJuqbAAAAAElFTkSuQmCC').exists() || text("v5IOXn6lQWYTJeqX2eHuNcrPesmSud2JdogYyGnRNxujMT8RS7y43zxY4coWepspQkvw" +
                "RDTJtCTsZ5JW+8sGvTRDzFnDeO+BcOEpP0Rte6f+HwcGxeN2dglWfgH8P0C7HkCMJOAAAAAElFTkSuQmCC").exists()) //遇到❌号，则答错了,不再通过结束本局字样判断
        {
            if (conNum >= qCount) {
                lNum++;
                qCount = randomNum(3, 6);
            }
            if (lNum >= lCount) {
                console.log("挑战答题结束！返回我要答题界面！");
                if (复活) {
                    textContains('每局仅可复活一次').waitFor();
                    delay(1);
                    back();
                }
                textContains("再来一局").waitFor();
                delay(1);
                back();
                delay(2);
                break;
            } else {
                if (复活 && conNum < qCount) {
                    复活 = false;
                    textContains('分享就能复活').findOne().click();
                    delay(0.5);
                    back();
                    delay(1);
                } else {
                    if (复活) {
                        textContains('每局仅可复活一次').waitFor();
                        delay(1);
                        back();
                    }
                    console.log("等5秒开始下一轮...")
                    delay(3); //等待3秒才能开始下一轮
                    text("再来一局").click();
                    delay(4);
                    conNum = 0;
                    复活 = true;
                }
            }
        } else //答对了
        {
            conNum++;
        }
    }
    delay(1);
    if (desc("我的信息").exists()) {
        text("我要答题").findOne().parent().click();
        delay(2);
    }
}
//挑战答题

// var xn = 0;
var 音字 = false;

function do_contest_answer(depth_option, question1) {
    // console.time('搜题');
    question1 = question1.replace(/'/g, "");
    question1 = question1.replace(/"/g, "");
    old_question = JSON.parse(JSON.stringify(question1));
    question1 = question1.split('来源:')[0]; //去除来源
    question1 = question1.split('来源：')[0]; //去除来源
    question = question1.split('A.')[0];
    // question = question.split('（.*）')[0];
    reg = /下列..正确的是.*/g;
    reb = /选择词语的正确.*/g;
    rea = /选择正确的读音.*/g;
    rec = /下列不属于二十四史的是.*/g;
    rex = /劳动行政部门自收到集体合同文本之日起.*/g;
    var option = 'N';
    var answer = 'N';
    var similars = 0;
    var pos = -1;
    var answers_list = '';
    if (rex.test(question) || rec.test(question) || reg.test(question) || rea.test(question) || reb.test(question)) {
        音字 = true;
        first = false;
        try {
            old_question = old_question.replace(/4\./g, 'A.');
            var old_answers = old_question.split('A.')[1].split('C')[0];
            for (var k = 0; k < 2; k++) {
                answers = old_answers.split('B.')[k];
                // answers = answers.match(/[\u4e00-\u9fa5]/g).join(""); //剩余汉字
                answers = answers.replace(/哆峻/g, "啰唆");
                answers = answers.replace(/罗峻/g, "罗唆");
                answers = answers.replace(/暖陀/g, "蹉跎");
                answers = answers.replace(/暖跑/g, "蹉跎");
                answers = answers.replace(/跨踏/g, "踌躇");
                answers = answers.replace(/chuo/g, "chuò");
                answers = answers.replace(/cuotuo/g, "cuōtuó");
                answers = answers.replace(/duo/g, "duō");
                answers = answers.replace(/蹈/g, "踌躇");
                answers = answers.replace(/调帐/g, "惆怅");
                answers = answers.replace(/任悔/g, "忏悔");
                answers = answers.replace(/仟悔/g, "忏悔");
                answers = answers.replace(/忧心../g, "忧心忡忡");
                answers = answers.replace(/美轮美./g, "美轮美奂");
                answers = answers.replace(/决穿/g, "诀窍");
                answers = answers.replace(/浙临/g, "濒临");
                answers = answers.replace(/不落../g, "不落窠臼");
                answers = answers.replace(/.目结舌/g, "膛目结舌");
                answers = answers.replace(/泉水../g, "泉水淙淙");
                answers = answers.replace(/饮.止渴/g, "饮鸠止渴");
                answers = answers.replace(/趋之若./g, "趋之若鹜");
                answers = answers.replace(/一.而就/g, "一蹴而就");
                answers = answers.replace(/刚.自用/g, "刚愎自用");
                answers = answers.replace(/风驰电./g, "风驰电掣");
                answers = answers.replace(/不.而走/g, "不胫而走");
                answers = answers.replace(/.声叹气/g, "唉声叹气");
                answers = answers.replace(/.而走险/g, "铤而走险");
                answers = answers.replace(/底护/g, "庇护");
                answers = answers.replace(/蓓./g, "蓓蕾");
                answers = answers.replace(/抵悟/g, "抵牾");
                answers = answers.replace(/情懒/g, "慵懒");
                answers = answers.replace(/差道/g, "差遣");
                answers = answers.replace(/泽炼/g, "淬炼");
                answers = answers.replace(/博奔/g, "博弈");
                answers = answers.replace(/相形见./g, "相形见绌");
                answers = answers.replace(/对.公堂/g, "对簿公堂");
                answers = answers.replace(/疼李/g, "痉挛");
                answers = answers.replace(/痉李/g, "痉挛");
                answers = answers.replace(/..人口/g, "脍炙人口");
                answers = answers.replace(/.意安为/g, "恣意妄为");
                answers = answers.replace(/凌合/g, "凑合");
                answers = answers.replace(/神抵/g, "神祗");
                answers = answers.replace(/叫苦不./g, "叫苦不迭");
                answers = answers.replace(/草.人命/g, "草菅人命");
                answers = answers.replace(/鞭./g, "鞭笞");
                answers = answers.replace(/发物/g, "发轫");
                answers = answers.replace(/..充数/g, "滥芋充数");
                answers = answers.replace(/水蒸气/g, "水蒸气 水蒸汽");
                answers = answers.replace(/..置疑/g, "毋庸置疑");
                answers = answers.replace(/..不振/g, "萎靡不振");
                answers = answers.replace(/瓜熟.落/g, "瓜熟蒂落");
                answers = answers.replace(/虎视../g, "虎视眈眈");
                answers = answers.replace(/进裂/g, "崩裂");
                // try{
                //     answers = r.replace(answers);
                // }catch(e){}
                answers_list += answers;
            }
        } catch (e) {
            while (!className('android.widget.RadioButton').depth(32).exists()) {
                if (text('继续挑战').exists()) return -1;
            }
            return -2;
        };
    }
    if (音字) question = answers_list;
    for (var i = 0; i < question_list.length; i++) { // 搜题
        // question answer q flag
        var s = similarity(question_list[i][0], question_list[i][2], question, 音字);
        if (s > similars) {
            similars = s;
            pos = i;
        }
        if (s == 999) break;
    }
    if (pos != -1) {
        option = question_list[pos][1];
        answer = question_list[pos][2];
    } else {
        console.error('没搜到答案,题目异常：\n“' + old_question + '”');
        console.info('此题pos = ' + pos + ',s=' + s);
    }
    if (option[0] >= 'A' && option[0] <= 'D') {
        var ans = answer.split('	')[option[0].charCodeAt(0) - 65];
        console.info('答案:' + ans);
        var last = option;
        if (!first && !音字) {
            while (true) {
                if (className('android.widget.RadioButton').depth(32).exists()) {
                    break;
                }
                if (text('继续挑战').exists()) return -1;
            }
            try {
                var img = captureScreen();
                var b = className('ListView').depth(29).findOne(3000).bounds();
                img = images.clip(img, b.left, b.top, b.right - b.left, b.bottom - b.top);
                if (choose == 0) {
                    old_question = paddle_ocr_api(img);
                } else old_question = baidu_ocr_api(img, token);
                // images.save(img, "/sdcard/选项"+xn+".png", "png", 50);
                // xn++;
                log(old_question);
            } catch (e) {
                console.error(e);
                console.info('选项获取失败');
            }
        }
        try {
            option = click_by_answer(ans, old_question);
            if (!option) option = last;
        } catch (e) {
            console.error("此题选项异常！！！")
        }
        console.info('点击选项:' + option + '  原选项：' + last);
        if (text('继续挑战').exists()) return -1;
        while (!className("ListView").exists()) {
            // className('android.widget.RadioButton').findOnce(answer[0].charCodeAt(0) - 65).click();
            if (text('继续挑战').exists()) return -1;
        }
        if (text('继续挑战').exists()) return -1;
        first = false;
        try {
            while (!className("ListView").findOne(5000).child(option[0].charCodeAt(0) - 65).child(0).click()) {
                if (text('继续挑战').exists()) return -1;
            }
        } catch (e) {
            while (!className('android.widget.RadioButton').depth(depth_option).exists()) {
                if (text('继续挑战').exists()) return -1;
            }
            try {
                className('android.widget.RadioButton').depth(depth_option).findOnce(option[0].charCodeAt(0) - 65).click();
            } catch (e) {
                console.error('没找到选项,选A跳过');
                className('android.widget.RadioButton').depth(depth_option).findOnce(0).click();
            }
        }
        return 0;
    }
    try {
        className('android.widget.RadioButton').depth(depth_option).findOnce(0).click();
    } catch (e) {
        while (!className("ListView").findOne(5000).child(0).child(0).click()) {
            if (text('继续挑战').exists()) return -1;
        }
    }
    return 0;
}
var o = ['A.', 'B.', 'C.', 'D.', 'AAAA'];
var o1 = ['A', 'B', 'C', 'D', 'AAAA'];

function click_by_answer(ans, question) {
    ans = ans.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join("")
    question = question.replace(/ /g, '');
    question = question.replace(/4\./g, 'A.');
    question = question.replace(/:/g, '：');
    try {
        question = r.replace(question);
    } catch (e) {}
    // question = question.split('A.');
    question = question.replace(/c\./g, "C.");
    question = question.replace(/，/g, ".");

    var sum = 0;
    for (var i = 0; i < question.length; i++) {
        if (question[i] >= 'A' && question[i] <= 'D') {
            sum++;
        }
    }
    var op = [];
    if (sum <= 4) {
        question = question.replace(/\./g, "");
        for (var i = 0; i < 4; i++) {
            try {
                var tmp = question.split(o1[i])[1].split(o1[i + 1])[0].split('推荐：')[0].split('出题')[0];
                op.push(tmp.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join(""));
            } catch (e) {
                op.push('&');
            }
        }
    } else {
        for (var i = 0; i < 4; i++) {
            try {
                var tmp = question.split(o[i])[1].split(o[i + 1])[0].split('推荐：')[0].split('出题')[0];
                op.push(tmp.match(/[\u4e00-\u9fa5a-zA-Z0-9āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜü]/g).join(""));
            } catch (e) {
                op.push('&');
            }
        }
    }
    // op[op.length-1] = op[op.length-1].split('推荐')[0].split('出题')[0];
    var s = 0;
    var pos = -1;
    for (var i = 0; i < op.length; i++) {
        if (op[i] == '&') continue;
        if (op[i] == ans) {
            return o1[i];
        }
        var tmp = similarity_answer(op[i], ans);
        if (tmp > s) {
            s = tmp;
            pos = i;
        }
    }
    return o1[pos];
}

function similarity_answer(op, ans) {
    var num = 0;
    for (var i = 0; i < ans.length; i++) {
        if (op.indexOf(ans[i]) != -1) num++;
    }
    for (var i = 0; i < ans.length - 1; i++) {
        if (op.indexOf(ans[i] + ans[i + 1]) != -1) num++;
    }
    for (var i = 0; i < ans.length - 2; i++) {
        if (op.indexOf(ans[i] + ans[i + 1] + ans[i + 2]) != -1) num++;
    }
    return num / (2 * op.length + 2 * ans.length);
}

function similarity(question, answer, q, flag) {
    var num = 0;
    if (flag) {
        if (q.indexOf('十五日') != -1 && question.indexOf('劳动行政部门自收到集体合同文本之日起') != -1 && answer.split('\t')[0].indexOf('十日') != -1) {
            return 999;
        }
        if (q.indexOf('十五日') == -1 && q.indexOf('十日') != -1 && question.indexOf('劳动行政部门自收到集体合同文本之日起') != -1 && answer.split('\t')[0].indexOf('五日') != -1) {
            return 999;
        }
        if (question.indexOf('正确') == -1 && question.indexOf('下列不属于二十四史的') == -1) {
            return 0;
        }
        for (var i = 0; i < q.length; i++) {
            if (answer.indexOf(q[i]) != -1) {
                num++;
            }
        }
        return num / (answer.length + q.length);
    } else {
        var tmp = 1;
        if (q.length > 20) tmp = 2;
        if (q.length > 40) tmp = 3;
        if (q.length > 50) tmp = 4;
        for (var i = 0; i < q.length - tmp; i += tmp) {
            if (question.indexOf(q[i] + q[i + 1]) != -1) {
                num++;
            }
        }
        return num / (question.length + q.length);
    }
}
/**
 * 点击对应的去答题或去看看
 * @param {image} img 传入图片
 */
function baidu_ocr_api(img, tokens) {
    console.log('百度ocr文字识别中');
    var answer = "";
    var res = http.post(
        'https://aip.baidubce.com/rest/2.0/ocr/v1/general', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            access_token: tokens,
            image: images.toBase64(img),
        }
    );

    var res = res.body.json();
    try {
        var words_list = res.words_result;
    } catch (error) {
        console.error('百度ocr文字识别请求错误，可能有以下情况\n1.百度ocr欠费\n2.其他的错误');
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    }
    for (var i in words_list) {
        answer += words_list[i].words;
    }
    return answer.replace(/\s*/g, "");
}

function paddle_ocr_api() {
    console.log('PaddleOCR文字识别中');
    let list = JSON.parse(JSON.stringify(paddle.ocr(arguments[0]))); // 识别文字，并得到results
    let eps = 30; // 坐标误差
    if (arguments.length >= 2) eps = arguments[1];
    for (
        var i = 0; i < list.length; i++ // 选择排序对上下排序,复杂度O(N²)但一般list的长度较短只需几十次运算
    ) {
        for (var j = i + 1; j < list.length; j++) {
            if (list[i]['bounds']['bottom'] > list[j]['bounds']['bottom']) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }

    for (
        var i = 0; i < list.length; i++ // 在上下排序完成后，进行左右排序
    ) {
        for (var j = i + 1; j < list.length; j++) {
            // 由于上下坐标并不绝对，采用误差eps
            if (
                Math.abs(list[i]['bounds']['bottom'] - list[j]['bounds']['bottom']) <
                eps &&
                list[i]['bounds']['left'] > list[j]['bounds']['left']
            ) {
                var tmp = list[i];
                list[i] = list[j];
                list[j] = tmp;
            }
        }
    }
    let res = '';
    for (var i = 0; i < list.length; i++) {
        res += list[i]['words'];
    }
    list = null;
    return res;
}

var download = null;
/**
 * @description: 加载题库和加载替换
 * @param: null
 * @return: null
 */
function init() {
    if (init_true) return;

    threads.start(function () {
        try {
            var x = http.get('https://ghproxy.com/https://raw.githubusercontent.com/sec-an/Better-Auto-XXQG/main/Study/replace.js').body.string();
            files.write('/sdcard/replace.js', x);
            r = require('/sdcard/replace.js');
        } catch (e) {}
        x = null;
    });

    console.info('正在加载题库中.....');
    downloadDialog = dialogs.build({
        title: "正在加载题库...",
        progress: {
            max: 100,
            showMinMax: true
        },
        autoDismiss: false,
        cancelable: true
    }).show();
    try {
        startDownload();
        // delay(2);
        download.join(1000 * 60);
        if (!file_tmp) {
            download.interrupt();
            console.error('题库加载超时！，再次加载一次');
            startDownload();
        }
        while (!file_tmp) {
            toastLog('等待加载题库!!!');
            delay(2);
        }
        file_tmp = null;
        tikus = decrypt(decrypt(tikus));
        tikus = tikus.split('\n');
        for (var i = 0; i < tikus.length; i++) {
            var t = tikus[i].split(' ');
            if (t[1] && t[0]) {
                var answer = '';
                for (var j = 2; j < t.length; j++) { // 可能tiku答案有空格，但是被切割了
                    answer += t[j];
                }
                question_list.push([t[1], t[0], answer]);
            }
        }
        answer = null;
        tikus = null;
        init_true = true;
        if (question_list.length < 1000) {
            console.info('题库崩了！！！，等！！！');
            if (noverify_thread.isAlive()) {
                noverify_thread.interrupt();
            }
            exit();
        }
    } catch (e) {
        console.error('题库获取失败，检查网络连接！！！');
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    }
}

function startDownload() {
    download = threads.start(function () {
        toastLog('等待加载题库!!!');
        try {
            var conn = new URL(init_url).openConnection();
            conn.connect();
            let is = conn.getInputStream();
            let count = 0;
            length = 973328;
            let buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
            while (true) {
                var p = Math.abs(Math.min(((count / length) * 100), 100));
                let numread = is.read(buffer);
                count += numread;
                if (numread < 0) {
                    toast("加载完成");
                    console.info("加载完成");
                    downloadDialog.dismiss();
                    downloadDialog = null;
                    break;
                }
                downloadDialog.setProgress(p);
                tikus += java.lang.String(buffer, "UTF-8").slice(0, numread);
            }
            is.close();
            file_tmp = true;
        } catch (e) {
            console.error(e);
            console.warn('题库加载失败');
            question_list = null;
            is.close();
            tikus = null;
            if (noverify_thread.isAlive()) {
                noverify_thread.interrupt();
            }
            exit();
        }
    })
}
/**
 * @description: 四人赛
 * @param: null
 * @return: null
 */
var xxx = 1;

function zsyAnswer() {
    var img = captureScreen();
    try {
        var point = findColor(img, '#1B1F25', {
            region: [0, 0, 100, 100],
            threshold: 10,
        });
    } catch (e) {
        console.error(e);
        console.info('你可能使用了模拟器...');
        if (noverify_thread.isAlive()) {
            noverify_thread.interrupt();
        }
        exit();
    }
    // init();
    if (choose == 0) {
        paddle_ocr_api(img);
    } else baidu_ocr_api(img, token);
    var count = 2;
    console.info('改变提示框位置');
    console.setPosition(device.width / 4, -device.height / 4);
    for (var i = 0; i < count; i++) {
        sleep(random_time(delay_time));
        if (text("随机匹配").exists()) {
            text("随机匹配").findOne(3000).parent().child(0).click();
            console.log("点击随机匹配");
            count = 1;
        } else {
            console.log("点击开始比赛");
            // my_click_clickable('开始比赛');
            var s = text("开始比赛").findOne(5000);
            if (s) {
                s.click();
            } else {
                console.log('没有找到开始比赛，点击随机匹配');
                text("随机匹配").findOne(3000).parent().child(0).click();
                count = 1;
            }
        }
        first = true;
        音字 = false;
        delay(1);
        if (text('知道了').exists()) {
            console.warn('答题已满');
            text('知道了').findOnce().click();
            delay(2);
            if (text("随机匹配").exists() || text("开始比赛").exists()) {
                break;
            } else return 0;
        }
        className("ListView").waitFor();
        var range = className("ListView").findOnce().parent().bounds();
        var x = range.left + 20,
            dx = range.right - x - 20;
        var y = range.top,
            dy = device.height - 300 - y;
        console.log('坐标获取完成');

        while (!text('继续挑战').exists()) {

            do {
                img = captureScreen();
                var point = findColor(img, '#1B1F25', {
                    region: [x, y, dx, dy],
                    threshold: 10,
                });
                // console.log("等待题目显示");
            } while (!point);
            console.time('答题');
            try {
                range = className("ListView").findOnce().parent().bounds();
                if (!first && !音字)
                    img = images.clip(img, x, y, dx, (range.bottom - y) / 3);
                else
                    img = images.clip(img, x, y, dx, range.bottom - y);
            } catch (e) {
                img = images.clip(img, x, y, dx, dy);
            }
            // images.save(img, "/sdcard/题目"+xxx+".jpg", "jpg", 50);
            // xxx++;
            var question;
            if (choose == 0) {
                if (!first && !音字) // 第一题不变色的原因的：
                    img = images.inRange(img, '#000000', '#444444');
                question = paddle_ocr_api(img);
            } else {
                if (!first && !音字)
                    img = images.inRange(img, '#000000', '#444444');
                question = baidu_ocr_api(img, token);
            }
            question = question.slice(question.indexOf('.') + 1);
            question = question.replace(/,/g, "，");
            log(question);
            if (question) {
                var c = do_contest_answer(32, question);
                if (c == -1) {
                    break;
                } else if (c == -2) {
                    className('android.widget.RadioButton').waitFor();
                    continue;
                }
            } else {
                images.save(img, "/sdcard/截图.jpg", "jpg", 50);
                console.error("没有识别出任何内容，为了查错已经将截图保存在根目录./截图.jpg，如果截图正常并使用的是本地ocr，那么当前你的手机可能并不适配该ocr，百度/华为ocr则检查扣费次数情况");
                console.log('截图坐标为(' + x + ',' + y + '),(' + dx + ',' + dy + ')');
                break;
            }
            console.timeEnd('答题');
            img.recycle();
            do {
                var point = findColor(captureScreen(), '#555AB6', {
                    region: [x, y, dx, dy],
                    threshold: 10,
                });
            } while (!point);
            console.log('等待下一题\n----------');
            音字 = false;
        }
        if (i == 0 && count == 2) {
            sleep(random_time(delay_time));
            console.log('第二轮答题开始');
            while (!click('继续挑战'));
            sleep(random_time(delay_time));
        }
    }
    if (STUDY_CONFIG.get("another", "1"))
        var x = STUDY_CONFIG.get("another", "1") * 1;
    else
        var x = 0;
    while (x > 0) {
        console.info('额外的 ' + x + ' 轮即将开始!');
        x--;
        delay(2);
        click('继续挑战');
        delay(3);
        if (text("随机匹配").exists()) {
            text("随机匹配").findOne().parent().child(0).click();
            console.log("点击随机匹配");
        } else {
            console.log("点击开始比赛");
            // my_click_clickable('开始比赛');
            var s = text("开始比赛").findOne(5000);
            if (s) {
                s.click();
            } else {
                console.log('没有找到开始比赛，点击随机匹配');
                text("随机匹配").findOne(3000).parent().child(0).click();
            }
        }
        delay(1);
        if (text('知道了').exists()) {
            console.warn('答题已满');
            text('知道了').findOnce().click();
            delay(1);
            return 0;
        }
        while (true) {
            if (text('继续挑战').exists()) break;
            while (!className('android.widget.RadioButton').depth(32).exists()) {
                delay(randomNum(3, 5));
                if (text('继续挑战').exists()) break;
            }
            delay(2);
            console.warn('随机点击');
            try {
                var t = className("ListView").findOne(5000).childCount();
                t = randomNum(0, t - 1);
                className('android.widget.RadioButton').depth(32).findOnce(t).click();
            } catch (e) {}
            if (text('继续挑战').exists()) break;
            sleep(200);
        }
        // console.warn('额外一轮结束!');
    }
    console.info('答题结束');
    delay(2);
    back();
    delay(2);
    back();
    if (count == 1) {
        delay(2);
        if (text('退出').exists()) {
            textContains('退出').click();
            delay(1);
        } else {
            console.warn('没有找到退出，按坐标点击(可能失败)\n如果没返回，手动退出双人赛即可继续运行');
            // console.setPosition(device.width * 0.2, device.height * 0.5);
            click(device.width * 0.2, device.height * 0.6);
        }
        sleep(random_time(delay_time));
    }
}


//运行主函数
// if (随机) {

// } else {
//     main();
// }

var ta = STUDY_CONFIG.get("alltime", "2000") * 1;
if (!ta || ta <= 0) ta = 1500;
var thread = null;

function rt() {
    var num = 0;
    while (true) {
        num++;
        console.log('设置脚本运行最长时间为：' + ta + 's');
        device.keepScreenOn(ta * 1000 + 60000);
        thread = threads.start(function () {
            rand_mode();
        })
        thread.join(ta * 1000);
        thread.interrupt();
        console.error('脚本超时或者出错！！！，重启脚本');
        if (!(launchApp(decodeURI("%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD")) || launch('cn.xuexi.android'))) {}
        console.info('等待10s后继续开始');
        toast('等待10s后继续开始');
        delay(10);
        back_table();
        toast(' ');
        delay(1);
        if (num > 3) break;
    }
    console.error('已经重新运行了3轮，停止脚本');
    question_list = null;
    console.error('无障碍服务可能出了问题');
    if (noverify_thread.isAlive()) {
        noverify_thread.interrupt();
    }
    exit();
}
rt();

function push_score() {
    console.warn('正在获取今日积分');
    var score = getScores(3);
    score += '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
    try {
        url = 'https://pushplus.hxtrip.com/send?token=' + STUDY_CONFIG.get("Token", "").replace(/ /g, '') + '&title=Study&content=' + score + '&template=html';
        http.get(url);
    } catch (e) {}
    try {
        url = 'http://www.pushplus.plus/send?token=' + STUDY_CONFIG.get("Token", "").replace(/ /g, '') + '&title=Study&content=' + score + '&template=html';
        http.get(url);
    } catch (e) {}
}

function re_store() {
    try {
        if (STUDY_CONFIG.get("xianzhi", false)) {
            console.warn('四人双人答题无限制开启');
            zsyCount = 1;
            doubleCount = 1;
        }
    } catch (e) {};
}

function back_table() {
    delay(1);
    var num = 0;
    while (!desc("工作").exists()) { //等待加载出主页
        console.info("当前没有在主页，正在返回主页");
        back();
        delay(1);
        num++;
        if (className('Button').textContains('退出').exists()) {
            var c = className('Button').textContains('退出').findOne(3000);
            if (c) c.click();
            delay(1);
        }
        if (num > 10) {
            console.error('返回超过10次，可能当前不在xxqg，正在启动app...');
            if (!(launchApp(decodeURI("%E5%AD%A6%E4%B9%A0%E5%BC%BA%E5%9B%BD")) || launch('cn.xuexi.android'))) {}
            console.info('等待10s继续进行');
            delay(10);
            num = 0;
        }
    }
    // console.info('当前在主页，回到桌面！');
    // home();  //回到桌面
}

function rand_mode() {
    start_app(); //启动app
    // 四人();    
    var start = new Date().getTime(); //程序开始时间
    // console.info('随机模式开始');
    getScores(0); //获取积分
    re_store();
    diandian();
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];;
    var t;
    for (var i = 0; i < arr.length; i++) {
        var rand = parseInt(Math.random() * arr.length);
        t = arr[rand];
        arr[rand] = arr[i];
        arr[i] = t;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            专项();
        } else if (arr[i] == 1) {
            每周();
        } else if (arr[i] == 2) {
            视频学习();
        } else if (arr[i] == 3) {
            订();
        } else if (arr[i] == 4) {
            挑战();
        } else if (arr[i] == 5) {
            文章和广播();
        } else if (arr[i] == 6) {
            双人();
        } else if (arr[i] == 7) {
            每日();
        } else if (arr[i] == 8) {
            本地();
        } else if (arr[i] == 9) {
            四人();
        }
    }
    question_list = null;
    article_list = null;
    back_table();
    if (STUDY_CONFIG.get("Token", "") != null && STUDY_CONFIG.get("Token", "").length > 6) {
        delay(1);
        push_score();
    }
    end = new Date().getTime();
    console.log("运行结束,共耗时" + (parseInt(end - start)) / 1000 + "秒");
    console.log("3s后自动关闭悬浮窗，查看日志请到助手软件主页并返回一次即可查看");
    desc("工作").click();
    delay(3);
    console.hide();
    device.cancelKeepingAwake();
    if (noverify_thread.isAlive()) {
        noverify_thread.interrupt();
    }
    exit();
}

function 专项() {
    if (zhuanxiang_txt == true && zhuanxiang != 0) {
        console.info('开始专项答题');
        delay(1);
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        zhuanxiangAnswer();
        delay(0.5);
    }
}

function 每周() {
    if (meizhou_txt == true && meizhou != 0) {
        console.info('开始每周答题');
        delay(1);
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        meizhouAnswer();
        delay(0.5);
    }
}

function 双人() {
    if (doubleCount != 0 && shuangren == true) {
        console.info('开始双人答题');
        delay(2);
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        while (!text("排行榜").exists()) {
            console.info("等待我要答题界面");
            delay(1);
        }
        var textOrder = text("排行榜").findOnce().parent();
        while (text("排行榜").exists()) {
            console.info("点击双人答题，悬浮窗位置改变");
            textOrder.child(9).click();
            delay(1);
        }
        zsyAnswer();
        delay(1);
        console.setPosition(0, device.height / 2);
    }
}

function 四人() {
    if (zsyCount != 0 && siren == true) {
        // delay(2);
        console.info('开始四人答题');
        delay(2);
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        while (!text("排行榜").exists()) {
            console.info("等待我要答题界面");
            delay(1);
        }
        var textOrder = text("排行榜").findOnce().parent();
        while (text("排行榜").exists()) {
            console.info("点击四人赛答题，悬浮窗位置改变");
            textOrder.child(8).click();
            delay(1);
        }
        zsyAnswer();
        delay(0.5);
        console.setPosition(0, device.height / 2);
        //delay(1);
        // back();
    }
}

function 挑战() {
    // tzCount = 1;
    if ((tzCount != 0 || 点点通['挑战答题']) && tiaozhan == true) {
        news = false;
        console.info('开始挑战答题');
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        delay(1);
        challengeQuestion(); //挑战答题
        delay(0.5);
    }
}

function 每日() {
    // dayCount = 1;
    if (dayCount != 0 && meiri == true) {
        console.info('开始每日答题');
        if (!text("排行榜").exists()) {
            console.info("进入我要答题");
            questionShow(); // 进入我要答题
            delay(1);
        }
        delay(1);
        dailyAnswer(); // 每天答题
        delay(0.5);
    }
}

function 视频学习() {
    var x = 1;
    if (text("排行榜").exists()) {
        delay(0.5);
        back();
        delay(0.5);
        back();
        delay(0.5);
    }
    while (!desc("工作").exists()) { //等待加载出主页
        console.info("等待加载主页");
        if (text("排行榜").exists()) {
            delay(0.5);
            back();
            delay(0.5);
            back();
            delay(0.5);
        }
        delay(2);
    }
    while ((vCount != 0 || 点点通['有效视听']) && video != 3) {
        if (点点通['有效视听'])
            vCount = Math.max(点点通['有效视听'] * 6 - (6 - vCount), 点点通['有效视听'] * 6);
        console.error('当前第' + x + '次看视频');
        if (video == 2)
            videoStudy_news(x); //看视频
        else if (video == 1)
            video_news(x); //电视台
        else new_bailing_video(x); // 新百灵
        console.info("等待五秒，然后确认视频是否已满分。");
        delay(5);
        getScores(2);
        diandian();
        x++;
        if (x > 2) { //尝试三次
            console.info("尝试2次，跳过。");
            break;
        }
    }
}

function 本地() {
    if (myScores['本地频道'] != 1) {
        console.info('开始本地频道');
        if (text("排行榜").exists()) {
            delay(0.5);
            back();
            delay(0.5);
            back();
            delay(0.5);
        }
        while (!desc("工作").exists()) { //等待加载出主页
            console.info("等待加载主页");
            if (text("排行榜").exists()) {
                delay(0.5);
                back();
                delay(0.5);
                back();
                delay(0.5);
            }
            delay(2);
        }
        localChannel(); //本地频道
    }
}

function 订() {
    if (订阅 != 0 && asub != 0) {
        if (text("排行榜").exists()) {
            delay(0.5);
            back();
            delay(0.5);
            back();
            delay(0.5);
        }
        while (!desc("工作").exists()) { //等待加载出主页
            console.info("等待加载主页");
            if (text("排行榜").exists()) {
                delay(0.5);
                back();
                delay(0.5);
                back();
                delay(0.5);
            }
            delay(2);
        }
        sub(); //订阅
    }
}


function 文章和广播() {
    if (text("排行榜").exists()) {
        delay(0.5);
        back();
        delay(0.5);
        back();
        delay(0.5);
    }
    while (!desc("工作").exists()) { //等待加载出主页
        console.info("等待加载主页");
        if (text("排行榜").exists()) {
            delay(0.5);
            back();
            delay(0.5);
            back();
            delay(0.5);
        }
        delay(2);
    }
    if (rTime != 0 && articles == true) {
        listenToRadio(); //听电台广播
        h = device.height; //屏幕高
        w = device.width; //屏幕宽
        x = (w / 3) * 2;
        h1 = (h / 6) * 5;
        h2 = (h / 6);
        delay(1);
        swipe(x, h1, x, h2, 100);
    }
    var r_start = new Date().getTime(); //广播开始时间
    var x = 0;
    while ((aCount != 0 || 点点通['有效浏览']) && articles == true) {
        aTime = STUDY_CONFIG.get("time1", "61");
        articleStudy(x); //学习文章，包含点赞、分享和评论
        console.info("等待五秒，然后确认文章是否已满分。");
        delay(5);
        getScores(1);
        diandian();
        x++;
        if (x > 2) { //尝试三次
            console.info("尝试3次未满分，暂时跳过。");
            break;
        }
    }
    if (articles == true) {
        var end = new Date().getTime(); //广播结束时间
        var radio_time = (parseInt((end - r_start) / 1000)); //广播已经收听的时间
        radio_timing(parseInt((end - r_start) / 1000), rTime - radio_time); //广播剩余需收听时间
        if (rTime != 0) {
            stopRadio();
        }
    }

}

function diandian() {
    if (STUDY_CONFIG.get("diandian", false) == false) return;
    while (!desc("工作").exists()) { //等待加载出主页
        console.info("等待加载主页");
        delay(1);
    }
    text("我的").click();
    console.log('正在查看点点通分数');
    delay(1);
    text(decodeURI("%E5%BC%BA%E5%9B%BD%E5%9F%8E")).findOne().parent().click();
    delay(2);
    text("点点通明细").findOne().parent().click();
    delay(2);
    点点通['挑战答题'] = 0;
    点点通['有效视听'] = 0;
    点点通['有效浏览'] = 0;
    try {
        textContains('+').findOne(5000).parent().parent().children().forEach(item => {
            try {
                let name = item.child(2).text();
                let score = item.child(3).text().match(/[0-9][0-9]*/g);
                log(name + ' ' + score);
                点点通[name] *= 1;
                点点通[name] += 1;
            } catch (e) {}
        });
    } catch (e) {};
    点点通['挑战答题'] *= 3;
    点点通['有效视听'] *= 6;
    点点通['有效浏览'] *= 6;
    log(点点通);
    点点通['挑战答题'] = Math.max(0, 3 - Math.floor((点点通['挑战答题'] * 1) / 3));
    点点通['有效视听'] = Math.max(0, 2 - Math.floor((1 * 点点通['有效视听']) / 6));
    点点通['有效浏览'] = Math.max(0, 2 - Math.floor((1 * 点点通['有效浏览']) / 6));
    console.info('挑战答题:' + 点点通['挑战答题'] + '轮');
    console.info('视频学习:' + 点点通['有效视听'] + '轮');
    console.info('文章学习:' + 点点通['有效浏览'] + '轮');
    lCount = 点点通['挑战答题'];
    if (lCount == 3)
        lCount = 4;
    back_table();
}
  return res;
}

/*****************更新内容弹窗部分*****************/
var storage = storages.create('songgedodo');
// 脚本版本号
var last_version = "V10.9";
var engine_version = "V10.10";
var newest_version = "V10.11";
if (storage.get(engine_version, true)) {
  storage.remove(last_version);
//   以下为自定义弹窗代码
//   let checked = gengxin_show();
//   if (checked) {storage.put(engine_version, false);}
  let gengxin_rows = ["强国APP版本v2.33.0以上不支持订阅，可以在豌豆荚中下载历史版本",
                      "1.解决了部分文章卡住的问题",
                      "2.解决Pro版多账号最后登录时没有滑动验证",
                      "（点击取消不再提示）"];
  let is_show = confirm(engine_version + "版更新内容", gengxin_rows.join("\n"));
  if (!is_show) {storage.put(engine_version, false);}
}
var w = fInit();
// console.show();
fInfo("天天向上"+newest_version+"脚本初始化");
fInfo("版本号检测："+ app.versionCode);
// 初始化宽高
var [device_w, device_h] = init_wh();
// log("fina:", device_w, device_h);
// sleep(2000);
// 自动允许权限进程
threads.start(function() {
  //在新线程执行的代码
  //sleep(500);
  toastLog("开始自动获取截图权限");
  var btn = className("android.widget.Button").textMatches(/允许|立即开始|START NOW/).findOne(5000);
  if (btn) {
    sleep(1000);
    btn.click();
  }
  toastLog("结束获取截图权限");
});
fInfo("请求截图权限");
// 请求截图权限、似乎请求两次会失效
if (!requestScreenCapture(false)) { //false为竖屏方向
  fError('请求截图失败');
  exit();
}
// 防止设备息屏
fInfo("设置屏幕常亮");
device.keepScreenOn(3600 * 1000);
// 下载题库
fInfo("检测题库更新");
// var git_head = "https://gh.api.99988866.xyz/";
// const update_info = get_tiku_by_http(git_head+"https://raw.githubusercontent.com/songgedodo/tiku/main/info.json");
const update_info = get_tiku_by_http("https://mart-17684809426.coding.net/p/tiku/d/tiku/git/raw/master/info.json");
fInfo("正在加载对战题库......请稍等\n题库版本:"+update_info["tiku_version"]);
var tiku = [];
try {tiku = get_tiku_by_http(update_info["tiku_link"]);}
catch (e) {tiku = get_tiku_by_http(update_info["tiku_link2"]);}
// var tiku = get_tiku_by_gitee();
fInfo("正在加载专项题库......请稍等\n题库版本:"+update_info["dati_tiku_version"]);
var dati_tiku = [];
try {dati_tiku = update_dati_tiku()}
catch (e) {
  fError("网络原因未获取到在线题库，请尝试切换流量或者更换114DNS");
  dati_tiku = get_tiku_by_ct('https://webapi.ctfile.com/get_file_url.php?uid=35157972&fid=555754562&file_chk=94c3c662ba28f583d2128a1eb9d78af4&app=0&acheck=2&rd=0.14725283060014105');
}
// 设置资源保存路径
files.createWithDirs("/sdcard/天天向上/");
// fInfo("运行前重置学习APP");
// exit_app("学习强国");
// sleep(1500);
// 检测地理位置权限代码，出现就点掉
fInfo("开始位置权限弹窗检测");
var nolocate_thread = threads.start(function() {
  //在新线程执行的代码
  id("title_text").textContains("地理位置").waitFor();
  fInfo("检测到位置权限弹窗");
  sleep(1000);
  var btn = text("暂不开启").findOne();
  btn.click();
  fInfo("已关闭定位");
});
fInfo("跳转学习APP");
// launch('cn.xuexi.android');
app.launchApp('学习强国');
sleep(2000);
//console.hide();
// 命令行方式启动，似乎需要root
// var result_shell = shell("pm disable cn.xuexi.android");
// log(result_shell.code, result_shell.error);
/***************不要动****************
 * **********************************
// 创建一个安卓动作，打开软件，此功能可以跳过开屏页，还在实验中
// app.startActivity({
//   action: 'android.intent.action.VIEW',
//   data: 'dtxuexi://appclient/page/study_feeds',
//   packageName: 'cn.xuexi.android',
// });
 * **********************************
*************************************/
// 检测更新提示代码，出现就点掉
var noupdate_thread = threads.start(function() {
  //在新线程执行的代码
  className("android.widget.Button").text("立即升级").waitFor();
  fInfo("检测到升级弹窗");
  sleep(1000);
  var btn = className("android.widget.Button").text("取消").findOne();
  btn.click();
  fInfo("已取消升级");
});
fInfo("开始消息通知弹窗检测");
var nonotice_thread = threads.start(function() {
  //在新线程执行的代码
  className("android.widget.Button").text("去开启").waitFor();
  fInfo("检测到消息通知弹窗");
  sleep(1000);
  var btn = className("android.widget.Button").text("取消").findOne();
  btn.click();
  fInfo("已取消消息通知");
});
var noverify_thread = noverify();

function do_pinglun() {
  // 点击分享"去看看"回首页
  //jifen_list = className("android.widget.ListView").depth(21).findOne();
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["评论"]).child(3).click();
  fSet("title", "评论…");
  fClear();
  sleep(1000);
  swipe(device_w/2, device_h*0.7, device_w/2, device_h*0.4, 1000);
  let wen_box = id("general_card_title_id").findOne().parent().parent();
  fInfo("尝试点击title:"+ id("general_card_title_id").findOne().text());
  //log("文章click:", wen_box.click());
  real_click(id("general_card_title_id").findOne().parent().parent());
  log("等待加载");
  idContains("image-text-content").waitFor();
  let text_edit = text("欢迎发表你的观点");
  log("查找评论框");
  text_edit.waitFor();
  sleep(1500);
  //while (!text_edit.findOne(5000).click()) {log("评论框click: false");}
  while (text_edit.exists()) {
    let pinglun_edit = text_edit.findOne(500);
    fInfo("尝试点击评论框中");
    log(pinglun_edit.click());
    sleep(1500);
    fRefocus();
  }
  fInfo("评论框click: true");
  let content_list = ["全心全意为人民服务","不忘初心，牢记使命","不忘初心，方得始终","永远坚持党的领导","富强、民主、文明、和谐","自由，平等，公正，法治"];
  classNameEndsWith("EditText").findOne().setText(content_list[random(0, content_list.length-1)]);
  sleep(1000);
  text("发布").findOne().click();
  sleep(1000);
  text("删除").findOne().click();
  sleep(1000);
  text("确认").findOne().click();
  sleep(1000);
//   // 下面是分享
//   for (let i=0; i<2; i++) {
//     text_edit.findOne().parent().child(3).click();
//     sleep(500);
//     textContains("学习强国").findOne().parent().click();
//     sleep(500);
//     text("创建新的聊天").waitFor();
//     sleep(1000);
//     back();
//     sleep(1000);
//   }
  // 回到首页
  back();
  // 返回积分页
  jifen_init();
  ran_sleep();
  return true;
}

/********时长部分*********/
function do_shipin() {
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["视频"]).child(3).click();
  fSet("title", "视听学习…");
  fClear();
  desc("百灵").findOne().click();
  sleep(1000);
  fInfo("检测温馨提示弹窗");
  if (text("温馨提示").findOne(1500)) {
    text("关闭").findOne().click();
    fInfo("检测到温馨提示并已关闭");
  }
  desc("百灵").findOne().click();
  let shu = text("竖").findOne();
  sleep(1000);
  // 定位到整个百灵frame_box
  let frame_box = shu.parent().parent().parent().parent();
  textMatches(/\d{2}:\d{2}/).waitFor();
  let video_list = frame_box.findOne(className("android.widget.ListView"));
  video_list.child(1).child(1).child(0).click();
  text("分享").waitFor();
  if (idContains("guide_view").findOne(1500)) {
    fInfo("检测到引导遮罩");
    sleep(1000);
    click(device_w / 2, device_h / 2);
    sleep(1000);
    click(device_w / 2, device_h / 4);
  }
  sleep(800);
  //log(text("刷新重试").exists());
  if (text("刷新重试").exists()) {
    fInfo("检测到流量提醒");
    text("刷新重试").findOne().click();
  }
  sleep(random(8000,9500));
  for (let i=0; i<6; i++) {
    click(device_w / 2, device_h / 2);
    sleep(500);
    swipe(device_w/2, device_h*0.8, device_w/2, device_h*0.1, 1000);
    sleep(random(8000,9500));
  }
  back();
  fInfo("视频个数已刷完");
  // 返回积分页
  jifen_init();
  ran_sleep();
  return true;
}

function do_wenzhang() {
  // 点击进入本地
//   jifen_list = refind_jifen();
  let old_wen = storage_user.get("old_wen_list", []);
  //log(typeof old_wen, old_wen);
  jifen_list.child(jifen_map["本地"]).child(3).click();
  fSet("title", "选读文章…");
  fClear();
  fInfo("切换地区为北京");
  text("切换地区").findOne(3000);
  if (text("立即切换").exists()) {
    text("取消").findOne(3000).click();
  }
  log("切换地区");
  text("切换地区").findOne().click();
  log("查找北京");
  text("北京").waitFor();
  sleep(500);
  log("切换北京");
  text("北京").findOne().parent().parent().click();
  log("查找banner");
  //let banner = className("android.support.v7.widget.RecyclerView").findOne();
  let banner = classNameContains("RecyclerView").findOne();
  fInfo("查找北京新闻广播");
  //fRefocus();
  while (banner.findOne(text("北京新闻广播").boundsInside(0,0,device_w,device_h)) == null) {banner.scrollForward();sleep(500);}
  last_obj = banner.findOne(text("北京新闻广播"));
//   fInfo("点击北京新闻广播", text("北京新闻广播").findOne().parent().click());
  fInfo("点击北京新闻广播："+ last_obj.parent().click());
  fInfo("视听广播时长");
  sleep(11500);
  back();
  fClear();
  // 下面正式刷文章
  fInfo("开始文章");
  sleep(1500);
  banner = classNameContains("RecyclerView").findOne();
  while (banner.findOne(text("北京学习平台").boundsInside(0,0,device_w,device_h)) == null) {banner.scrollBackward();sleep(500);}
  sleep(1000);
  fInfo("查找北京学习平台，尝试点击");
  first_obj = banner.findOne(text("北京学习平台"));
//   while (!text("北京学习平台").findOne().parent().click()) {log("click: false");}
//   log("click: true");
//   real_click(text("北京学习平台").findOne().parent());
  real_click(first_obj.parent());
  log("等待加载");
  text("新思想扎根京华").waitFor();
  let swipe_y = text("新思想扎根京华").findOne().parent().parent().bounds().bottom;
  log("识别出顶部：", swipe_y);
  fRefocus();
  let listview = className("android.widget.ListView").depth(17).findOne();
  // 先判断是否有可刷文章，没有则停止脚本
  // while (!id("general_card_image_id").findOne(1000)) {listview.scrollForward();}
  for (i=0; i<2; i++) {
    listview.scrollForward();
    sleep(500);
  }
  // 自定义没有刷过的文章筛选器
  let wen_box_slt = className("android.view.ViewGroup").depth(20).filter(function(l) {
    let title = l.findOne(idContains("general_card_title_id"));
    let image = l.findOne(idContains("general_card_image_id"));
    let pic_num = l.findOne(idContains("st_feeds_card_mask_pic_num"));
    if (title && image && !pic_num) {
      return old_wen.indexOf(title.text()) == -1 && title.text().indexOf("【专题】") == -1;
    }
    return false;
  });
  log("查找文章");
  //while (!idContains("general_card_image_id").findOne(500)) {
  while (!wen_box_slt.findOne(500)) {
    listview.scrollForward();
    //sleep(500);
  }
  log("找到文章");
//   let wen_img = idContains("general_card_image_id").findOne(1000);
//   if (!wen_img) {
//     console.show();
//     log("未找到新文章,请手动刷好文章后再运行脚本");
//     exit();
//   }
  // 下面那句会定位到新思想的文章，不能加载过新思想
  // let wen_box = id("general_card_title_id").findOne().parent().parent().parent();
//   let wen_box = wen_img.parent().parent().parent();
  let wen_box = wen_box_slt.findOne();
  // 先做5次
  let wen_num = 0;
  let re_times = 6;
  while (true) {
    let title = wen_box.findOne(idContains("general_card_title_id")).text();
    old_wen.push(title);
    if (old_wen.length > 100) {old_wen.shift();}
    fClear();
    fInfo("点击文章："+title);
    //wen_box.click();
    let title_click = wen_box.parent().parent().click();
    fInfo("点击："+title_click);
    classNameContains("com.uc.webview.export").waitFor();
    fInfo("查找webview");
    let father_view = className("android.webkit.WebView").findOne(9000);
    sleep(1000);
//     可删let father_view = className("android.view.View").depth(16).findOne();
    // 判断是否为专题而不是文章
    if (father_view && father_view.find(idContains("__next")).empty()) {
      fInfo("查找文章内容");
      let content = idContains("image-text-content").findOne(9000);
      // log(idContains("image-text-content").findOne().id());
      if (content) {
        // 不先点一下划不动
        idContains("xxqg-article-header").findOne().child(0).click();
      }
      swipe(device_w/2, device_h*0.7, device_w/2, device_h*0.3, 1000);
      if (wen_num < re_times-1) {
        sleep(random(9000,10500));
      }
     	else {
        // 第6次停顿刷时间
        //console.show();   
        toastLog("正在刷时长程序未停止");
        let shichang = 6*random(55, 60);
        fClear();
        fInfo("开始刷时长，总共" + shichang + "秒");
        let wait_time = 1;
        for (let i=0; i<shichang; i++){ //*random(55, 60)
          // 每15秒增加一次滑动防息屏
          if (i%15==0) {
            swipe(device_w/2, device_h*0.6, device_w/2, device_h*0.6-100, 500);
            sleep(500);
          }
          else {sleep(1000);}
          fSet("info", "已观看文章" + wait_time + "秒，总共" + shichang + "秒");
          wait_time++;
        }
        fSet("info", "已结束文章时长");
        console.hide();
        back();
        break;
      }
    }
    else {wen_num -= 1;}
    back();
    //id("general_card_image_id").waitFor();
    className("android.widget.ListView").scrollable().depth(17).waitFor();
    sleep(1000);
//     // 防止坐标太低滑到后台的情况
//     if (wen_box.bounds().centerY() >= device_h*0.95) {
//       log("文章过低");
//       //log(wen_num, wen_box.bounds().centerX(), device_h*0.9, wen_box.bounds().centerX(), swipe_y)
//       swipe(wen_box.bounds().centerX(), device_h*0.9, wen_box.bounds().centerX(), swipe_y, 2000);
//       wen_box = id("general_card_image_id").findOne(1000).parent().parent().parent();
//     }
//     log("滑动："+wen_num, wen_box.bounds().centerY(), swipe_y);
//     swipe(wen_box.bounds().centerX(), wen_box.bounds().centerY(), wen_box.bounds().centerX(), swipe_y, 1000);
//     if (id("general_card_image_id").findOnce(1) == null) {
//       while (id("general_card_image_id").findOnce(1) == null) {
//         //swipe(device_w/2, device_h*0.7, device_w/2, device_h*0.3, 500);
//         listview.scrollForward();
//         sleep(200);
//         if (id("general_card_image_id").exists()) {
//           wen_box = id("general_card_image_id").findOne(1000).parent().parent().parent();
//           break;
//         }
//       }
//     }
//     else {wen_box = id("general_card_image_id").findOnce(1).parent().parent().parent();}
    while (!wen_box_slt.exists()) {
      listview.scrollForward();
      sleep(200);
    }
    wen_box = wen_box_slt.findOne();
    wen_num += 1;
  }
  // 更新已读文章库
  storage_user.put("old_wen_list", old_wen);
  sleep(3000);
  // 关闭音乐
  close_video();
  back(); 
  sleep(3000);
  // 返回积分页
  jifen_init();
  ran_sleep();
  return true;
}

/********每日答题*********/
function do_meiri() {
  // 点击进入每日答题
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["每日"]).child(3).click();
  fSet("title", "每日答题…");
  fClear();
  // 等待加载
  text("查看提示").waitFor();
  // 获取右上题号，如1 /5
  var tihao = className("android.view.View").depth(24).findOnce(1).text();
  var num = Number(tihao[0]);
  var sum = Number(tihao[tihao.length-1]);
  var substr = tihao.slice(1);
  while (num<=sum) {
    fClear();
    fInfo("第"+num+"题");
    // 等待加载
    text(num+substr).waitFor();
    num++;
//     // 如果是视频题则重新开始
//     if (className("android.widget.Image").exists()) {
//       num = 1;
//       restart(0);
//       continue;
//     }
    do_exec();
    // 点击确定下一题
    depth(20).text("确定").findOne().click();
		ran_sleep();
    // 如果题做错了重来
    if (text("下一题").exists() || text("完成").exists()) {
      fInfo("答错重试");
      num = 1;
      restart(0);
      continue;
    }
  }
	// 循环结束完成答题
  text("返回").findOne().click();
  text("登录").waitFor();
  ran_sleep();
  return true;
}

/********每周答题*********/
function do_meizhou() {
  // 点击进入每周答题
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["每周"]).child(3).click();
  fSet("title", "每周答题…");
  fClear();
  // 等待加载
  textContains("月").waitFor();
  let scoll = depth(21).scrollable().findOne();
  // 下面是倒叙作答
  if (meizhou_dao) {
    fInfo("倒序查找未做题目");
    //当出现已作答时，点击最后一个未作答
    while (!text("已作答").exists()) {
      scoll.scrollForward();
      sleep(300);
    }
    var clt = text("未作答").find();
    if (clt.empty()) {
      fInfo("每周答题全部已作答。");
      back();
      text("登录").waitFor();
      ran_sleep();
      return true;
    }
    var title = clt[clt.length-1].parent().child(0).text();
    fInfo(title + "开始作答");
    clt[clt.length-1].parent().click();
    // 测试用
    // text("已作答").findOnce(0).click();
  }
  // 下面是正序作答
  else {
    fInfo("正序查找未做题目");
    // 找到未作答就停止滚动
    let dixian_slt = text("您已经看到了我的底线").filter(function(w) {
      log("底线：", w.bounds().top, device_h);
      return w.bounds().top <= device_h-30;
    });
    //while (true) { //测试用
    while (!text("未作答").exists()) {
      // 如果到底则设置倒序为true
      if (dixian_slt.exists()) {
        storage_user.put('meizhou_dao', true);
        fInfo("每周答题全部已作答。");
        back();
        text("登录").waitFor();
        ran_sleep();
        return true;
      }
      scoll.scrollForward();
      sleep(200);
    }
    title = text("未作答").findOne().parent().child(0).text();
    fInfo(title + "开始作答");
    text("未作答").findOne().parent().click();
  } 
  // 等待加载
  text("查看提示").waitFor();
  // 获取右上题号，如1 /5
  var tihao = className("android.view.View").depth(24).findOnce(1).text();
  var num = Number(tihao[0]);
  var sum = Number(tihao[tihao.length-1]);
  var substr = tihao.slice(1);
  while (num<=sum) {
    fClear();
    fInfo("第"+num+"题");
    // 等待加载
    text(num+substr).waitFor();
    num++;
    do_exec("（每周）");
    // 点击确定下一题
    depth(20).text("确定").findOne().click();
		ran_sleep();
    // 如果题做错了重来
    if (text("下一题").exists() || text("完成").exists()) {
      //toastLog(title + "我无能为力啦，请手动作答吧");
      fInfo("做错尝试重答");
      text("答案解析").waitFor();
      upload_wrong_exec("（每周）");
      storage.put('dati_tiku', dati_tiku);
      back();
      text("退出").findOne().click();
  		ran_sleep();
      back();
      text("登录").waitFor();
      ran_sleep();
      return false;
    }    
  }
	// 循环结束完成答题
  text("返回").findOne().click();
  sleep(1000);
  back();
  text("登录").waitFor();
  ran_sleep();
  return true;
}

/********专项答题*********/
/*专项答题中提示的层次与每日每周的不一样
 * 专项答题出现的倒计时会影响22,23层的结构*/
function do_zhuanxiang() {
  // 点击进入专项答题
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["专项"]).child(3).click();
  fSet("title", "专项答题…");
  fClear();
  // 等待加载
  depth(23).waitFor();
  ran_sleep();
  let scoll = depth(21).indexInParent(1).scrollable().findOne();
  //let new_tihao = [];
  // 下面是倒序答题
  if (zhuanxiang_dao) {
    // 当出现已满分时，点击最后一个开始答题
    while (!text("已满分").exists()) {
      scoll.scrollForward();
      // 不加延迟会很卡
      sleep(200);
    }
    var clt = text("开始答题").find();
    if (clt.empty()) {
      fInfo("专项答题全部已作答。");
      back();
      text("登录").waitFor();
      ran_sleep();
      return true;
    }
    // 点击最后一项
    clt[clt.length-1].click();
  }
  // 下面是正序
  else {
    // 直到找到开始答题
    let dixian_slt = text("您已经看到了我的底线").filter(function(w) {
      return w.bounds().top <= device_h-30;
    });
    //while (true) { //测试用
    while (!text("开始答题").exists()) { //开始答题
      // 如果到底则设置倒序为true
      if (dixian_slt.exists()) {
        storage_user.put('zhuanxiang_dao', true);
        fInfo("专项答题全部已作答。");
        back();
        text("登录").waitFor();
        ran_sleep();
        return true;
      }
      // 滚动20次
      for (i=0; i<15; i++) {
        scoll.scrollForward();
        // 不加延迟会很卡
        sleep(300);
      }
    }
    text("开始答题").findOne().click();
  }
  ran_sleep();
  // 等待加载
  text("查看提示").waitFor();
  sleep(2000);
  // 获取右上题号，如1 /5
  var tihao = className("android.view.View").depth(24).findOnce(1).text();
  // 需要加个斜杠转义
  let reg = /(\d+) \/(\d+)/;
  var num = Number(tihao.match(reg)[1]);
  var sum = Number(tihao.match(reg)[2]);
  var substr = " /" + sum;
  //log(tihao);
  while (num<=sum) {
    fClear();
    fInfo("第"+num+"题");
    // 等待加载
    text(num+substr).waitFor();
    num++;
    do_exec();
    // 点击确定下一题
    let next = className("android.view.View").filter(function(l) {
      return (l.text() == "下一题") || (l.text() == "完成");
    });
    next.findOne().click();
//     if (!click("下一题")) {
//       click("完成");
//     }
    ran_sleep();
  }
  // 循环结束完成答题
  text("查看解析").waitFor();
  sleep(1000);
  // 如果题目答错，循环每一题并添加错题
  if (textMatches(/\d+分/).findOne().text() != "100分") {
    fInfo("有错题，尝试上传错题");
    text("查看解析").findOne().click();
    tihao = textMatches(reg).findOne().text();
    num = Number(tihao.match(reg)[1]);
    sum = Number(tihao.match(reg)[2]);
    substr = " /" + sum;
    //log(tihao);
    sleep(1500);
    while (num<=sum) {
      // 等待加载
      text(num+substr).waitFor();
      num++;
      if (textEndsWith("回答错误").exists()) {
        upload_wrong_exec();
      }
      // 点击确定下一题
      let next = className("android.view.View").filter(function(l) {
        return (l.text() == "下一题") || (l.text() == "完成");
      });
      next.findOne().click();
      sleep(random(1000, 1500));
    }
    storage.put('dati_tiku', dati_tiku);
  }
  else {
    back();
    ran_sleep();
  }
  back();
  text("登录").waitFor();
  ran_sleep();
  return true;
}

/********挑战答题*********/
function do_tiaozhan() {
  // 点击进入挑战答题
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["挑战"]).child(3).click();
  fSet("title", "挑战答题…");
  fClear();
  // 等待加载、积分页面也有Image和List，需要用depth筛选
  className("android.widget.Image").depth(24).waitFor();
  let total = 0;
  while (true) {
    fClear();
    fInfo("第"+(total+1)+"题");
    // 等待选项列表
    let xuan_list = className("android.widget.ListView").findOne().children();
    // 获取题目
    let que_txt = className("android.widget.ListView").findOne().parent().child(0).text();
    //log(que_txt);
    // 获取答案列表，可能找到多个答案
    // let ans_list = get_ans_by_http(que_txt.replace(/来源：.*|出题单位：.+/, ""));
    let ans_list = get_ans_by_tiku(que_txt.replace(/[^\u4e00-\u9fa5\d]|来源：.+|出题单位：.+/g, ""));
    //log("答案："+ans_list);
    ran_sleep();
    if (total >= 5) {
      // 题数数够了随便选
      fInfo("已答对5题，全选A");
      xuan_list[0].child(0).click();
    }else if (ans_list.length != 0) {
      let max_simi = 0;
      let xuanxiang = null;
      // 循环对比所有选项和答案，选出相似度最大的
      for (let xuan_box of xuan_list) {
        let xuan_txt = xuan_box.child(0).child(1).text();
        //log(xuan_txt);
        for (let ans of ans_list) {
          let similar = str_similar(ans.slice(2), xuan_txt);
          //log(xuan_txt, similar);
          if (similar > max_simi) {
            max_simi = similar;
            xuanxiang = xuan_box.child(0);
          }
        }
      }
      if (xuanxiang != null) {
        fInfo("最终："+ xuanxiang.child(1).text());
        xuanxiang.click();
      }
      else {
        fInfo("无匹配答案");
        xuan_list[0].child(0).click();
      }
    }
    // 如果没找到答案
    else {
      fInfo("未找到答案");
      // 选第一个选项
      xuan_list[0].child(0).click();
    }
    sleep(2500);
    // 判断题是否答错
    if (text("结束本局").exists()) {
      sleep(5000);
      click("结束本局");
      text("再来一局").waitFor();
      if (total < 5) {
        fInfo("答错重试");
        console.warn("warn:", que_txt);
      	text("再来一局").findOne().click();
      }
      else {
        // 退出
        back();
        text("登录").waitFor();
        ran_sleep();
        return true;
      }
      total = 0;
      sleep(2000);
      continue;
    }
    // 没答错总数加1
    total += 1;
  }
}

/********双人、四人赛*********/
function do_duizhan1(renshu) {
//   jifen_list = refind_jifen();
  fClear();
  if (renshu == 2) {
    // 点击进入双人对战
    jifen_list.child(jifen_map["双人"]).child(3).click();
    fSet("title", "双人对战");
    fInfo("等待随机匹配");
    text("随机匹配").waitFor();
    sleep(1000);
    let match = text("随机匹配").findOne().parent().child(0);
    do {
      fInfo("点击："+match.click());
      sleep(500);
    } while (text("随机匹配").exists());
  }
  else if (renshu == 4) {
    // 点击进入四人赛
    jifen_list.child(jifen_map["四人"]).child(3).click();
    fSet("title", "四人赛");
    // 等待开始比赛并点击
    fInfo("等待开始比赛");
    text("开始比赛").waitFor();
    sleep(1000);
    let start_click = text("开始比赛").findOne().click();
    fInfo("点击："+start_click);
  }
  //text("开始").findOne(1000);
  className("android.widget.ListView").waitFor();
  fClear();
  let num = 1;
  let err_flag = true;
  while (true) {
    // 如果是第一题或者下面出错，则跳过前面等待过渡
    if (num != 1 && err_flag) {
      // 检查到其中一个过渡界面为止
      while (true) {
        // 检测是否结束并退出
        if (text("继续挑战").exists()) {
          sleep(1000);
          let tz_click = text("继续挑战").findOne().click();
          log("点击继续挑战:"+tz_click);
          sleep(1500);
          back();
          if (renshu == 2) {
            sleep(1000);
            fInfo("查找退出按钮");
            //winReshow();
            var exit_click = text("退出").findOne().click();
            fInfo("点击退出:"+exit_click);
          }
          sleep(1000);
          text("登录").waitFor();
          ran_sleep();
          return true;
        }
        else if (text("第" + num + "题").exists()) {
          fClear();
          fInfo("第"+num+"题");
          break;
        }
      }
      // 直到过渡界面消失，再匹配下一题
      while (text("第" + num + "题").exists()) {} //sleep(100);
    }
    else if (!err_flag) {
      err_flag = true;
      if (text("继续挑战").exists()) {
        sleep(1000);
        let tz_click = text("继续挑战").findOne().click();
        log("点击继续挑战:"+tz_click);
        sleep(1500);
        back();
        if (renshu == 2) {
          sleep(1000);
          fInfo("查找退出按钮");
          //winReshow();
          var exit_click = text("退出").findOne().click();
          fInfo("点击退出:"+exit_click);
        }
        sleep(1000);
        text("登录").waitFor();
        ran_sleep();
        return true;
      }
    }
    let listview = className("android.widget.ListView").findOne(1000);
    if (!listview) {
      log("找不到listview");
      err_flag = false;
      sleep(200);
      continue;
    }
    sleep(100); // 追求极限速度，不知道会不会出错
    let view_d28 = className("android.view.View").depth(28).indexInParent(0).findOne(1000);
    if (!view_d28) {
      toastLog("找不到view_d28");
      err_flag = false;
      sleep(200);
      continue;
    }
    // 根据父框的孩子数
    if (view_d28.childCount() > 0) {
      que_x = view_d28.bounds().left;
      que_y = view_d28.bounds().top;
      que_w = view_d28.bounds().width();
      if (view_d28.child(0).text().length <= 4) { //有来源的是前面两个空格元素，文本为4个空格
        que_h = view_d28.child(2).bounds().top - view_d28.bounds().top;
      } else { //无来源的是题目，文本为8个空格
        que_h = view_d28.child(0).bounds().bottom - view_d28.bounds().top;
      }
    }
    else {
      toastLog("找不到框体");
      log(view_d28.childCount(), view_d28.bounds());
      err_flag = false;
      sleep(200);
      continue;
    }
    // 查找选项个数
    var radio_num = className("android.widget.RadioButton").find().length;
    if (!radio_num) {
      log("找不到选项");
      err_flag = false;
      sleep(200);
      continue;
    }
    for (let i=0; i<3; i++) {
      let img = captureScreen();
      // 裁剪题干区域，识别题干
      let que_img = images.clip(img, que_x, que_y, que_w, que_h);
      //images.save(que_img, '/sdcard/1/que_img' + num + '.png');
      console.time("题目识别");
      let results = JSON.parse(JSON.stringify(paddle.ocr(que_img)));
      var que_txt = ocr_rslt_to_txt(results).replace(/[^\u4e00-\u9fa5\d]|^\d{1,2}\.?/g, "");
      console.timeEnd("题目识别");
      if (!que_txt) {
        images.save(img, '/sdcard/天天向上/' + renshu + '-' + num + '.png','png',50)
        images.save(que_img, '/sdcard/天天向上/' + renshu + '-' + num + '-q.png','png',50);
        fError("未识别出题目，图片保存至‘/sdcard/天天向上/’");
        console.error("大概率无障碍服务失效"+ auto.service);
        console.error("题目框体范围：", que_x, que_y, que_w, que_h);
        img.recycle();
        que_img.recycle();
      } else {
        fInfo("题目识别："+ que_txt);
        img.recycle();
        que_img.recycle();
        break
      }
    }
    // 选项清洗标识
    var replace_sign = "default_ocr_replace";
    let question_reg = new RegExp(update_info["question_reg"], "gi");
    let include_reg = new RegExp(update_info["include_reg"], "gi");
    var que_key = null;
    if (que_key = question_reg.exec(que_txt)) { replace_sign = "other_ocr_replace"; }
    else if (que_key = (/读音|词形/g).exec(que_txt)) { replace_sign = "accent_ocr_replace"; }
    else if (que_key = include_reg.exec(que_txt)) { replace_sign = "include_ocr_replace"; }
    
    let ans_list = get_ans_by_tiku(que_txt);
    //log(ans_list);
    let idx_dict = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5};
/************以下是因为随机选项顺序后失效的代码*****************/
//     try { //防止别人先答完出错
//       let idx = 0;
//       if (ans_list.length <= 1) {
//         if (ans_list.length == 1 && idx_dict[ans_list[0][0]] != undefined) {
//           idx = idx_dict[ans_list[0][0]];
//           fTips("答案:"+ ans_list[0]);
//         }
//         else if (ans_list.length == 0) {
//           fInfo("未找到答案");
//         }
//         // 直到选项完全出现在屏幕
//         while (className("android.widget.ListView").findOne(1000).indexInParent() == 0) {}
//         let is_click = className("android.widget.RadioButton").findOnce(idx).parent().click();
//         log(is_click);
//         if (!is_click) {
//           sleep(200);
//           log(className("android.widget.RadioButton").findOnce(idx).parent().click());
//         }
//         num++;
//         continue;
//       }
//     }
//     catch (e) {
//       log("error1:", e);
//     }
/************以上是因为随机选项顺序后失效的代码*****************/
    
    
    // 如果上面答案不唯一或者不包含找到的选项，直到选项完全出现在屏幕
    try {
    	while (className("android.widget.ListView").findOne(1000).indexInParent() == 0) {}
    } catch (e) {
      log("error2:", e);
      err_flag = false;
      sleep(200);
      continue;
    }
    let xuanxiang_list = className("android.widget.ListView").findOne(1000);
    let xuanxiang_index = xuanxiang_list.indexInParent();
    let xuanxiang_list_x = xuanxiang_list.bounds().left;
    let xuanxiang_list_y = xuanxiang_list.bounds().top;
    let xuanxiang_list_w = xuanxiang_list.bounds().width();
    let xuanxiang_list_h = xuanxiang_list.bounds().height();
    
    if (!xuanxiang_list || !xuanxiang_list.parent().childCount() || !xuanxiang_list.parent().child(0)) {
      log("xuan_box is null");
      err_flag = false;
      sleep(200);
      continue;
    }
    log("开始截选项");
    console.time("选项识别");
    img = captureScreen();
    // 裁剪所有选项区域
    img = images.clip(img, xuanxiang_list_x, xuanxiang_list_y, xuanxiang_list_w, xuanxiang_list_h);
		//images.save(allx_img, '/sdcard/1/x_img' + num + '.png');
    let xuan_txt_list = [];
    let allx_txt = "";
    // 重新排序识别结果
    let x_results = JSON.parse(JSON.stringify(paddle.ocr(img)));
    allx_txt = ocr_rslt_to_txt(x_results).replace(/\s+/g, "");
    // 原识别结果
    //allx_txt = ocr.recognizeText(img);
    console.timeEnd("选项识别");
    if (!allx_txt) {
      images.save(img, '/sdcard/天天向上/' + renshu + '-' + num + '-a.png','png',50);
      log("识别不出选项文本，图片保存至‘/sdcard/天天向上/’");
      err_flag = false;
      sleep(200);
      continue;
    }
    img.recycle();
    // 清洗选项文本
    log("replace_sign:"+replace_sign);
    log("清洗前："+allx_txt);
    let replace_d = update_info[replace_sign];
    if (replace_sign == "include_ocr_replace") {
      let result = true;
      log("que_key:"+que_key);
      let [words, r, repl] = replace_d[que_key];
      for (let word of words) {
        let reg = new RegExp(word, "gi");
        if (!reg.test(allx_txt)) {
          result = false;
          break;
        }
      }
      if (result) {
        let reg = new RegExp(r, "gi");
        allx_txt = allx_txt.replace(reg, repl);
      }
    } else {
      for (let r of Object.keys(replace_d)) {
        let reg = new RegExp(r, "gi");
        allx_txt = allx_txt.replace(reg, replace_d[r]);
      }
    }
    //allx_txt.replace(/令媛/g, "令嫒");
    // 获取选项列表
    xuan_txt_list = allx_txt.match(/[a-d][^a-z\u4e00-\u9fa5\d]?\s*.*?(?=[a-d][^a-z\u4e00-\u9fa5\d]?|$)/gi);
    if (!xuan_txt_list) {
      log("识别不出选项");
      err_flag = false;
      sleep(200);
      continue;
    }
    if (xuan_txt_list && xuan_txt_list.length != radio_num) {
      xuan_txt_list = allx_txt.match(/[a-d][^a-z\u4e00-\u9fa5\d]\s*.*?(?=[a-d][^a-z\u4e00-\u9fa5\d]|$)/gi);
    }
    log(xuan_txt_list.toString());
    
    if (xuan_txt_list.length != 0) {
      let max_simi = 0;
      let right_xuan = '';
      let right_xuan2 = '';
      let ans_txt = '';
      for (let xuan_txt of xuan_txt_list) {
        let txt = xuan_txt.replace(/^[A-Z]\.?/gi, "");;
        for (let ans of ans_list) {
          let similar = str_similar(ans.slice(2), txt);
          if (similar > max_simi) {
            max_simi = similar;
            ans_txt = ans;
//             // 答案默认顺序优先
//             right_xuan = ans[0];
//             right_xuan2 = xuan_txt[0].toUpperCase();
            // 文本匹配优先
            right_xuan2 = ans[0];
            right_xuan = xuan_txt[0].toUpperCase();
          }
        }
      }
//       if (ans_list.length > 1) {fTips("匹配答案:"+ ans_txt);}
      fTips("匹配答案:"+ ans_txt);
      if (right_xuan != '') {
        let idx = idx_dict[right_xuan];
        fInfo("最终:"+ right_xuan);
        try {className("android.widget.RadioButton").findOnce(idx).parent().click();}
        catch (e) {
          idx = idx_dict[right_xuan2];
          fInfo("备选:"+ right_xuan2);
          try {className("android.widget.RadioButton").findOnce(idx).parent().click();}
          catch (e1) {
            log("error3:", e);
            err_flag = false;
            sleep(200);
            continue;
          }
        }
        //log(a);
      }
      else {
        try {className("android.widget.RadioButton").findOnce().parent().click();}
        catch (e1) {
          log("error4:", e1);
          err_flag = false;
          sleep(200);
          continue;
        }
      }
    }
    else {
      console.warn("未识别出选项");
      err_flag = false;
      sleep(200);
      continue;
    }
    num++;
  }
}


/********订阅*********/
function do_dingyue() {
//   jifen_list = refind_jifen();
  jifen_list.child(jifen_map["订阅"]).child(3).click();
  fSet("title", "订阅…");
  fClear();
  let tab1 = descContains("Tab").findOne(9000);
  if (!tab1) {back();text("登录").waitFor();return false}
  let zuo1 = descContains("上新").findOne(9000);
  if (!zuo1) {back();text("登录").waitFor();return false}
  // 上方标签
  let tab_clt = descContains("Tab").untilFind();
  let total_click = 0;
  for (let tab of tab_clt) {
    tab.click();
    sleep(500);
    // 左方分类
    let zuo_clt = className("android.view.View").depth(14).findOne().children();
    for (let zuo of zuo_clt) {
      if (dingyue_dao) {zuo = zuo_clt[zuo_clt.length-1];}
      zuo.click();
      sleep(500);
      // 右方列表
      className("android.view.View").depth(14).waitFor();
      let you_clt = className("android.view.View").depth(14).findOnce(1);
      let last_desc = "";
      while (you_clt) {
        //let img = captureScreen();
        // 订阅按钮集合
        let dingyue_clt = className("android.widget.ImageView").indexInParent(2).untilFind();
        try {
          //fInfo(dingyue_clt[dingyue_clt.length-1].parent().child(1).desc().slice(0,10)+" 旧:"+last_desc.slice(0,10));
          if (dingyue_clt[dingyue_clt.length-1].parent().child(1).desc() == last_desc) {
            fClear();
            fInfo("到底了");
            break;
          }
          // 最底下订阅的名称
          last_desc = dingyue_clt[dingyue_clt.length-1].parent().child(1).desc();
        }
        catch (e) {log(e); continue;}
        let img = captureScreen();
        for (let dingyue of dingyue_clt) {
          if (dingyue.bounds().bottom >= device_h) { continue; }
          try {
            var pot = findColorInRegion(img, "#E42417", dingyue.bounds().left, dingyue.bounds().top,
                                        dingyue.bounds().width(), dingyue.bounds().height(), 30);
          } catch(e) { 
            console.error(dingyue.bounds().left, dingyue.bounds().top, dingyue.bounds().width(), dingyue.bounds().height());
            console.error(dingyue.parent().child(1).desc()); 
          }
          //if (pot && dingyue.bounds().bottom < device_h) {
          if (pot) {
            fInfo("找到一个订阅");
            sleep(1000);
            let is_click = dingyue.click();
            fInfo("点击："+ is_click);
            //click(dingyue.bounds().centerX(), dingyue.bounds().centerY());
            sleep(1000);
            //click(pot.x, pot.y+5);
            total_click += 1;
          }
          if (total_click >= 2) {
            fInfo("订阅已完成");
            back();
            text("登录").waitFor();
            ran_sleep();
            return true;
          }
        }
        //img.recycle();
        let scr_result = you_clt.scrollForward();
        sleep(500);
//         swipe(device_w*0.6, device_h*0.8, device_w*0.6, device_h*0.3, 800);
//         while (desc("加载中").exists()) { sleep(1000); }
      }
      if (dingyue_dao) {fInfo("只检查年度上新");break;}
    }
    //sleep(1000);
  }
  fInfo("无可订阅项目");
  storage_user.put('dingyue_dao', true);
  back();
  text("登录").waitFor();
  ran_sleep();
  return true;
}
/**************************************上方为执行各项目函数*********************************************/



// 做一次题
function do_exec(type) {
  // 等待加载
  let tishi = text("查看提示").findOne();
  //log(tishi);
  // 点击查看提示按钮
  tishi.click();
  // 随机延迟、等待提示
  ran_sleep();
  // 等待加载
  text("提示").waitFor();
  
  // 判断题型
  /******************单选题*******************/
  if (textStartsWith("单选题").exists()) {
    // 获取题目
		//let que_txt = className("android.view.View").depth(23).findOnce(1).text();
    // 上面被专项答题影响了22、23层的元素数，只能通过其他层定位
    let que_txt = className("android.view.View").depth(24).findOnce(1).parent().parent().child(1).text();
    // log(que_txt);
    var ans = get_ans_by_re(que_txt);
    if (ans && depth(26).text(ans).exists()) {
      // 定位选项并点击
      depth(26).text(ans).findOnce().parent().click();
    }
    //else if (ans = get_ans_by_http_dati(que_txt)) {
    else {
      if (type) {ans = get_ans_by_dati_tiku(que_txt, type);}
      else {ans = get_ans_by_dati_tiku(que_txt);}
      let reg = /[A-F]/;
      if (ans && reg.test(ans) && ans.length == 1) {
        ans = ans.match(reg)[0];
        let idx_dict = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5};
        className("android.widget.RadioButton").findOnce(idx_dict[ans[0]]).parent().click();
      }
      // 否则用ocr
      else {
        if (!ans) {ans = get_ans_by_ocr1().replace(/\s/g, "");}
        if (depth(26).text(ans).exists()) {
          depth(26).text(ans).findOne().parent().click();
        }
        else {
          // 筛选出相似度最大的
          let xuan_clt = className("android.widget.RadioButton").find();
          let max_simi = 0;
          let xuanxiang = null;
          for (let n of xuan_clt) {
            let similar = str_similar(ans, n.parent().child(2).text());
            if (similar > max_simi) {
              max_simi = similar;
              xuanxiang = n.parent();
            }
          }
          //点击选项
          if (xuanxiang) {xuanxiang.click();}
          else {className("android.widget.RadioButton").findOne().parent().click();}
          //log(xuanxiang.find().size());
        }
      }
    }
  }
  /******************填空题*******************/
  else if (textStartsWith("填空题").exists()) {
    // 填空题题干会被空格分割
    //let que = className("android.view.View").depth(23).findOnce(1).children();
    // 上面被专项答题影响了22、23层的元素数，只能通过其他层定位
    let que = className("android.view.View").depth(24).findOnce(1).parent().parent().child(1).children();
    // 第一个编辑框的父元素
    let text_edit = className("android.widget.EditText").findOne().parent().children();
    // 第一个空答案字数，后期考虑换成全部答案字数
    let word_num = text_edit.find(className("android.view.View")).length;
    // 填空数
    let kong_num = 0;
    let que_txt = "";
    for (let i of que) {
      // 如果没有text则加个空格
      //que_txt = que_txt + (i.text() ? i.text() : "    ");
      if (i.text()) {que_txt = que_txt + i.text();}
      else {
        kong_num += 1;
        que_txt = que_txt + "    ";
      }
    }
    // log(que_txt);
    // log("kong_num:", kong_num);
    // 判断是否只有一个空，re只能得出第一空答案
    if (kong_num <= 1) {
      //一个空时，先正则匹配，再题库匹配，以防题库出错，最后OCR
      //var ans = get_ans_by_http_dati(que_txt);
      if (type) {ans = get_ans_by_dati_tiku(que_txt, type);}
      else {ans = get_ans_by_dati_tiku(que_txt);}
      if (!ans) {ans = get_ans_by_re(que_txt);}
      //长度和空格数相等才会填充
      if (ans && word_num == ans.length) {
        // 定位填空并填入
        depth(25).className("android.widget.EditText").findOne().setText(ans);
      }
      else { //暂时取消RE答题
        // 多个空的解决不了
        ans = get_ans_by_ocr1().replace(/\s/g, "");
        if (!ans) {ans = "未识别出文字";}
        depth(25).className("android.widget.EditText").setText(ans);
      }
    }
    // 如果多个空，直接ocr按顺序填入
    else {
      //ans = get_ans_by_http_dati(que_txt);
      if (type) {ans = get_ans_by_dati_tiku(que_txt, type);}
      else {ans = get_ans_by_dati_tiku(que_txt);}
      if (!ans) {ans = get_ans_by_ocr1().replace(/\s/g, "");}
      if (!ans) {ans = "未识别出文字";}
      edit_clt = className("android.widget.EditText").find();
      let ans_txt = ans;
      for (let edit of edit_clt) {
        let n = edit.parent().children().find(className("android.view.View")).length;
        edit.setText(ans_txt.slice(0, n));
        ans_txt = ans_txt.slice(n);
      }
    }
  }
  /******************多选题*******************/
  else if (textStartsWith("多选题").exists()) {
    // 获取题目
		// let que_txt = className("android.view.View").depth(23).findOnce(1).text();
    // 上面被专项答题影响了22、23层的元素数，只能通过其他层定位
    let que_txt = className("android.view.View").depth(24).findOnce(1).parent().parent().child(1).text();
    // log(que_txt);
    // 这里匹配出全部挖空
    let reg1 = /\s{3,}/g;
    let res = que_txt.match(reg1);
    // log(res);
    // 先看挖空数量和选项数量是否一致，判断是否全选
    let collect = className("android.widget.CheckBox").find();
    // 如果全选
    if (res.length == collect.length) {
      ans = "全选";
      for (let n of collect) {
        // 直接点击会点不上全部
        n.parent().click();
      }
    }
    //else if (ans = get_ans_by_http_dati(que_txt)) {
    else {
      if (type) {ans = get_ans_by_dati_tiku(que_txt, type);}
      else {ans = get_ans_by_dati_tiku(que_txt);}
      let reg = /[A-F]{1,6}/;
      if (ans && reg.test(ans)) {
        ans = ans.match(reg)[0];
        let idx_dict = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5};
        for (let n of ans) {
          className("android.widget.CheckBox").findOnce(idx_dict[n]).parent().click();
        }
      }
      // 如果不是全选
      else {
        ans = get_ans_by_ocr1(); 
        // 下面为匹配子串法
        ans = ans.replace(/[^\u4e00-\u9fa5\w]/g, "");
        log(ans);
        for (let n of collect) {
          let xuan_txt = n.parent().child(2).text().replace(/[^\u4e00-\u9fa5\w]/g, "");
          if (ans.indexOf(xuan_txt) >= 0) {
            n.parent().click();
          }
        }
      }
    }
  }
  fInfo("答案："+ans);
  // 返回退出查看提示界面
  back();
  sleep(1000);
  return true;
}

// 通过re匹配答案
function get_ans_by_re(que_txt) {
  // 定位挖空两侧字符，限制在两个标点符号内
  let reg1 = /([^，。？、；：” ]*?)\s{3,}([^，。？、；：” ]*)/;
  let res = que_txt.match(reg1);
  if (res[1] == '' && res[2] == '') {
    reg1 = /([^，。？、；：” ]*?[，。？、；：” ]*?)\s{3,}([，。？、；：” ]*?[^，。？、；：” ]*)/;
    res = que_txt.match(reg1);
  }
  // log(res);
  // 生成正则表达式
  let reg2_str = "/" + res[1] + "([^，。？、；：” ]*)" + res[2] + "/";
  let reg2 = eval(reg2_str);
  // log(reg2);
  // 获取试题信息、匹配答案
  // let tishi_txt = className("android.view.View").depth(23).findOnce(6).text();
  // 上面的查找方式会被出题方干扰
  // let tishi_txt = className("android.view.View").depth(22).findOnce(2).child(0).text();
  // 上面的层次在专项答题中出现变化
  let tishi_txt = text("提示").findOne().parent().parent().child(1).child(0).text();
  //log(tishi_txt);
  // 如果匹配到答案
  if (tishi_txt.match(reg2)) {
    let ans = tishi_txt.match(reg2)[1];
    log(ans);
    return ans;
  }
  else {return 0;}
}

// 通过ocr匹配答案
function get_ans_by_ocr1() {
  // 定位提示框位置
  //let tishi_box = className("android.view.View").depth(22).findOnce(2).child(0).bounds();
  // 上面的层次在专项答题中出现变化
  fRefocus();
  let tishi_box = text("提示").findOne().parent().parent().child(1).child(0).bounds();
  fInfo('开始截屏');
  let img = captureScreen();
  // 控制截图范围
  img = images.clip(img, tishi_box.left-10, tishi_box.top-10, tishi_box.width()+20, tishi_box.height());
  //images.save(img, '/sdcard/1/1.png');
  // 二值化
  img = images.interval(img, "#FD1111", 120);  //比inRange()好用多了
  //images.save(img, '/sdcard/1/2.png');
  let ans = "";
  let resp = JSON.parse(JSON.stringify(paddle.ocr(img)));
  ans = ocr_rslt_to_txt(resp);
  if (!ans) {fInfo("未识别出文字");}
  else {log(ans);} 
  img.recycle();
  return ans;
}

// 把ocr结果转换为正序的字符串
function ocr_rslt_to_txt(result) {
  let top = 0;
  let previous_left = 0;
  let txt = "";
  let txt_list = [];
  for (let idx in result) {
    if (top == 0) {top = result[idx].bounds.top;}
    if (previous_left == 0) {previous_left = result[idx].bounds.left;}
    if (result[idx].bounds.top >= top-10 && result[idx].bounds.top <= top+10) {
      if (result[idx].bounds.left > previous_left) {txt = txt + "   " + result[idx].words;}
      else {txt = result[idx].words + "   " + txt;}
    }
    else {
      top = result[idx].bounds.top;
      txt_list.push(txt);
      txt = result[idx].words;
    }
    if (idx == result.length-1) {txt_list.push(txt);}
    previous_left = result[idx].bounds.left;
  }
  //每行直接加个换行
  let ans = txt_list.join("\n");
  //log(ans);
  return ans;
}

// 通过http请求匹配答案
function get_ans_by_http(que_txt) {
  // 匹配题空两边汉字、字母及数字
  let reg = /[\u4e00-\u9fa5\d]+/g;
  //let reg = /(\S*)\s{2,}(\S*)/;
  let res = que_txt.match(reg);
  if (res == null) {return [];}
  // 此处可以加个判断，不然截图没截好时会有bug
  // 选取长的一边并控制在十个字
  let longest = '';
  for (let r of res) {
    if (r.length > longest.length && r.indexOf("中华人民共和") < 0 && r.indexOf("习近平总书记") < 0) {
      longest = r;
    }
  }
  let keyword = longest.slice(0, 6);
  log(keyword);
  // 获取答案html并解析
  let req = http.get('http://www.syiban.com/search/index/init.html?modelid=1&q=' + encodeURI(keyword));
  let resp_str = req.body.string();
  let resp_list = resp_str.match(/答案：(.*?)<\/span><\/p>/g);
  let ans_list = [];
  if (resp_list != null) {
    for (let a of resp_list) {
      // 查找出来后答案中有不可见的ZERO WIDTH SPACE，需要清洗
      ans = a.match(/答案：(.*?)<\/span><\/p>/)[1].replace(/[\u200B-\u200D\uFEFF]/g, "");
      //log(ans);
      ans_list.push(ans);
    }
  }
  //log(ans_list);
  return ans_list;
}

// 通过离线答题题库匹配答案
function get_ans_by_dati_tiku(que_txt, type) {
  let keyword = que_txt.replace(/\s/g, "");
  let ans_list = [];
  let ans = null;
  if (dati_tiku.length == 0) {return false;}
  //for (let ti of dati_tiku) {
  for (let i = dati_tiku.length - 1; i >= 0; i--) {
    let ti = dati_tiku[i];
    if (ti[0].indexOf(keyword) > -1) {
      ans = ti[1];
      if (ans != "None") {ans_list.push(ans);}
    }
  }
  //if (!ans || ans == "None") {return false;}
  if (!ans_list) {return false;}
  if (type) { // && ans_list.length > 1
    for (let a of ans_list) {
      if (a.indexOf(type) > -1) {
        ans = a.replace(type, "");
        break;
      }
    }
  }
  log("匹配题库：", ans);
  return ans;
}

// 通过http请求匹配答题答案
function get_ans_by_http_dati(que_txt) {
  // 获取答案html并解析
  let keyword = que_txt.replace(/\s/g, "");
  let req = http.get('https://tiku.3141314.xyz/search?table_name=tiku&page=1&rows=20&keyword=' + encodeURI(keyword));
  let resp_json = req.body.json();
  if (resp_json["total"] == 0) {return false;}
  let rows = resp_json["rows"];
  log(rows[0]);
  let ans_list = [];
  let ans = rows[0]["answer"];
  if (ans == "None") {return false;}
  //log(ans_list);
  return ans;
}

// 检测|更新离线题库
function update_dati_tiku() {
//   let total_req = http.get("https://tiku.3141314.xyz/tableCount");
  let total = 1;
  let last_dati_tiku_link = storage.get("dati_tiku_link", "");
  let dati_tiku = storage.get('dati_tiku', []);
//   if (total_req.statusCode == 200) {
//     total = total_req.body.json()[0][0];
//   } else {
  try {
    //dati_tiku = get_tiku_by_ct('https://webapi.ctfile.com/get_file_url.php?uid=35157972&fid=555754562&file_chk=94c3c662ba28f583d2128a1eb9d78af4&app=0&acheck=2&rd=0.14725283060014105');
    //dati_tiku = get_tiku_by_gitee('https://gitee.com/songgedodo/songge_tiku/raw/master/dati_tiku.txt');
    if (update_info["dati_tiku_link"] != last_dati_tiku_link) {
      try {dati_tiku = get_tiku_by_http(update_info["dati_tiku_link"]);}
      catch (e) {dati_tiku = get_tiku_by_http(update_info["dati_tiku_link2"]);}
      storage.put("dati_tiku_link", update_info["dati_tiku_link"]);
      storage.put('dati_tiku', dati_tiku);
      fInfo("已更新离线题库");
    }
    else {fInfo("未检测到题库更新，已用历史题库");}
    return dati_tiku
  } catch (e) {
    console.warn(e);
    if (dati_tiku) {
      fInfo("未识别出离线题库，已用历史题库");
      return dati_tiku
    }
  }
//   } 上面else的}
  //log("update total:", total);
  if (!dati_tiku || dati_tiku.length != total) {
    let req = http.get("https://tiku.3141314.xyz/getAnswer");
    if (req.statusCode == 200) {
      dati_tiku = req.body.json();
      storage.put('dati_tiku', dati_tiku);
      fInfo("题库已更新");
    }
    else {
      fInfo("网络问题识别不出在线题库");
    }
  }
  return dati_tiku;
}

//上传错题
function upload_wrong_exec(endstr) {
  text("答案解析").waitFor();
  let que_txt = "";
  if (textStartsWith("填空题").exists()) {
    let que = className("android.view.View").depth(24).findOnce(1).parent().parent().child(1).children();
    for (let i of que) {
      // 如果没有text则加个空格
      if (i.text()) {que_txt = que_txt + i.text();}
      else {
        que_txt = que_txt + "    ";
      }
    }
  }
  else {
    que_txt = className("android.view.View").depth(24).findOnce(1).parent().parent().child(1).text();
  }
  let ans_txt = textStartsWith("正确答案：").findOne().text().replace(/正确答案：|\s+/g, "");
  let question = que_txt.replace(/\s/g, "");
  if (endstr) {ans_txt += endstr;}
  fError("错题:" + question + ans_txt);
  //dati_tiku.unshift([question, ans_txt, null, null, null]);
  for (let ti of dati_tiku) {
    if (ti[0] == question) {
      console.info("题库已有此题");
      if (ti[1] == ans_txt) {
        console.info("并且答案一样，已跳过");
        return false
      }
    }
  }
  dati_tiku.push([question, ans_txt, null, null, null]);
  try {
  	updateToServer(question, ans_txt);
  }
  catch (e) {log(e);}
}

// 上传题目：
function updateToServer(question,answer) {
  fInfo("开始上传");
  var res = http.post("https://tiku.3141314.xyz/insertOrUpdate", 
                      {"question": question,"answer": answer, "pswd": "X2417481092ZY"});
  if (res.body.json()==200) {
    fInfo("成功");
    return true;
  }
  else {
    log(res.body.string());
    return false;
  }
}

// 通过缓存题库获取答案
function get_ans_by_tiku(que_txt) {
  let ans_list = [];
  let max_simi = 0;
  for (let ti of Object.keys(tiku)) {
    //log(ti.replace(/[\s_]/g, "").indexOf(que_txt));
    let ti_txt = ti.replace(/\[.+\]|^\d+\./g, "").replace(/[^\u4e00-\u9fa5\d]/g, "");
    //log(ti_txt);
    let len = que_txt.length;
    //let simi = str_similar(ti_txt.slice(0, len+6), que_txt);
    let simi = str_similar(ti_txt.slice(0, len), que_txt);
    //if (ti_txt.indexOf(que_txt) >= 0) {
    if (simi >= 0.25) {
      if (simi > max_simi) {
        ans_list.length = 0;
        ans_list.push(tiku[ti][1]);
        max_simi = simi;
      }
      else if (simi == max_simi) {ans_list.push(tiku[ti][1]);}
    }
  }
  return ans_list;
}

// 获取直链json
function get_tiku_by_http(link) {
  // 通过gitee的原始数据保存题库
  if (!link) {link = "https://mart-17684809426.coding.net/p/tiku/d/tiku/git/raw/master/tiku_json.txt"}
  let req = http.get(link);
  //log(req.statusCode);
  // 更新题库时若获取不到，则文件名+1
  if (req.statusCode != 200) {
    throw "网络原因未获取到题库，请尝试切换流量或者更换114DNS，退出脚本";
    return false;
  }
  return req.body.json();
}

// 获取城通网盘题库
function get_tiku_by_ct(link) {
  // 获取答案html并解析
  // 城通网盘解析
  if (!link) {link = "https://webapi.ctfile.com/get_file_url.php?uid=35157972&fid=546999609&file_chk=e83f4b72a2f142cca6ee87c64baba15c&app=0&acheck=2&rd=0.9023931062078081"}
  let req = http.get(link);
//   let resp_str = req.body.string();
//   let result = eval("("+ resp_str + ")");
  let result = req.body.json();
  let file = http.get(result["downurl"]);
//   return eval("("+ file.body.string() + ")");
  return file.body.json();
}

// 重启每日、每周
function restart(restart_flag) {
  // 点击退出
  ran_sleep();
  back();
  text("退出").findOne().click();
  ran_sleep();
  switch (restart_flag) {
      // 0为每日答题
    case 0:
      text('登录').waitFor();
      jifen_list.child(jifen_map["每日"]).child(3).click();
      break;
      // 1为每周答题
    case 1:
      // 等待列表加载
      text('本月').waitFor();
      //当出现已作答时，点击最后一个未作答
      while (!text("已作答").exists()) {
        depth(21).scrollable().findOne().scrollForward();
        sleep(200);
      }
      var clt = text("未作答").find();
      clt[clt.length-1].parent().click();
      break;
  }
}

// 从首页进入积分界面初始化
function jifen_init() {
  id("comm_head_xuexi_score").findOne().click();
  while (true) {
    let denglu = className("android.view.View").depth(24).text("登录").findOne(9000);
    if (denglu) {break;}
    back();
    sleep(1000);
    id("comm_head_xuexi_score").findOne().click();
  }
  fRefocus();
  text("登录").waitFor();
  className("android.webkit.WebView").scrollable().findOne().scrollForward();
  //jifen_list = className("android.widget.ListView").depth(21).findOne();
}

// 模拟随机时间0.5-3秒，后期可以用户自定义
function ran_sleep() {
  return sleep(random(1000, delay_time));
}

// 比较两个字符串相似度
function str_similar(str1, str2) {
  str1 = str1.replace(/[^\u4e00-\u9fa5\u2460-\u2469\wāáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜ]/g, "");
  str2 = str2.replace(/[^\u4e00-\u9fa5\u2460-\u2469\wāáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜ]/g, "");
  if (str1 == str2) {return 99;}
  if (str1.length > str2.length) {
    var muzi = str2;
    var instr = str1;
  }
  else {
    muzi = str1;
    instr = str2;
  }
  let reg = "/[" + muzi + "]{1}/g";
  let resu = instr.match(eval(reg));
	if (resu) {
    return (resu.length / instr.length);
  }
	else {return 0;}
}

// 关闭音乐浮动插件
function close_video() {
  let imv = className("android.widget.ImageView").find();
  //log(imv.empty());
  let swtch = imv[imv.length-1];
  swtch.click();
  sleep(1000);
  swtch.click();
  return true;
}

// 屏幕宽高、方向初始化
function init_wh() {
  fInfo("屏幕方向检测");
  log(device.width + "*" + device.height);
  var device_w = depth(0).findOne().bounds().width();
  var device_h = depth(0).findOne().bounds().height();
  log(device_w + "*" + device_h);
  if (device.width == device_h && device.height == device_w) {
    fError("设备屏幕方向检测为横向，后续运行很可能会报错，建议调整后重新运行脚本");
    sleep(10000);
  }
  else if (device.width == 0 || device.height == 0) {
    fError("识别不出设备宽高，建议重启hamibot后重新运行脚本");
    sleep(10000);
  }
  return [device_w, device_h]
}

// 尝试成功点击
function real_click(obj) {
  for (let i=1; i<=3; i++) {
    if (obj.click()) {log("real click: true"); return true;}
    sleep(300);
  }
  console.warn("控件无法正常点击：", obj);
  log("尝试再次点击");
  click(obj.bounds().centerX(), obj.bounds().centerY());
  return false;
}

// 测试ocr功能
function ocr_test() {
  try {
    fInfo("测试ocr功能，开始截图");
    let img_test = captureScreen();
    img_test = images.clip(img_test, 0, 100, device_w, 250);
    log("开始识别");
    //console.time("OCR识别结束");
    let begin=new Date();
    let test_txt = paddle_ocr_api(img_test);
    //console.timeEnd("OCR识别结束");
    let end=new Date();
    let test_time = end-begin;
    fInfo("OCR识别结束:"+test_time+"ms");
    if (test_time>10000) {
      fError("OCR识别过慢(>10s)，建议更换Pro版脚本选择第三方OCR");
      sleep(3000);
      return true;
    } else {
      fInfo("OCR功能正常");
      img_test.recycle();
      return true;
    }
  }
  catch (e) {
    fError(e+ "：ocr功能异常，退出脚本");
    exit();
    return false;
  }
}

// 强行退出应用名称
function exit_app(name) {
  // fClear();
  fInfo("尝试结束"+name+"APP");
  var packageName = getPackageName(name);
  if(!packageName){
    if(getAppName(name)){
      packageName = name;
    }else{
      return false;
    }
  }
	log("打开应用设置界面");
  app.openAppSetting(packageName);
  var appName = app.getAppName(packageName);
  //log(appName);
  log("等待加载界面")
  //textMatches(/应用信息|应用详情/).findOne(5000);
  text(appName).findOne(5000);
  sleep(1500);
  log("查找结束按钮")
  //let stop = textMatches(/(^强行.*|.*停止$|^结束.*)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).findOne();
  let stop = textMatches(/(强.停止$|.*停止$|结束运行|停止运行|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp])/).findOne();
  log("stop:", stop.enabled())
  if (stop.enabled()) {
    //log("click:", stop.click());
    real_click(stop);
    sleep(1000);
    log("等待确认弹框")
    //let sure = textMatches(/(确定|^强行.*|.*停止$)/).packageNameMatches(/.*settings.*|.*securitycenter.*/).clickable().findOne();
    let sure = textMatches(/(确定|.*停止.*|[Ff][Oo][Rr][Cc][Ee] [Ss][Tt][Oo][Pp]|O[Kk])/).clickable().findOne(1500);
    if (!sure) {
      fInfo(appName + "应用已关闭");
      back();
      return false;
    }
    log("sure click:", sure.click());
    fInfo(appName + "应用已被关闭");
    sleep(1000);
    back();
  } else {
    fInfo(appName + "应用不能被正常关闭或不在后台运行");
    back();
  }
  return true;
}

function refind_jifen() {
  className("android.webkit.WebView").scrollable().findOne().scrollForward();
  let jifen_obj = className("android.widget.ListView").depth(21).rowCount(14).findOne();
  return jifen_obj
}

function winReshow() {
  for (i=0;i<4;i++) {
    recents();
    sleep(1000);
  }
}

function noverify() {
  let noverify_thread = threads.start(function() {
    //在新线程执行的代码
    while (true) {
      textContains("访问异常").waitFor();
      fInfo("检测到滑动验证");
      var bound = idContains("nc_1_n1t").findOne().bounds();
      var hua_bound = text("向右滑动验证").findOne().bounds();
      var x_start = bound.centerX();
      var dx = x_start - hua_bound.left;
      var x_end = hua_bound.right - dx;
      var x_mid = (x_end-x_start)*random(5,8)/10 + x_start;
      var back_x = (x_end-x_start)*random(2,3)/10;
      var y_start = random(bound.top, bound.bottom);
      var y_end = random(bound.top, bound.bottom);
      log("y_start:", y_start, "x_start:", x_start, "x_mid:", x_mid, "x_end:", x_end);
      x_start = random(x_start-7, x_start);
      x_end = random(x_end, x_end+10);
//       sleep(600);
//       press(x_start, y_start, 200);
//       sleep(200);
      gesture(random(800, 850), [x_start, y_start], [x_mid, y_end], [x_mid-back_x, y_start], [x_end, y_end]);
      //swipe(x_start, y_start, x_end, y_end, random(900,1000));
      sleep(500);
      if (textContains("刷新").exists()) {
        click("刷新");
        continue;
      }
      if (textContains("网络开小差").exists()) {
        click("确定");
        continue;
      }
      fInfo("已完成滑动验证，若滑动失败请在Pro版配置中调整滑动时间");
      sleep(1000);
      fClear();
    }
  });
  return noverify_thread;
}
// 更新内容弹窗
// function gengxin_show() {
//   var dlg = dialogs.build({
//     title: engine_version + "版更新内容", 
//     content: "请授予hamibot悬浮窗(显示在其他应用上层)权限\n更新只答四人赛版本，可以市场搜索 对战_test,运行测试后反馈给我",
//     positive: "确定", checkBoxPrompt: '不再提示',
//   }).show();
//   while (!dlg.isShowing()) {}
//   log("dialog showing");
//   while (dlg.isShowing()) {sleep(500);}
//   return dlg.promptCheckBoxChecked;
// }

// 显示一个对象的所有方法，不知道ocr的返回对象有啥方法
function displayProp(obj){    
    var names="";
    for(var name in obj){
       names+=name+": "+obj[name]+", ";
    }
    log(names);
}

/*******************悬浮窗*******************/
function fInit() {
  // ScrollView下只能有一个子布局
  var w = floaty.rawWindow(
    <card cardCornerRadius='8dp' alpha="0.8">
      <vertical>
        <horizontal bg='#FF000000' padding='10 5'>
        <text id='version' textColor="#FFFFFF" textSize="18dip">天天向上</text>
        <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right"></text>
        </horizontal>
        <ScrollView>
          <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'></vertical>
        </ScrollView>
      </vertical>
    	<relative  gravity="right|bottom">
    		<text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'></text>
    	</relative>
    </card>
  );
  ui.run(function() {
    w.title.setFocusable(true);
    w.version.setText("天天向上"+newest_version);
  });
  w.setSize(720, -2);
  w.setPosition(10, 10);
  w.setTouchable(false);
  return w;
}

function fSet(id, txt) {
  ui.run(function() {
    w.findView(id).setText(txt);
  });
}

function fInfo(str) {
  ui.run(function() {
    let textView = ui.inflate(
      <text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'></text>,
      w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fError(str) {
  ui.run(function() {
    let textView = ui.inflate(
      <text id="error" maxLines="2" textColor="#FF0000" textSize="15dip" padding='5 0'></text>,
      w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.error(str);
}

function fTips(str) {
  ui.run(function() {
    let textView = ui.inflate(
      <text id="tips" maxLines="2" textColor="#FFFF00" textSize="15dip" padding='5 0'></text>,
      w.container);
    textView.setText(str.toString());
    w.container.addView(textView);
  });
  console.info(str);
}

function fClear() {
  ui.run(function() {
    w.container.removeAllViews();
  });
}

function fRefocus() {
  threads.start(function() {
    ui.run(function() {
      w.requestFocus();
      w.title.requestFocus();
      ui.post(function() {
        w.title.clearFocus();
        w.disableFocus();
      }, 200);
    });
  });
  sleep(500);
}

/*******************主程序部分*******************/
/********获取用户姓名并读取本地数据*********/
fClear();
text("我的").findOne().click();
var name = id("my_display_name").findOne().text();
var storage_user = storages.create('songgedodo:'+name);
var meizhou_dao = storage_user.get('meizhou_dao', false);
var zhuanxiang_dao = storage_user.get('zhuanxiang_dao', false);
var dingyue_dao = storage_user.get('dingyue_dao', false);
var jifen_map = {"评论":10,"视频":2,"文章":1,"每日":4,"每周":13,"专项":5,"挑战":6,"四人":7,"双人":8,
                "订阅":9,"本地":11}
fSet("username", name);

log(name, meizhou_dao, zhuanxiang_dao, dingyue_dao);
back();
ran_sleep();

/********进入积分界面*********/
// 点击积分
id("comm_head_xuexi_score").findOne().click();
// 等待"登录"项目加载
// className("android.view.View").depth(24).text("登录").waitFor();
text("登录").waitFor();
// 往下滑一段加载
className("android.webkit.WebView").depth(18).findOne().scrollForward();
// jifen_list第一层child[0-14]为每一项，第二层child{0:项目名称; 1:积分规则; 2:已获分数; 3:跳转按钮}
var jifen_list = refind_jifen();

// 中断地理位置弹窗检测
if (nolocate_thread.isAlive()) {
  nolocate_thread.interrupt();
  fInfo("终止位置权限弹窗检测");
}
// 中断更新弹窗检测
if (noupdate_thread.isAlive()) {
  noupdate_thread.interrupt();
  fInfo("终止更新弹窗检测");
}
// 中断消息通知弹窗检测
if (nonotice_thread.isAlive()) {
  nonotice_thread.interrupt();
  fInfo("终止消息通知检测");
}

// 先判断评论分享
//if (jifen_list.child(11).child(2).text().match(/\d+/)[0] == "0" || jifen_list.child(12).child(2).text().match(/\d+/)[0] == "0") {
if (jifen_list.child(jifen_map["评论"]).child(2).text().match(/\d+/)[0] == "0") {
  toastLog("开始评论");
  do_pinglun();
  jifen_list = refind_jifen();
}
if (jifen_list.child(jifen_map["视频"]).child(3).text() != "已完成") { // 视听学习
  console.verbose("无障碍服务："+auto.service);
  toastLog("开始视听次数");
  do_shipin();
  jifen_list = refind_jifen();
}
if (jifen_list.child(jifen_map["文章"]).child(3).text() != "已完成") { // 文章
  console.verbose("无障碍服务："+auto.service);
  toastLog("开始文章次数与时长");
	do_wenzhang();
  jifen_list = refind_jifen();
}
if (jifen_list.child(jifen_map["每日"]).child(3).text() != "已完成") { // 每日答题
  toastLog("每日答题开始");
  do_meiri();
  jifen_list = refind_jifen();
}
var meizhou_right = 1;
if (jifen_list.child(jifen_map["每周"]).child(2).text().match(/\d+/)[0] == "0") { // 每周答题
  toastLog("每周答题开始");
  var meizhou_right = do_meizhou();
  while (!meizhou_right) {meizhou_right = do_meizhou();}
  jifen_list = refind_jifen();
}
var zhuanxiang_right = 1;
if (jifen_list.child(jifen_map["专项"]).child(2).text().match(/\d+/)[0] == "0") { // 专项答题
  toastLog("专项答题开始");
  var zhuanxiang_right = do_zhuanxiang();
  jifen_list = refind_jifen();
}
if (jifen_list.child(jifen_map["挑战"]).child(3).text() != "已完成") { // 挑战答题
  toastLog("挑战答题开始");
  do_tiaozhan();
  jifen_list = refind_jifen();
}
// 四人赛前先ocr功能测试
var test_result = ocr_test();
if (test_result) {
  console.verbose("无障碍服务："+auto.service);
  jifen_list = refind_jifen();
  if (parseInt(jifen_list.child(jifen_map["四人"]).child(2).text().match(/\d+/)[0]) <= 3) { // 四人两次
    toastLog("四人赛开始");
    do_duizhan1(4);
    do_duizhan1(4);
    jifen_list = refind_jifen();
  }
  if (jifen_list.child(jifen_map["双人"]).child(2).text().match(/\d+/)[0] == "0") { // 双人对战
    toastLog("双人对战开始");
    do_duizhan1(2);
    jifen_list = refind_jifen();
  }
}
var dingyue_right = 1;
if (jifen_list.child(jifen_map["订阅"]).child(2).text().match(/\d+/)[0] == "0") { // 订阅
  toastLog("订阅开始");
  var dingyue_right = do_dingyue();
  jifen_list = refind_jifen();
}

if (noverify_thread.isAlive()) {
  noverify_thread.interrupt();
}
fInfo("已全部结束");
if (!meizhou_right) {
  fError("每周答题可能由于识别错误、包含视频题而不能满分，请手动作答");
}
if (!zhuanxiang_right) {
  fError("专项答题可能由于填空识别错误而不能满分，请手动作答");
}
if (!dingyue_right) {
  fError("未能识别出订阅界面，订阅不支持学习强国V2.33.0以上版本");
}
back();
// 取消屏幕常亮
fInfo("取消屏幕常亮");
device.cancelKeepingAwake();
// exit_app("学习强国");
// 震动提示
device.vibrate(500);
fInfo("十秒后关闭悬浮窗");
sleep(10000);
console.hide();
home();
exit();
