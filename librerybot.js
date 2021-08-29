
const {Telegraf}= require('telegraf');

const bot = new Telegraf('1950335612:AAGBx8G3YoGc0BiWdp0sJzQqANGxrUd569A');
var user_list = []
const listofbook = ['harry poter','me befor you','azkaban','holy stone','spyder man komic'];
let my_list=[]

class User{
        constructor(chatid , state,name='',addrese='',phone=''){
         this.name = name
         this.chatid=chatid
         this.addrese=addrese
         this.phone=phone
         this.state=state
         console.log('name ='+name +'  '+'chatid ='+chatid +'  '+'addrese ='+addrese +'  '+'phone ='+phone+' '+'state ='+state)
        }
        nextState(){
            if(this.state = 'getName'){
                this.state = 'getPhone' 
            }
        }
    setName( value){
         this.name=value
    }
    getName(value){
        return this.name
    }
    validation_Phone(value){
        if(value.length==11)
        return true;
        else
        return false;
    }
    getPhone(value){
        return this.phone
    }
    setPhone(value){
        if(validation_Phone(value)){
            this.phone =value
            return true
        }
        else{
               return false
        }
    }
}

bot.use((ctx,next)=>{
    console.log('err ma',ctx)
    for(i=0 ;i<user_list.length;i++){ 
        console.log('mmmmmmm',typeof(callback_data))
        console.log('aliiiiiiii',typeof(ctx.update.message.chat.id))
        if(ctx.update.message.chat.id==user_list[i].chatid)
        {
            ctx.indexuser = i
            ctx.issignup = true
        }
        
        else if(ctx.update.message.chat.id==ctx.update.callback.message.chat.id){
            for(my_list in my_list){
                bot.action(my_list,ctx=>{
                console.log(my_list)
                })
            }
        }
        else{
            ctx.issignup = false
        }
    }
    next()
})
bot.start((ctx)=>{
    if(! ctx.issignup){
        ctx.reply('welecome.please enter your name')
        user_list.push({
            chatid:ctx.message.chat.id,
            username:ctx.message.chat.username,
            state:'getName'
        });
        ctx.indexuser=user_list.length -1
    }
    else{
        ctx.reply('pereviosly you sigh up!please continue'+
        state[user_list[ctx.indexuser.state].state].text)
    }
    user_list.push(new User(chatid=ctx.chat.id , state ='getName'))
})
bot.hears('listbook',ctx=> {
    console.log(my_list)
    let massagelibrery = `now we have list of book`;
    bot.telegram.sendMessage(ctx.chat.id, massagelibrery , {
        reply_markup : {
            inline_keyboard:my_list
            
        }
    })
})

for(my_list in my_list){
    bot.action(my_list,ctx=>{
    console.log(my_list)
    })
}
bot.on('text',(ctx)=>{
    if(ctx.issignup){
        console.log(user_list[ctx.indexuser])
     if (user_list[ctx.indexuser].state=='getName'){
        user_list[ctx.indexuser].setName(ctx.update.message.text)
        user_list[ctx.indexuser].name=ctx.update.message.text
        user_list[ctx.indexuser].state = 'getPhone' ;
        ctx.reply(user_list[ctx.indexuser].name + 'welecome!')

        ctx.reply('please enter your Phone number')
    }
    else if(user_list[ctx.indexuser].state =='getPhone'){
        if( user_list[ctx.indexuser].validation_Phone(ctx.update.message.text)){
            user_list[ctx.indexuser].phone = ctx.update.message.text
            ctx.reply('your phone number saved')
            user_list[ctx.indexuser].state = 'getaddress'
            ctx.reply('please enter your address')
        }
        else
        {
            ctx.reply('your phone number is not corect,please try agein')
        }
    }else if (user_list[ctx.indexuser].state =='getaddress'){
        user_list[ctx.indexuser].state = 'showbook'
            
            user_list[ctx.indexuser].addrese = ctx.update.message.text
            ctx.reply('please enter (listbook) to show list of book')
    }

        
     }else{
        ctx.reply('you didnt press start please try agein') 
 }
   
})

 
if(listofbook.length%2==0){
    for(let a=0;a< listofbook.length;a+=2)
    { 
        my_list.push( [ { text: listofbook[a],
        callback_data : listofbook[a]},
        
        { text: listofbook[a+1],
            callback_data : listofbook[a+1]}] 
        );
        }
        
        }
else if(listofbook.length%2==1){ 
        var b = listofbook.length-1;  
       
    for(let a=0;a<b;a+=2)
    { 
    
    my_list.push( [ { text: listofbook[a],
    callback_data : listofbook[a]},
    
     { text: listofbook[a+1],
        callback_data : listofbook[a+1]}]
        
    );}
     
    my_list.push( [ { text: listofbook[b],
    callback_data : listofbook[b]}]);
}

// // ###############  Callback when Clicking on Rental Houses  Keyboard #################
// bot.hears(/🏡/,(ctx)=>{
//     let infos = []
//     let keys = []
//     for (house in rentalHouses){
//       infos.push({text:rentalHouses[house].name,callback_data:house})
//     }
//     for(i=0;i<= infos.length/3;i++){
//       if(infos[i*3] && infos[i*3+1] && infos[i*3+2]){
//         keys[i] = [infos[i*3],infos[i*3+1],infos[i*3+2]]
//       }
//       if(!infos[i*3+2]){
//         keys[i] = [infos[i*3],infos[i*3+1]]
//       }
//       if(!infos[i*3+1]){
//         keys[i] = [infos[i*3]]
//       }
//     }

//   ctx.reply("🏡🏡🏡🏡🏡🏡",{
//     reply_markup : {
//                     inline_keyboard : keys
//                     }
//   })

//   globalfunctions.returnShow(ctx,wordsList,language)
// }).catch((err)=>{if(err){console.log(err)}})
// // #############Callbac when clicking on a house in inline_keyboard ###################
// for(house in rentalHouses){
//   bot.action(house,async (ctx)=>{
//     //show pictures at first
//     await showLocation(ctx,rentalHouses[house].latitude,rentalHouses[house].longitude)
//     let stars =""
//     for(i=0;i<rentalHouses[house].rate;i++){
//       stars += "⭐"
//     }
//     infos =  ['Rating   :'+stars,
//               'Type     :'+rentalHouses[house].type,
//               '☎️ Phone : 0634864854',
//               '🔳 Space : '+rentalHouses[house].space +' m²',
//               '🚹 Rooms : '+rentalHouses[house].rooms,
//               '🔳 Level : '+rentalHouses[house].level,
//               '🏖️ Beach Distance : '+rentalHouses[house].beachDistance+' m',
//               '🌡️  Air Conditionner : '+rentalHouses[house].airConditionner,
//               '📶 Wifi : '+rentalHouses[house].wifi,
//               '🏊 Pool : '+rentalHouses[house].pool,
//               'availablity :'+rentalHouses[house].available
//             ]
//      for(index in infos){
//        await ctx.reply(infos[index])
//      }
//      await  ctx.reply("show more",{
//         reply_markup : {
//                         keyboard : [
//                                     ["📷 show "+rentalHouses[house].name+" picture"],
//                                     ["↩️ "+wordsList[language].Back]
//                                    ],resize_keyboard:true
//                         }
//       })
//     bot.hears('/' + house +'/',(ctx)=>{
//         rentalHouses[house].pictures.forEach(async picture => {
//           await  ctx.replyWithPhoto(picture)
//     })
//     }).catch((err)=>{if(err){console.log(err)}})

//   }).catch((err)=>{if(err){console.log(err)}})
// } 




// class Book{
//     constructor(name ,writer , price , barcode ){
//         this.name = name
//         this.writer = writer
//         this.price = price 
//         this.barcode = barcode 
//     }

// }

// class Buylist{
//     constructor (id  ,user  ){
//         this.id = id 
//         this.user = user ; 
//         this.books =[]
//         this.totalprice = 0  
//         this.discount = 0 
//         this.isPayed = false 
//     }
//     addBook(book){
//         console.log('book added' + book )
//         this.books.push(book)
//         this.totalprice += book.price ; 
//     }
//     checkout(){
//        if (this.isPayed == false ){
//            var bool  = this.user.minusfrom_wallet(this.totalprice) ; 
//            console.log('your mony' , this.user.wallet)

//            if (bool == true ){
//                this.isPayed = true ;
               
//                return true 
//            }else {
//                console.log(' your checkuot not sucssefull')
//                return false 

//            }
           
//        } 
//     }
//     maketrue(){
//         this.isPayed =true    }
    
// }

// class User{
//     wallet = 100 ;
//     constructor(name ,chatid = 0 , address ='' , phone = ''  ){
//         this.name = name
//         this.chatid = chatid
//         this.address = address
//         this.phone = phone
//     }
//     add2wallet(price){
//         this.wallet += price ; 
//     }
//     minusfrom_wallet(price, buylist){
//         console.log('book price' , price)
//         if(this.wallet > price){
            
//             this.wallet -= price  ;
//             return true
//         }else {
//             console.log( ' your mony is not enough')
//             return false 

//         }
//     }
//     print(something){
//         console.log(something)
//     }
// }

// var book = new Book('haripater' , 'alireza' , 5 , '123123213123');

// var user1 = new User('alireza'  ) ; 
// var user2 = new User('mohamad')


// var buylist1 = new Buylist(1, user1) ; 
// var buylist2 = new Buylist( 2, user2) ; 

// //user1.print(buylist1) ; 
// buylist1.addBook(book)



// try {
//     if (buylist1.checkout()){
//         console.log('your checkout done')
//     }else {
//         console.log('your check out not done')
//     }

// }catch(err){
//     console.log(err)
//     buylist1.user.add2wallet(buylist1.totalprice) ;
 
//     console.log(' your check out not done  your mony is ' , buylist1.user.wallet)
// }

bot.launch();