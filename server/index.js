const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require ('mysql');
var i = 1;
let clientAddress ='';

const db = mysql.createPool({
    host: "localhost",
    user: "BHT_Amila",
    password: "BHT@2021#Amila",
    database: "burn_hearts"
});
//below express 4.16//
/*app.use(bodyParser.urlencoded({extended: true}));

//or //
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post("/api/insert", (req, res)=> {

    const ad_Address = req.body.ad_Address;
    const ad_Tokens = req.body.ad_Tokens;
    const ad_Referrer = req.body.ad_Referrer;
    const ad_Ref_Tokens = req.body.ad_Ref_Tokens;


    const sqlInsert = "INSERT INTO tbl_airdrop(ad_Address, ad_Tokens, ad_Referrer, ad_Ref_Tokens ) VALUES (?,?,?,?)";
    db.query(sqlInsert, [ad_Address, ad_Tokens, ad_Referrer, ad_Ref_Tokens], (err, result)=> {
        console.log(result);
        console.log(req.body);

    });
}); 

app.post("/api/tokenbuy", (req, res)=> {

    const pr_Address = req.body.pr_Address;
    const pr_Tokens = req.body.pr_Tokens;
    const pr_referrer = req.body.pr_referrer;
    const pr_Ref_Tokens = req.body.pr_Ref_Tokens;
    const pr_BNB_Value = req.body.pr_BNB_Value;


    const sqlInsert2 = "INSERT INTO tbl_presale_referral(pr_Address, pr_Tokens, pr_referrer, pr_Ref_Tokens, pr_BNB_Value ) VALUES (?,?,?,?,?)";
    db.query(sqlInsert2, [pr_Address, pr_Tokens, pr_referrer, pr_Ref_Tokens, pr_BNB_Value], (err, result)=> {
        console.log("result:"+ result+ i++);
        console.log(req.body);
    });



});
 
app.post("/api/ref", (req, res)=> {

    const ref_Address = req.body.ref_Address;
    const ref_Name = req.body.ref_Name;

    const sqlInsert3 = "INSERT INTO tbl_referrer(ref_Address, ref_Name) VALUES (?,?)";
    db.query(sqlInsert3,[ref_Address, ref_Name], (err,result)=> {
        console.log("result:"+result);
        console.log(req.body);
    }); 

});

app.post("/api/addressCheck", (req, res)=> {

    clientAddress = req.body.ad_Address;
   // console.log("post:"+ clientAddress);
   
   
    
});

app.get("/api/get", (req, res) => {
    const sqlSelect5 = "SELECT ad_Address FROM tbl_airdrop WHERE ad_Address ='" +clientAddress+"'";
    db.query(sqlSelect5, (err, result) => {
        res.send(result);
    });
    
    })

app.get("/api/presaleGet", (req, res) => {
    const sqlSelect6 = "SELECT pr_referrer FROM tbl_presale_referral WHERE pr_Address ='" +clientAddress+"'";
    db.query(sqlSelect6, (err, result6) => {
        res.send(result6);
        });
        
        })    

app.get("/api/airdropGet", (req, res) => {
    const sqlSelect7 = "SELECT ad_Referrer FROM tbl_airdrop WHERE ad_Address ='" +clientAddress+"'";
    db.query(sqlSelect7, (err, result7) => {
        res.send(result7);
          });
                
          })
          
app.get("/api/lb_ad", (req, res) => {
    const sqlSelect8 = "SELECT * FROM ad_lb";
    db.query(sqlSelect8, (err, result) => {
        res.send(result);
          });
            
          })

app.get("/api/lb_pr", (req, res) => {
    const sqlSelect9 = "SELECT * FROM pr_lb";
    db.query(sqlSelect9, (err, result) => {
        res.send(result);
            });
                    
            })

app.get("/api/my_pr_ref", (req, res) => {
    const sqlSelect10 = "SELECT * FROM pr_lb WHERE pr_referrer ='" +clientAddress+"'";
    db.query(sqlSelect10, (err, result) => {
        res.send(result);
            });
                    
            }) 
            
app.get("/api/my_ad_ref", (req, res) => {
    const sqlSelect11 = "SELECT * FROM ad_lb WHERE ad_Referrer ='" +clientAddress+"'";
    db.query(sqlSelect11, (err, result) => {
        res.send(result);
            });
                                
            })             
                                
          
app.listen(3001, () => {
    console.log("running on port 3001"); 
});