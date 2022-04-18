require('../model/connection');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const Contents = mongoose.model('contents');
const NavOptions = mongoose.model('navOptions');
const ContentList = mongoose.model('contentList');
const HomeCenterText = mongoose.model('homeCenterText');
const MotionSpeed = mongoose.model('motionSpeed');
const ImageSize = mongoose.model('imageSize');
const SpaceAmounts = mongoose.model('spaceAmounts');
const Item = mongoose.model('item');
const NewOffer = mongoose.model('newOffer');
const SliderWidth = mongoose.model('sliderWidth');
const SliderHeight = mongoose.model('sliderHeight');
const CartItem = mongoose.model('cartItem');
const Client = mongoose.model('client');
const NewAccount = mongoose.model('account');
const Message = mongoose.model('message');

router.get('/', function(req, res){
    fs.readdir('homePics', function(err, homePicsFiles){
        Contents.find(function(err, ContentsData){
            NavOptions.find(function(err, NavOptionsData){
                ContentList.find(function(err, ContentListData){
                    HomeCenterText.find(function(err, HomeCenterTextData){
                        MotionSpeed.find(function(err, MotionSpeedData){
                            ImageSize.find(function(err, ImageSizeData){
                                SpaceAmounts.find(function(err, SpaceAmountsData){
                                    fs.readdir('section1Images', function(err, section1ImagesFiles){
                                        SliderWidth.find(function(err, SliderWidthData){
                                            NewOffer.find(function(err, NewOfferData){
                                                SliderHeight.find(function(err, sliderHeightData){
                                                    NewAccount.find(function(err, NewAccountData){
                                                        res.render('./layouts/index', {
                                                            homePicAllFileLength: homePicsFiles.length,
                                                            content: ContentsData,
                                                            navOptionList: NavOptionsData,
                                                            NewContentList: ContentListData,
                                                            homeTextData: HomeCenterTextData,
                                                            motionSpeedValue: MotionSpeedData,
                                                            imageSizeValue: ImageSizeData,
                                                            spaceValue: SpaceAmountsData,
                                                            section1ImagesDataLngth: section1ImagesFiles.length,
                                                            sliderWidthData: SliderWidthData,
                                                            NewOfferData: NewOfferData,
                                                            sliderHeightData: sliderHeightData,
                                                            NewAccountData: NewAccountData
                                                        });
                                                    }).lean();
                                                }).lean();
                                            }).lean();
                                        }).lean();
                                    });
                                }).lean();
                            }).lean();
                        }).lean();
                    }).lean();
                }).lean();
            }).lean();
        }).lean();
    });
});

router.get('/manage', function(req, res){
    fs.readdir('homePics', function(err, homePicsFiles){
        Contents.find(function(err, ContentsData){
            NavOptions.find(function(err, NavOptionsData){
                ContentList.find(function(err, ContentListData){
                    HomeCenterText.find(function(err, HomeCenterTextData){
                        MotionSpeed.find(function(err, MotionSpeedData){
                            ImageSize.find(function(err, ImageSizeData){
                                SpaceAmounts.find(function(err, SpaceAmountsData){
                                    fs.readdir('section1Images', function(err, section1ImagesFiles){
                                        Item.find(function(err, ItemData){
                                            SliderWidth.find(function(err, SliderWidthData){
                                                NewOffer.find(function(err, NewOfferData){
                                                    SliderHeight.find(function(err, sliderHeightData){
                                                        res.render('./layouts/manage', {
                                                            homePicAllFileLength: homePicsFiles.length,
                                                            content: ContentsData,
                                                            navOptionList: NavOptionsData,
                                                            NewContentList: ContentListData,
                                                            homeTextData: HomeCenterTextData,
                                                            motionSpeedValue: MotionSpeedData,
                                                            imageSizeValue: ImageSizeData,
                                                            spaceValue: SpaceAmountsData,
                                                            section1ImagesDataLngth: section1ImagesFiles.length,
                                                            ItemDataList: ItemData,
                                                            sliderWidthData: SliderWidthData,
                                                            NewOfferData: NewOfferData,
                                                            sliderHeightData: sliderHeightData
                                                        });
                                                    }).lean();
                                                }).lean();
                                            }).lean();
                                        }).lean();
                                    });
                                }).lean();
                            }).lean();
                        }).lean();
                    }).lean();
                }).lean();
            }).lean();
        }).lean();
    });
});

router.post('/navOptions', function(req, res){
    if(req.body._id == ""){
        var navOptions = new NavOptions();
        navOptions.optionName = req.body.optionName;
        navOptions.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        NavOptions.findByIdAndUpdate({_id: req.body._id}, req.body, {New: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/deleteNav/:id', function(req, res){
    NavOptions.findByIdAndRemove(req.params.id, function(){
        res.redirect('/manage');
    });
});

router.get('/products', function(req, res){
    Item.find(function(err, ItemData){
        CartItem.find(function(err, cartItemListData){
            res.render('./layouts/products',{
                ItemDataList: ItemData,
                cartItemList: cartItemListData
            });
        }).lean();
    }).lean();
});

router.post('/contentName', function(req, res){
    if(req.body._id == ""){
        var contents = new Contents();
        contents.contentName = req.body.contentName;
        contents.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        Contents.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.post('/addHomePic', function(req, res){
    var file = req.files.file;
    fs.readdir('homePics', function(err, files){
        file.mv('homePics/homePic' + files.length + '.jpg', function(){});
        fs.writeFileSync('homePicsText/homePicText' + files.length + '.txt', 'Lorem ipsum dolor sit amet consectetur', function(){});
        res.redirect('/manage');
    });
});

router.get('/deleteHomePic/:id/:id2', function(req, res){
    fs.unlinkSync('homePics/homePic' + req.params.id + '.jpg', function(){});
    fs.unlinkSync('homePicsText/homePicText' + req.params.id + '.txt', function(){});
    if(req.params.id != req.params.id2){
        fs.renameSync('homePics/homePic' + req.params.id2 + '.jpg', 'homePics/homePic' + req.params.id + '.jpg');
        fs.renameSync('homePicsText/homePicText' + req.params.id2 + '.txt', 'homePicsText/homePicText' + req.params.id + '.txt');
    }
    res.redirect('/manage');
});

router.get('/itemInformationChange/:id/:text', function(req, res){
    fs.writeFileSync('homePicsText/homePicText' + req.params.id + '.txt', req.params.text, function(){});
    res.redirect('/manage');
});

router.post('/newwHomeText', function(req, res){
    if(req.body._id == ""){
        var homeCenterText = new HomeCenterText();
        homeCenterText.first = req.body.first;
        homeCenterText.second = req.body.second;
        homeCenterText.third = req.body.third;
        homeCenterText.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        HomeCenterText.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.post('/addSection1Pic', function(req, res){
    var file = req.files.file;
    fs.readdir('section1Images', function(err, files){
        file.mv('section1Images/' + files.length + '.jpg', function(){});
        res.redirect('/manage');
    });
});

router.get('/eleteSection1Image/:id', function(req, res){
    fs.unlinkSync('section1Images/' + req.params.id + '.jpg', function(){});
    fs.readdir('section1Images', function(err, files){
        if(req.params.id != files.length)
        fs.renameSync('section1Images/' + files.length + '.jpg', 'section1Images/' + req.params.id + '.jpg');
    });
    res.redirect('/manage');
});

router.get('/homePicSpeed/:id/:value', function(req, res){
    if(req.params.id == "1"){
        var motionSpeed = new MotionSpeed();
        motionSpeed.rangeVal = req.params.value;
        motionSpeed.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        MotionSpeed.findByIdAndUpdate({_id: req.params.id}, {rangeVal: req.params.value}, {new: true}, function(){
            res.redirect('/manage');
        }); 
    }
});

router.get('/section1Size/:id/:value', function(req, res){
    if(req.params.id == "1"){
        var imageSize = new ImageSize();
        imageSize.sizeValue = req.params.value;
        imageSize.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        ImageSize.findByIdAndUpdate({_id: req.params.id}, {sizeValue: req.params.value}, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/section1Space/:id/:value', function(req, res){
    if(req.params.id == "1"){
        var spaceAmounts = new SpaceAmounts();
        spaceAmounts.spacevalue = req.params.value;
        spaceAmounts.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        SpaceAmounts.findByIdAndUpdate({_id: req.params.id}, {spacevalue: req.params.value}, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.post('/addNewItem', function(req, res){
    if(req.body._id == ""){
        var newItem = new Item();
        newItem.itemCategory = req.body.itemCategory;
        newItem.itemName = req.body.itemName;
        newItem.itemPrise = req.body.itemPrise;
        newItem.itemtext = req.body.itemtext;
        newItem.itemUniqueId = req.body.itemUniqueId;
        newItem.fewLeft = req.body.fewLeft;
        newItem.itemOldPrise = req.body.itemOldPrise;
        newItem.itemNewPrise = req.body.itemNewPrise;
        newItem.itemSaleAmount = req.body.itemSaleAmount;
        newItem.itemPromoCode = req.body.itemPromoCode;
        newItem.save(function(){
            var file = req.files.file;
            file.mv('ItemImages/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.jpg', function(){});
            fs.writeFileSync('views/layouts/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.html', '<!DOCTYPE html>'+'\n'+'<html>'+'\n'+'    <head>'+'\n'+'        <title>Mustafa</title>'+'\n'+'        <meta charset="UTF-8">'+'\n'+'    </head>'+'\n'+'    <body>'+'\n'+'        <div id="itemInfo">'+'\n'+'            <div id="imageWrapper">'+'\n'+'                <img src="../ItemImages/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.jpg' + '">'+'\n'+'            </div>'+'\n'+'            <div id="infoWrapper">'+'\n'+'                <h1>' + '<del>' + req.body.itemOldPrise + '</del>' + req.body.itemPrise + '$</h1>'+'\n'+'                <p>' + req.body.itemtext + '</p>'+'\n'+'                <input type="number" min=1 value=1 id="nmbrOfItms">'+'\n'+'                <b>Add to cart</b>'+'\n'+'            </div>'+'\n'+'        </div>'+'\n'+'    </body>'+'\n'+'    <style>'+'\n'+'        @media only screen and (max-width: 1024px){'+'\n'+'            body #itemInfo{'+'\n'+'                flex-direction: column;'+'\n'+'            }'+'\n'+'            body #itemInfo > div{'+'\n'+'                width: 100%;'+'\n'+'            }'+'\n'+'            body #infoWrapper > b{'+'\n'+'                font-size: 50px;'+'\n'+'            }'+'\n'+'        }'+'\n'+'        *{'+'\n'+'            margin: 0;'+'\n'+'            padding: 0;'+'\n'+'            font-family: Arial;'+'\n'+'            font-size: 2.5vh;'+'\n'+'        }'+'\n'+'        body{'+'\n'+'            background: hsl(60, 12%, 25%);'+'\n'+'            color: #fff;'+'\n'+'        }'+'\n'+'        #itemInfo{'+'\n'+'            display: flex;'+'\n'+'            align-items: center;'+'\n'+'        }'+'\n'+'        #itemInfo > div{'+'\n'+'            width: 50%;'+'\n'+'            height: 100%;'+'\n'+'            padding: 30px 0;'+'\n'+'        }'+'\n'+'        #infoWrapper{'+'\n'+'            display: flex;'+'\n'+'            flex-direction: column;'+'\n'+'            text-align: center;'+'\n'+'            align-items: center;'+'\n'+'            gap: 50px;'+'\n'+'        }'+'\n'+'        #infoWrapper > input{'+'\n'+'            padding: 30px 0;'+'\n'+'            width: 100px;'+'\n'+'            text-align: center;'+'\n'+'        }'+'\n'+'        #infoWrapper > p{'+'\n'+'            width: 80%;'+'\n'+'        }'+'\n'+'        #infoWrapper > h1{'+'\n'+'            font-size: 7vh;'+'\n'+'        }'+'\n'+'        #infoWrapper > b{'+'\n'+'            background: #000;'+'\n'+'            padding: 30px 70px;'+'\n'+'            cursor: pointer;'+'\n'+'        }'+'\n'+'        #imageWrapper > img{'+'\n'+'            width: 90%;'+'\n'+'            height: 90%;' + '\n' + '            margin: 5%;'+'\n'+'            object-fit: cover;'+'\n'+'        }'+'\n'+'    </style>'+'\n'+'    <script>'+'\n'+'        document.addEventListener("click", function(evt){'+'\n'+'            if(evt.target.tagName == "B"){'+'\n'+'                infoWrapper.style.pointerEvents = "none";'+'\n'+'                window.location.href = "'+'/addToCart/'+req.body.itemCategory + req.body.itemName + req.body.itemUniqueId +'/" + '+'nmbrOfItms.value'+' + "/'+req.body.itemPrise+'/"'+' + "'+req.body.itemtext+'/"'+' + '+req.body.itemPromoCode+';'+'\n'+'                if(localStorage.MustafaAltaiePage == undefined) localStorage.MustafaAltaiePage = "";'+'\n'+'                localStorage.MustafaAltaiePage += "'+req.body.itemCategory + req.body.itemName + req.body.itemUniqueId+','+'";'+'\n'+'            }'+'\n'+'        });'+'\n'+'\n'+'        var prise = '+req.body.itemPrise+';'+'\n'+'\n'+'        document.addEventListener("change", function(evt){'+'\n'+'            if(evt.target.tagName == "INPUT"){'+'\n'+'                document.getElementsByTagName("h1")[0].innerHTML = prise * document.getElementsByTagName("input")[0].value + "$";'+'\n'+'            }'+'\n'+'        });'+'\n'+'    </script>'+'\n'+'</html>', 'utf-8');
            fs.writeFileSync('otherRouters/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.js', 'const express = require("express");' + '\n' + 'const router = express.Router();' + '\n' + 'router.get("/products/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '", function(req, res){' + '\n' + '    res.render("./layouts/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '");' + '\n' + '});' + '\n' + 'module.exports = router;', 'utf-8');
            res.redirect('/manage');
        });
    }
    else{
        Item.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            fs.unlinkSync('otherRouters/' + req.body.oldImage + '.js', function(){});
            fs.unlinkSync('views/layouts/' + req.body.oldImage + '.html', function(){});
            fs.writeFileSync('views/layouts/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.html', '<!DOCTYPE html>'+'\n'+'<html>'+'\n'+'    <head>'+'\n'+'        <title>Mustafa</title>'+'\n'+'        <meta charset="UTF-8">'+'\n'+'    </head>'+'\n'+'    <body>'+'\n'+'        <div id="itemInfo">'+'\n'+'            <div id="imageWrapper">'+'\n'+'                <img src="../ItemImages/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.jpg' + '">'+'\n'+'            </div>'+'\n'+'            <div id="infoWrapper">'+'\n'+'                <h1>' + '<del>' + req.body.itemOldPrise + '</del>' + req.body.itemPrise + '$</h1>'+'\n'+'                <p>' + req.body.itemtext + '</p>'+'\n'+'                <input type="number" min=1 value=1 id="nmbrOfItms">'+'\n'+'                <b>Add to cart</b>'+'\n'+'            </div>'+'\n'+'        </div>'+'\n'+'    </body>'+'\n'+'    <style>'+'\n'+'        @media only screen and (max-width: 1024px){'+'\n'+'            body #itemInfo{'+'\n'+'                flex-direction: column;'+'\n'+'            }'+'\n'+'            body #itemInfo > div{'+'\n'+'                width: 100%;'+'\n'+'            }'+'\n'+'            body #infoWrapper > b{'+'\n'+'                font-size: 50px;'+'\n'+'            }'+'\n'+'        }'+'\n'+'        *{'+'\n'+'            margin: 0;'+'\n'+'            padding: 0;'+'\n'+'            font-family: Arial;'+'\n'+'            font-size: 2.5vh;'+'\n'+'        }'+'\n'+'        body{'+'\n'+'            background: hsl(60, 12%, 25%);'+'\n'+'            color: #fff;'+'\n'+'        }'+'\n'+'        #itemInfo{'+'\n'+'            display: flex;'+'\n'+'            align-items: center;'+'\n'+'        }'+'\n'+'        #itemInfo > div{'+'\n'+'            width: 50%;'+'\n'+'            height: 100%;'+'\n'+'            padding: 30px 0;'+'\n'+'        }'+'\n'+'        #infoWrapper{'+'\n'+'            display: flex;'+'\n'+'            flex-direction: column;'+'\n'+'            text-align: center;'+'\n'+'            align-items: center;'+'\n'+'            gap: 50px;'+'\n'+'        }'+'\n'+'        #infoWrapper > input{'+'\n'+'            padding: 30px 0;'+'\n'+'            width: 100px;'+'\n'+'            text-align: center;'+'\n'+'        }'+'\n'+'        #infoWrapper > p{'+'\n'+'            width: 80%;'+'\n'+'        }'+'\n'+'        #infoWrapper > h1{'+'\n'+'            font-size: 7vh;'+'\n'+'        }'+'\n'+'        #infoWrapper > b{'+'\n'+'            background: #000;'+'\n'+'            padding: 30px 70px;'+'\n'+'            cursor: pointer;'+'\n'+'        }'+'\n'+'        #imageWrapper > img{'+'\n'+'            width: 90%;'+'\n'+'            height: 90%;' + '\n' + '            margin: 5%;'+'\n'+'            object-fit: cover;'+'\n'+'        }'+'\n'+'    </style>'+'\n'+'    <script>'+'\n'+'        document.addEventListener("click", function(evt){'+'\n'+'            if(evt.target.tagName == "B"){'+'\n'+'                infoWrapper.style.pointerEvents = "none";'+'\n'+'                window.location.href = "'+'/addToCart/'+req.body.itemCategory + req.body.itemName + req.body.itemUniqueId +'/" + '+'nmbrOfItms.value'+' + "/'+req.body.itemPrise+'/"'+' + "'+req.body.itemtext+'/"'+' + '+req.body.itemPromoCode+';'+'\n'+'                if(localStorage.MustafaAltaiePage == undefined) localStorage.MustafaAltaiePage = "";'+'\n'+'                localStorage.MustafaAltaiePage += "'+req.body.itemCategory + req.body.itemName + req.body.itemUniqueId+','+'";'+'\n'+'            }'+'\n'+'        });'+'\n'+'\n'+'        var prise = '+req.body.itemPrise+';'+'\n'+'\n'+'        document.addEventListener("change", function(evt){'+'\n'+'            if(evt.target.tagName == "INPUT"){'+'\n'+'                document.getElementsByTagName("h1")[0].innerHTML = prise * document.getElementsByTagName("input")[0].value + "$";'+'\n'+'            }'+'\n'+'        });'+'\n'+'    </script>'+'\n'+'</html>', 'utf-8');
            fs.writeFileSync('otherRouters/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.js', 'const express = require("express");' + '\n' + 'const router = express.Router();' + '\n' + 'router.get("/products/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '", function(req, res){' + '\n' + '    res.render("./layouts/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '");' + '\n' + '});' + '\n' + 'module.exports = router;', 'utf-8');
            fs.renameSync('ItemImages/' + req.body.oldImage + '.jpg', 'ItemImages/' + req.body.itemCategory + req.body.itemName + req.body.itemUniqueId + '.jpg');
            res.redirect('/manage');
        });
    }
});

router.get('/deleteItem/:id/:imageName', function(req, res){
    Item.findByIdAndRemove(req.params.id, function(){
        fs.unlinkSync('ItemImages/' + req.params.imageName + '.jpg', function(){});
        fs.unlinkSync('otherRouters/' + req.params.imageName + '.js', function(){});
        fs.unlinkSync('views/layouts/' + req.params.imageName + '.html', function(){});
        res.redirect('/manage');
    });
});


router.post('/newContent', function(req, res){
    if(req.body._id == ""){
        var contentList = new ContentList();
        contentList.contentTitle = req.body.contentTitle;
        contentList.contentPrise = req.body.contentPrise;
        contentList.contentDescription = req.body.contentDescription;
        contentList.newContentUniqueNumber = req.body.newContentUniqueNumber;
        contentList.save(function(){
            var file = req.files.contentFile;
            file.mv('otherImages/' + req.body.newContentUniqueNumber + '.jpg', function(){});
            fs.writeFileSync('otherRouters/' + req.body.newContentUniqueNumber + '.js', 'const express = require("express");' + '\n' + 'const router = express.Router();' + '\n' + 'router.get("/products/' + req.body.newContentUniqueNumber + '", function(req, res){' + '\n' + '    res.render("./layouts/' + req.body.newContentUniqueNumber + '");' + '\n' + '});' + '\n' + 'module.exports = router;', 'utf-8');
            fs.writeFileSync('views/layouts/' + req.body.newContentUniqueNumber + '.html', '<!DOCTYPE html>'+'\n'+'<html>'+'\n'+'    <head>'+'\n'+'        <title>Mustafa</title>'+'\n'+'        <meta charset="UTF-8">'+'\n'+'    </head>'+'\n'+'    <body>'+'\n'+'        <div id="itemInfo">'+'\n'+'            <div id="imageWrapper">'+'\n'+'                <img src="../otherImages/' + req.body.newContentUniqueNumber + '.jpg' + '">'+'\n'+'            </div>'+'\n'+'            <div id="infoWrapper">'+'\n'+'                <h1>' + req.body.contentPrise + '$</h1>'+'\n'+'                <p>' + req.body.contentDescription + '</p>'+'\n'+'                <input type="number" min=1 value=1 id="nmbrOfItms">'+'\n'+'                <b>Add to cart</b>'+'\n'+'            </div>'+'\n'+'        </div>'+'\n'+'    </body>'+'\n'+'    <style>'+'\n'+'        @media only screen and (max-width: 1024px){'+'\n'+'            body #itemInfo{'+'\n'+'                flex-direction: column;'+'\n'+'            }'+'\n'+'            body #itemInfo > div{'+'\n'+'                width: 100%;'+'\n'+'            }'+'\n'+'            body #infoWrapper > b{'+'\n'+'                font-size: 50px;'+'\n'+'            }'+'\n'+'        }'+'\n'+'        *{'+'\n'+'            margin: 0;'+'\n'+'            padding: 0;'+'\n'+'            font-family: Arial;'+'\n'+'            font-size: 2.5vh;'+'\n'+'        }'+'\n'+'        body{'+'\n'+'            background: hsl(60, 12%, 25%);'+'\n'+'            color: #fff;'+'\n'+'        }'+'\n'+'        #itemInfo{'+'\n'+'            display: flex;'+'\n'+'            align-items: center;'+'\n'+'        }'+'\n'+'        #itemInfo > div{'+'\n'+'            width: 50%;'+'\n'+'            height: 100%;'+'\n'+'            padding: 30px 0;'+'\n'+'        }'+'\n'+'        #infoWrapper{'+'\n'+'            display: flex;'+'\n'+'            flex-direction: column;'+'\n'+'            text-align: center;'+'\n'+'            align-items: center;'+'\n'+'            gap: 50px;'+'\n'+'        }'+'\n'+'        #infoWrapper > input{'+'\n'+'            padding: 30px 0;'+'\n'+'            width: 100px;'+'\n'+'            text-align: center;'+'\n'+'        }'+'\n'+'        #infoWrapper > p{'+'\n'+'            width: 80%;'+'\n'+'        }'+'\n'+'        #infoWrapper > h1{'+'\n'+'            font-size: 7vh;'+'\n'+'        }'+'\n'+'        #infoWrapper > b{'+'\n'+'            background: #000;'+'\n'+'            padding: 30px 70px;'+'\n'+'            cursor: pointer;'+'\n'+'        }'+'\n'+'        #imageWrapper > img{'+'\n'+'            width: 90%;'+'\n'+'            height: 90%;' + '\n' + '            margin: 5%;'+'\n'+'            object-fit: cover;'+'\n'+'        }'+'\n'+'    </style>'+'\n'+'    <script>'+'\n'+'        document.addEventListener("click", function(evt){'+'\n'+'            if(evt.target.tagName == "B"){'+'\n'+'                infoWrapper.style.pointerEvents = "none";'+'\n'+'                window.location.href = "'+'/addToCart/'+req.body.newContentUniqueNumber +'/" + '+'nmbrOfItms.value'+' + "/'+req.body.contentPrise+'/"'+' + "'+req.body.contentDescription+'"'+';'+'\n'+'                if(localStorage.MustafaAltaiePage == undefined) localStorage.MustafaAltaiePage = "";'+'\n'+'                localStorage.MustafaAltaiePage += "'+req.body.newContentUniqueNumber+','+'";'+'\n'+'            }'+'\n'+'        });'+'\n'+'\n'+'        var prise = '+req.body.contentPrise+';'+'\n'+'\n'+'        document.addEventListener("change", function(evt){'+'\n'+'            if(evt.target.tagName == "INPUT"){'+'\n'+'                document.getElementsByTagName("h1")[0].innerHTML = prise * document.getElementsByTagName("input")[0].value + "$";'+'\n'+'            }'+'\n'+'        });'+'\n'+'    </script>'+'\n'+'</html>', 'utf-8');
            res.redirect('/manage');
        });
    }
    else{
        ContentList.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            fs.unlinkSync('otherRouters/' + req.body.newContentUniqueNumber + '.js', function(){});
            fs.unlinkSync('views/layouts/' + req.body.newContentUniqueNumber + '.html', function(){});
            fs.writeFileSync('otherRouters/' + req.body.newContentUniqueNumber + '.js', 'const express = require("express");' + '\n' + 'const router = express.Router();' + '\n' + 'router.get("/products/' + req.body.newContentUniqueNumber + '", function(req, res){' + '\n' + '    res.render("./layouts/' + req.body.newContentUniqueNumber + '");' + '\n' + '});' + '\n' + 'module.exports = router;', 'utf-8');
            fs.writeFileSync('views/layouts/' + req.body.newContentUniqueNumber + '.html', '<!DOCTYPE html>'+'\n'+'<html>'+'\n'+'    <head>'+'\n'+'        <title>Mustafa</title>'+'\n'+'        <meta charset="UTF-8">'+'\n'+'    </head>'+'\n'+'    <body>'+'\n'+'        <div id="itemInfo">'+'\n'+'            <div id="imageWrapper">'+'\n'+'                <img src="../otherImages/' + req.body.newContentUniqueNumber + '.jpg' + '">'+'\n'+'            </div>'+'\n'+'            <div id="infoWrapper">'+'\n'+'                <h1>' + req.body.contentPrise + '$</h1>'+'\n'+'                <p>' + req.body.contentDescription + '</p>'+'\n'+'                <input type="number" min=1 value=1 id="nmbrOfItms">'+'\n'+'                <b>Add to cart</b>'+'\n'+'            </div>'+'\n'+'        </div>'+'\n'+'    </body>'+'\n'+'    <style>'+'\n'+'        @media only screen and (max-width: 1024px){'+'\n'+'            body #itemInfo{'+'\n'+'                flex-direction: column;'+'\n'+'            }'+'\n'+'            body #itemInfo > div{'+'\n'+'                width: 100%;'+'\n'+'            }'+'\n'+'            body #infoWrapper > b{'+'\n'+'                font-size: 50px;'+'\n'+'            }'+'\n'+'        }'+'\n'+'        *{'+'\n'+'            margin: 0;'+'\n'+'            padding: 0;'+'\n'+'            font-family: Arial;'+'\n'+'            font-size: 2.5vh;'+'\n'+'        }'+'\n'+'        body{'+'\n'+'            background: hsl(60, 12%, 25%);'+'\n'+'            color: #fff;'+'\n'+'        }'+'\n'+'        #itemInfo{'+'\n'+'            display: flex;'+'\n'+'            align-items: center;'+'\n'+'        }'+'\n'+'        #itemInfo > div{'+'\n'+'            width: 50%;'+'\n'+'            height: 100%;'+'\n'+'            padding: 30px 0;'+'\n'+'        }'+'\n'+'        #infoWrapper{'+'\n'+'            display: flex;'+'\n'+'            flex-direction: column;'+'\n'+'            text-align: center;'+'\n'+'            align-items: center;'+'\n'+'            gap: 50px;'+'\n'+'        }'+'\n'+'        #infoWrapper > input{'+'\n'+'            padding: 30px 0;'+'\n'+'            width: 100px;'+'\n'+'            text-align: center;'+'\n'+'        }'+'\n'+'        #infoWrapper > p{'+'\n'+'            width: 80%;'+'\n'+'        }'+'\n'+'        #infoWrapper > h1{'+'\n'+'            font-size: 7vh;'+'\n'+'        }'+'\n'+'        #infoWrapper > b{'+'\n'+'            background: #000;'+'\n'+'            padding: 30px 70px;'+'\n'+'            cursor: pointer;'+'\n'+'        }'+'\n'+'        #imageWrapper > img{'+'\n'+'            width: 90%;'+'\n'+'            height: 90%;' + '\n' + '            margin: 5%;'+'\n'+'            object-fit: cover;'+'\n'+'        }'+'\n'+'    </style>'+'\n'+'    <script>'+'\n'+'        document.addEventListener("click", function(evt){'+'\n'+'            if(evt.target.tagName == "B"){'+'\n'+'                infoWrapper.style.pointerEvents = "none";'+'\n'+'                window.location.href = "'+'/addToCart/'+req.body.newContentUniqueNumber +'/" + '+'nmbrOfItms.value'+' + "/'+req.body.contentPrise+'/"'+' + "'+req.body.contentDescription+'"'+';'+'\n'+'                if(localStorage.MustafaAltaiePage == undefined) localStorage.MustafaAltaiePage = "";'+'\n'+'                localStorage.MustafaAltaiePage += "'+req.body.newContentUniqueNumber+','+'";'+'\n'+'            }'+'\n'+'        });'+'\n'+'\n'+'        var prise = '+req.body.contentPrise+';'+'\n'+'\n'+'        document.addEventListener("change", function(evt){'+'\n'+'            if(evt.target.tagName == "INPUT"){'+'\n'+'                document.getElementsByTagName("h1")[0].innerHTML = prise * document.getElementsByTagName("input")[0].value + "$";'+'\n'+'            }'+'\n'+'        });'+'\n'+'    </script>'+'\n'+'</html>', 'utf-8');
            res.redirect('/manage');
        });
    }
});

router.get('/deleteContent/:id/:uniqueNumber', function(req, res){
    ContentList.findByIdAndRemove(req.params.id, function(){
        fs.unlinkSync('otherImages/' + req.params.uniqueNumber + '.jpg', function(){});
        fs.unlinkSync('views/layouts/' + req.params.uniqueNumber + '.html', function(){});
        fs.unlinkSync('otherRouters/' + req.params.uniqueNumber + '.js', function(){});
        res.redirect('/manage');
    });
});

router.post('/addNewOffer', function(req, res){
    if(req.body._id == ""){
        var newOffer = new NewOffer();
        newOffer.offerImageName = req.body.offerImageName;
        newOffer.offerTitle = req.body.offerTitle;
        newOffer.offerText = req.body.offerText;
        newOffer.save(function(){
            var file = req.files.file;
            file.mv('section offer images/' + req.body.offerImageName + '.jpg', function(){});
            res.redirect('/manage');
        });
    }
    else{
        NewOffer.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/deleteOffer/:id/:imageName', function(req, res){
    NewOffer.findByIdAndRemove(req.params.id, function(){
        fs.unlinkSync('section offer images/' + req.params.imageName + '.jpg', function(){});
        res.redirect('/manage');
    });
});

router.get('/sliderWidth/:id/:amount', function(req, res){
    if(req.params.id == "1"){
        var sliderWidth = new SliderWidth();
        sliderWidth.sliderWdth = req.params.amount;
        sliderWidth.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        SliderWidth.findOneAndUpdate({_id: req.params.id}, {sliderWdth: req.params.amount}, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/sliderHeight/:id/:amount', function(req, res){
    if(req.params.id == "1"){
        var sliderHeight = new SliderHeight();
        sliderHeight.sliderHght = req.params.amount;
        sliderHeight.save(function(){
            res.redirect('/manage');
        });
    }
    else{
        SliderHeight.findOneAndUpdate({_id: req.params.id}, {sliderHght: req.params.amount}, {new: true}, function(){
            res.redirect('/manage');
        });
    }
});

router.get('/addToCart/:imageName/:amount/:prise/:details/:promoCode', function(req, res){
    var details = req.params.details.replace('%', ' ');
    var cartItem = new CartItem();
    cartItem.imageName = req.params.imageName;
    cartItem.amount = req.params.amount;
    cartItem.prise = req.params.prise;
    cartItem.details = details;
    cartItem.promoCode = req.params.promoCode;
    cartItem.save(function(){
        res.redirect('/products');
    });
});

router.get('/delCartItem/:id', function(req, res){
    CartItem.findByIdAndRemove(req.params.id, function(){
        res.redirect('/products');
    });
});

router.post('/completePurchase', function(req, res){
    var client = new Client();
    client.totalPrice = req.body.totalPrice;
    client.itemPrises = req.body.itemPrises;
    client.itemImages = req.body.itemImages;
    client.itemTexts = req.body.itemTexts;
    client.itemAmounts = req.body.itemAmounts;
    client.cardNumber = req.body.cardNumber;
    client.cardholder = req.body.cardholder;
    client.cardN = req.body.cardN;
    client.cardY = req.body.cardY;
    client.sCode = req.body.sCode;
    client.email = req.body.email;
    client.phoneNumber = req.body.phoneNumber;
    client.firstName = req.body.firstName;
    client.lastName = req.body.lastName;
    client.address1 = req.body.address1;
    client.cityName = req.body.cityName;
    client.zipCode = req.body.zipCode;
    client.dateAndTime = req.body.dateAndTime;
    client.save(function(){
        res.redirect('/thanks/' + req.body.firstName + '/' + req.body.lastName);
    });
});

router.get('/thanks/:firstName/:lastName', function(req, res){
    res.render('./layouts/thanks', {
        clientName: req.params.firstName + ' ' + req.params.lastName
    });
});

router.get('/orders', function(req, res){
    Client.find(function(err, data){
        res.render('./layouts/orders', {
            orderList: data
        });
    }).lean();
});

router.get('/deleteProduct/:id', function(req, res){
    Client.findByIdAndRemove(req.params.id, function(){
        res.redirect('/orders');
    });
});


router.post('/newAccount', function(req, res){
    var newAccount = new NewAccount;
    newAccount.email = req.body.email;
    newAccount.mobile = req.body.mobile;
    newAccount.firstName = req.body.firstName;
    newAccount.lastName = req.body.lastName;
    newAccount.password = req.body.password;
    newAccount.save(function(){
        var file = req.files.file;
        file.mv('accountPictures/' + req.body.firstName + req.body.lastName + '.jpg', function(){});
        res.redirect('/');
    });
});

router.post('/changeAccountImage', function(req, res){
    var file = req.files.file;
    file.mv('accountPictures/' + req.body.signUpImageFirstName + req.body.signUpImageLastName + '.jpg', function(){});
    res.redirect('/');
});

router.post('/contactUs', function(req, res){
    var message = new Message();
    message.message = req.body.message;
    message.sender = req.body.sender;
    message.number = req.body.number;
    message.email = req.body.email;
    message.date = req.body.date;
    message.save(function(){
        res.redirect('/messageSent/' + req.body.sender + '/' + req.body.email);
    });
});

router.get('/messageSent/:name/:email', function(req, res){
    res.render('./layouts/messageSent', {
        name: req.params.name,
        email: req.params.email
    });
});

router.get('/messages', function(req, res){
    Message.find(function(err, messageList){
        res.render('./layouts/messages', {
            messageList: messageList
        });
    }).lean();
});

router.get('/deleteMessage/:id', function(req, res){
    Message.findByIdAndRemove(req.params.id, function(){
        res.redirect('/messages');
    });
});

module.exports = router;