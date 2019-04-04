var sp = sp || {};

var spineSceneIdx = -1;
var SpineTestScene = TestScene.extend({
    runThisTest:function () {
        var layer = SpineTestScene.nextSpineTestLayer();
        this.addChild(layer);
        director.runScene(this);
    }
});

SpineTestScene.nextSpineTestLayer = function() {
    spineSceneIdx++;
    var layers = SpineTestScene.testLayers;
    spineSceneIdx = spineSceneIdx % layers.length;
    return new layers[spineSceneIdx](spineSceneIdx);
};

SpineTestScene.backSpineTestLayer = function() {
    spineSceneIdx--;
    var layers = SpineTestScene.testLayers;
    if(spineSceneIdx < 0)
        spineSceneIdx = layers.length - 1;
    return new layers[spineSceneIdx](spineSceneIdx);
};

SpineTestScene.restartSpineTestLayer = function(){
    return new SpineTestScene.testLayers[spineSceneIdx](spineSceneIdx);
};

var SpineTestLayer = BaseTestLayer.extend({
    onRestartCallback: function(sender){
        var s = new SpineTestScene();
        s.addChild(SpineTestScene.restartSpineTestLayer());
        cc.director.runScene(s);
    },

    onNextCallback: function(sender){
        var s = new SpineTestScene();
        s.addChild(SpineTestScene.nextSpineTestLayer());
        cc.director.runScene(s);
    },

    onBackCallback: function(sender){
        var s = new SpineTestScene();
        s.addChild(SpineTestScene.backSpineTestLayer());
        cc.director.runScene(s);
    }
});

var customSkeletonAnimation = sp.SkeletonAnimation.extend({
    ctor:function () {
        this._super.apply(this, arguments);
    }
});

var SpineTestPerformanceLayer = SpineTestLayer.extend({
    ctor: function(){
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));

        // number
        var label = new cc.LabelTTF("", "Arial", 48);
        this.addChild(label, 100);
        label.x = winSize.width / 2;
        label.y = winSize.height / 2;
        this.number = label;
        this.number.visible = true;

        this.maxX = cc.winSize.width;
        this.maxY = cc.winSize.height;
        this.minX = 0;
        this.minY = 0;
        this.handleCount = 5;
        this.skeArr = [];
        this.gcTimes = 5;
        this.tplArr = [
            {
                hero: "3/hero_003",
                effect: "3/effect_003"
            },
            {
                hero: "9/hero_009",
                effect: "9/effect_009"
            },
            {
                hero: "29/hero_029",
                effect: "29/effect_029"
            },
            {
                hero: "6/hero_006",
                effect: "6/effect_006"
            },
            {
                hero: "31/hero_031",
                effect: "31/effect_031"
            },
            {
                hero: "1/hero_001",
                effect: "1/effect_001"
            }
        ]

        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                self.add();
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
    },
    title: function(){
        return "Spine Test";
    },
    subtitle: function() {
        return "Performance Test for Spine";
    },
    add: function() {
        if (this.skeArr.length >= 1000) return;
        for (var i = 0; i < this.handleCount; i++) {
            let index = i % this.tplArr.length;
            let tpl = this.tplArr[index];
            if (!tpl) return;

            let heroJ = "Bunnymark/uio/"+tpl.hero+".json";
            let heroA = "Bunnymark/uio/"+tpl.hero+".atlas";
            let efectJ = "Bunnymark/uio/"+tpl.effect+".json";
            let effectA = "Bunnymark/uio/"+tpl.effect+".atlas";

            let x = (Math.random() - 0.5) * 2 * this.maxX;
            let y = (Math.random() - 0.5) * 2 * this.maxY;
            let node = new cc.Node();
            node.setPosition(cc.p(x, y));
            this.addChild(node);
            var skeletonNode = sp.SkeletonAnimation.createWithJsonFile(heroJ, heroA, 1.5);
            skeletonNode.setAnimation(0, "sk_2", true);
            skeletonNode.setSkin("default");
            skeletonNode.setScale(1);
            node.addChild(skeletonNode);
            var effectNode = sp.SkeletonAnimation.createWithJsonFile(efectJ, effectA, 1.5);
            effectNode.setAnimation(0, "sk_2", true);
            effectNode.setSkin("default");
            effectNode.setScale(1);

            node.addChild(effectNode);
            this.skeArr.push(node);
            if (this.skeArr.length >= 1000) break;
        }
        this.number.string = this.skeArr.length;
    },

    del: function() {
        if (this.skeArr.length == 0) return;
        for (var i = 0; i < this.handleCount; i++) {
            let newNode = this.skeArr.pop();
            if (!newNode) break;
            newNode.destroy();
        }
        this.number.string = this.skeArr.length;
        this.gcTimes = 5;
    },

    update: function(dt) {
        if (this.gcTimes <= 0) return;
        this.gcTimes--;
        cc.sys.garbageCollect();
    }
});

SpineTestScene.testLayers = [
    SpineTestPerformanceLayer,
];
