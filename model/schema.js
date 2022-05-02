const mongoose = require('mongoose');

var myContent = new mongoose.Schema({
    contentName: {type: String}
});
mongoose.model('contents', myContent);

var newNavOption = new mongoose.Schema({
    optionName: {type:String}
});
mongoose.model('navOptions', newNavOption);

var newContent = new mongoose.Schema({
    contentTitle: {type: String},
    contentPrise: {type: String},
    contentDescription: {type: String},
    newContentUniqueNumber: {type: String},
    promocode: {type: String}
});
mongoose.model('contentList', newContent);

var homeTextStngs = new mongoose.Schema({
    first: {type: String},
    second: {type: String},
    third: {type: String}
});
mongoose.model('homeCenterText', homeTextStngs);

var homeMotionSpeed = new mongoose.Schema({
    rangeVal: {type: String}
});
mongoose.model('motionSpeed', homeMotionSpeed);

var imgSize = new mongoose.Schema({
    sizeValue: {type: String}
});
mongoose.model('imageSize', imgSize);

var homeSpace = new mongoose.Schema({
    spacevalue: {type: String}
});
mongoose.model('spaceAmounts', homeSpace);

var addNewItem = new mongoose.Schema({
    itemCategory: {type: String},
    itemName: {type: String},
    itemPrise: {type: String},
    itemtext: {type: String},
    itemUniqueId: {type: String},
    fewLeft: {type: String},
    itemOldPrise: {type: String},
    itemNewPrise: {type: String},
    itemSaleAmount: {type: String},
    itemPromoCode: {type: String}
});
mongoose.model('item', addNewItem);

var addNewOffer = new mongoose.Schema({
    offerImageName: {type: String},
    offerTitle: {type: String},
    offerText: {type: String}
});
mongoose.model('newOffer', addNewOffer);

var sliderWidthAmount = new mongoose.Schema({
    sliderWdth: {type: String}
});
mongoose.model('sliderWidth', sliderWidthAmount);

var sliderHeightAmount = new mongoose.Schema({
    sliderHght: {type: String}
});
mongoose.model('sliderHeight', sliderHeightAmount);

var client1 = new mongoose.Schema({
    totalPrice: {type: String},
    itemPrises: {type: String},
    itemImages: {type: String},
    itemAmounts: {type: String},
    cardNumber: {type: String},
    cardholder: {type: String},
    cardN: {type: String},
    cardY: {type: String},
    sCode: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    address1: {type: String},
    cityName: {type: String},
    zipCode: {type: String},
    dateAndTime: {type: String}
});
mongoose.model('client', client1);

var newAccount = new mongoose.Schema({
    email: {type: String},
    mobile: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String}

});
mongoose.model('account', newAccount);

var newMessage = new mongoose.Schema({
    message: {type: String},
    sender: {type: String},
    number: {type: String},
    email: {type: String},
    date: {type: String}
});
mongoose.model('message', newMessage);