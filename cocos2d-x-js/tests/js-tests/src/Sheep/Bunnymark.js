var bunnys = [];
var currentFrame = null;
var bunnyType = 0;
var gravity = 0.5;

var maxX = 0;
var minX = 0;
var maxY = 0;
var minY = 0;

var isAdding = false;
var count = 0;
var number;

var amount = 1000;
var deleteCount = 1000;

var checking = false;
var totalDt = 0;
var frames = 0;
var startTime = 0;

var spriteFrameCache = cc.spriteFrameCache;

function beforeUpdate () {
    if (checking) {
        startTime = Date.now();
    }
}

function afterDraw () {
    if (checking) {
        if (startTime === 0) {
            return;
        }
        var endTime = Date.now();
        totalDt += endTime - startTime;
        frames++;
    }
}

var spriteTestIdx = -1;

var SpriteTestScene = TestScene.extend({
    runThisTest:function (num) {
        spriteTestIdx = (num || num == 0) ? (num - 1) : -1;
        var layer = nextSpriteTest();
        this.addChild(layer);

        director.runScene(this);
    }
});

var Bunnymark = BaseTestLayer.extend({
    _title:"Bunnymark",
    _subtitle:"",

    ctor:function () {
        if (arguments.length === 0) {
            this._super(cc.color(0, 0, 0, 255), cc.color(98, 99, 117, 255));
        } else {
            this._super.apply(this, arguments);
        }

        var winSize = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(s_pathSheepPlist);

        this.frames = [
            s_pathSheep,
            s_pathSheep,
            s_pathSheep,
            s_pathSheep
        ];

        this.levelCount = 5;

        // number
        var label = new cc.LabelTTF("", "Arial", 48);
        this.addChild(label, 100);
        label.x = winSize.width / 2;
        label.y = winSize.height / 2;

        count = 0;
        number = label;
        number.visible = true;

        maxX = winSize.width;
        maxY = winSize.height;
        minX = 0;
        minY = 0;

        for (var i = 0; i < this.levelCount; i++) {
            bunnys[i] = [];
        }
        currentFrame = this.frames[0];

        this.scheduleUpdate();

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                isAdding = true;
                return true;
            }.bind(this),
            onTouchEnded: function (touch, event) {
                isAdding = false;
                bunnyType++;
                bunnyType %= this.frames.length;
                currentFrame = this.frames[bunnyType];
            }.bind(this),
            onTouchCancelled: function(touch, event){
                isAdding = false;
            }.bind(this)
        });
        cc.eventManager.addListener(listener, this);
    },

    onRestartCallback:function (sender) {
        var s = new SpriteTestScene();
        s.addChild(restartSpriteTest());
        director.runScene(s);
    },

    onNextCallback:function (sender) {
        var s = new SpriteTestScene();
        s.addChild(nextSpriteTest());
        director.runScene(s);
    },

    onBackCallback:function (sender) {
        var s = new SpriteTestScene();
        s.addChild(previousSpriteTest());
        director.runScene(s);
    },

    // automation
    numberOfPendingTests:function () {
        return ( (arrayOfSpriteTest.length - 1) - spriteTestIdx );
    },

    getTestNumber:function () {
        return spriteTestIdx;
    },

    deleteBunny: function () {
        this.gcTimes = 5;

        var curDelCount = 0;
        for (var i = 0; i < this.levelCount; i++) 
        {
            var lbunnys = bunnys[i];
            for (var j = lbunnys.length - 1; j >= 0; j--) {
                var bunny = lbunnys[j];
                bunny.destroy();
                curDelCount ++;
                count--;
                lbunnys.pop();
                if (curDelCount === deleteCount) {
                    number.string = count;
                    return;
                }
            }
        }
        number.string = count;
    },

    add: function () {
        this.addOnce();
        this.scheduleOnce(this.check, 5);
    },

    check: function () {
        checking = true;
        totalDt = 0;
        frames = 0;
        startTime = 0;
        cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, beforeUpdate);
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, afterDraw);
        this.scheduleOnce(this.checkEnd, 3);
    },

    checkEnd: function () {
        checking = false;
        cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, beforeUpdate);
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, afterDraw);
        var dt = totalDt / frames;
        if (dt > 20) {
            number.string = "STOPPED !!! \nFINAL SCORE : " + count;
        }
        else {
            bunnyType++;
            bunnyType %= this.frames.length;
            currentFrame = this.frames[bunnyType];
            if (dt < 1) dt = 1;
            var extra = Math.floor(20 / dt);
            for (var i = 0; i < extra; i++) {
                this.addOnce();
            }
            this.add();
        }
    },

    addOne: function () {
        var bunny;
        bunny = new cc.Sprite(spriteFrameCache.getSpriteFrame("sheep_down_1.png"));
        bunny.speedX = Math.random() * 10;
        bunny.speedY = (Math.random() * 10) - 5;
        bunny.x = minX + 10;
        bunny.y = maxY * 0.7;
        bunny.anchorY = 1;
        //bunny.alpha = 0.3 + Math.random() * 0.7;
        bunnys.push(bunny);
        bunny.scale = 0.3;

        bunny.angle = 360 * (Math.random()*0.2 - 0.1);

        this.addChild(bunny, 99);
        count++;
        number.string = count;
    },

    addOnce: function () {
        if (count>= 30000) return;

        let amountPerLevel = Math.floor(amount / this.levelCount);
        let parent = this;
    
        var bunny, bunnysp, i;
        // Add block to break batch
        if (this.drawcallUp) {
            bunny = new cc.Sprite(s_pathBlock, cc.rect(0, 0, 248, 336));
            bunny.setPosition(maxX, maxY);
            parent.addChild(bunny, 99);
        }
        // Add bunnys
        for (var i = 0; i < this.levelCount; i++) 
        {
            var lbunnys = bunnys[i];
            for (var j = 0; j < amountPerLevel; j++) {
                bunny = new cc.Sprite(spriteFrameCache.getSpriteFrame("sheep_down_1.png"));
                bunny.speedX = Math.random() * 10;
                bunny.speedY = (Math.random() * 10) - 5;
                bunny.setPosition(minX + 10, maxY * 0.7);
                bunny.anchorY = 1;
                //bunny.alpha = 0.3 + Math.random() * 0.7;
                lbunnys.push(bunny);
                bunny.scale = 0.3;
                bunny.angle = 360 * (Math.random()*0.2 - 0.1);

                parent.addChild(bunny, 99);
                count++;
                if (count>= 30000) break;
            }
            if (count>= 30000) break;
        }
        number.string = count;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (isAdding) {
            this.addOnce();
        }

        // var start = new Date().getTime();
        for (var i = 0; i < this.levelCount; i++) 
        {
            var lbunnys = bunnys[i];
            for (var j = 0; j < lbunnys.length; j++)
            {
                var bunny = lbunnys[j];

                let speedX = bunny.speedX;
                let speedY = bunny.speedY;
                let x = bunny.x + speedX;
                let y = bunny.y - speedY;
                speedY += gravity;

                if (x > maxX) {
                    speedX = -1 * speedX;
                    x = maxX;
                } else if (x < minX) {
                    speedX = -1 * speedX;
                    x = minX;
                }

                if (y < minY) {
                    speedY = -0.85 * speedY;
                    y = minY;
                    if (Math.random() > 0.5) {
                        speedY = speedY - Math.random() * 6.0;
                    }
                } else if (y > maxY) {
                    speedY = 0.0;
                    y = maxY;
                }
                bunny.speedX = speedX;
                bunny.speedY = speedY;
                bunny.setPosition(x, y);
            }
        }

        if (this.gcTimes <= 0) return;
        this.gcTimes--;
        cc.sys.garbageCollect();

        // var end = new Date().getTime();
        // console.log('Update / Delta Time =', end-start, '/', dt*1000, '=', ((end-start)/(dt*1000)).toFixed(2));
    },
});

var arrayOfSpriteTest = [
	Bunnymark
];

var nextSpriteTest = function () {
    spriteTestIdx++;
    spriteTestIdx = spriteTestIdx % arrayOfSpriteTest.length;

    if(window.sideIndexBar){
        spriteTestIdx = window.sideIndexBar.changeTest(spriteTestIdx, 36);
    }

    return new arrayOfSpriteTest[spriteTestIdx ]();
};

var previousSpriteTest = function () {
    spriteTestIdx--;
    if (spriteTestIdx < 0)
        spriteTestIdx += arrayOfSpriteTest.length;

    return new arrayOfSpriteTest[spriteTestIdx ]();
};

var restartSpriteTest = function () {
    return new arrayOfSpriteTest[spriteTestIdx ]();
};


