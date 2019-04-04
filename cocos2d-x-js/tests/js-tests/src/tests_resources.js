/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// Resources prefix
var s_resprefix = "";

var ccbjs = "";
// js-test use cpptest resource in debug mode , and in the release mode, console will copy the resource into the res dir
// so the respath will modify to res,
if (!cc.sys.isNative)
{
    if (cc.game.config && cc.game.config[cc.game.CONFIG_KEY.engineDir] !== "frameworks/cocos2d-html5") {
        ccbjs = "../../js-tests/resjs/";
    }
    else
    {
        ccbjs = "";
    }

}

var s_pathSheep = "Bunnymark/sheep.png";
var s_pathSheepPlist = "Bunnymark/sheep.plist";
var s_pathBlock = "Bunnymark/block.png";

var s_menuItem = "Images/menuitemsprite.png";
var s_pathClose = "Images/close.png";
var s_pathB1 = "Images/b1.png";
var s_pathB2 = "Images/b2.png";
var s_pathR1 = "Images/r1.png";
var s_pathR2 = "Images/r2.png";
var s_pathF1 = "Images/f1.png";
var s_pathF2 = "Images/f2.png";

var g_resources = [
    //global
    s_menuItem,
    s_pathB1,
    s_pathB2,
    s_pathR1,
    s_pathR2,
    s_pathF1,
    s_pathF2,
    s_pathClose,

    s_pathSheepPlist,
    s_pathSheep,
    s_pathBlock
];

var g_spine = [
    "Bunnymark/uio/1/hero_001.atlas",
    "Bunnymark/uio/1/hero_001.json",
    "Bunnymark/uio/1/effect_001.atlas",
    "Bunnymark/uio/1/effect_001.json",
    "Bunnymark/uio/3/hero_003.atlas",
    "Bunnymark/uio/3/hero_003.json",
    "Bunnymark/uio/3/effect_003.atlas",
    "Bunnymark/uio/3/effect_003.json",
    "Bunnymark/uio/6/hero_006.atlas",
    "Bunnymark/uio/6/hero_006.json",
    "Bunnymark/uio/6/effect_006.atlas",
    "Bunnymark/uio/6/effect_006.json",
    "Bunnymark/uio/9/hero_009.atlas",
    "Bunnymark/uio/9/hero_009.json",
    "Bunnymark/uio/9/effect_009.atlas",
    "Bunnymark/uio/9/effect_009.json",
    "Bunnymark/uio/29/hero_029.atlas",
    "Bunnymark/uio/29/hero_029.json",
    "Bunnymark/uio/29/effect_029.atlas",
    "Bunnymark/uio/29/effect_029.json",
    "Bunnymark/uio/31/hero_031.atlas",
    "Bunnymark/uio/31/hero_031.json",
    "Bunnymark/uio/31/effect_031.atlas",
    "Bunnymark/uio/31/effect_031.json"
];

if (!cc.sys.isNative) {
    var res = res || {};
    res.CCControlColourPickerSpriteSheet_plist = "extensions/CCControlColourPickerSpriteSheet.plist";
    res.CCControlColourPickerSpriteSheet_png = "extensions/CCControlColourPickerSpriteSheet.png";
}
