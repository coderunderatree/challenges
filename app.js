var express             = require('express'),
    app                 = express(),
    mongoose            = require('mongoose'),
    bodyParser          = require('body-parser'),
    moment              = require('moment'),
    validator           = require('express-validator');
    
// APP Config
// mongoose.connect('mongodb://localhost/patient_data');
mongoose.connect('mongodb://test_user:usertest@ds155509.mlab.com:55509/challenge_dataphi');
app.set('view engine','ejs');
app.use(express.static("public"));//use public directory for stylesheets and other script files
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());  //required for Express-Validator

// Mongoose/Model config
var patientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    blood: String,
    dob: Date,
    gender: String,
    phone: Number,
    info: String
});

var Patient = mongoose.model('Patient', patientSchema);

//RESTful routes
app.get('/',function (req,res) {
    res.redirect('/patients');    
});

app.get('/patients',function (req,res) {
    Patient.find({},function (err,patients) {
        if(err){
            console.log("Error!");
        } else{
            res.render('index',{patients:patients,moment:moment});
        }
    })
});

//NEW Route
app.get('/patients/new',function(req, res) {
    res.render('new');
});

// CREATE Route
app.post('/patients',function(req, res) {
    //Check and Validate for Errors
    req.checkBody({
        'patient[firstName]':{
            isAlpha : {
                errorMessage: 'Invalid First Name, it should contain only text'
            }
        },
        'patient[lastName]':{
            isAlpha : {
                errorMessage: 'Invalid Last Name, it should contain only text'
            }
        },
        'patient[blood]':{
            notEmpty:true,
            errorMessage: 'Blood Group Cannot be Empty'
        },
        'patient[dob]':{
            isDate : {
                errorMessage: 'Invalid Date of Birth'
            }
        },
        'patient[gender]':{
            notEmpty:true,
            errorMessage: 'Gender cannot be empty'
        },
        'patient[phone]':{
            isLength : { //Validates the length based on the options
                options: [{ min: 6, max: 10 }],
                errorMessage: 'Phone Number should be between 6 and 10 digits'
            }
        },
    });
    // //Error check results
    var errors = req.validationErrors();
    
    if (errors) {
        res.render('errors',{errors:errors});
        return;
    } else {
    // normal processing here
        Patient.create(req.body.patient, function(err,newBlog){
           if(err) {
               //These errors are different from Validation Errors
               res.render('new');
           } else {
               res.redirect('/patients');
           }
        });
    }
});

// PORT Listen
app.listen(process.env.PORT, process.env.IP,function(){
   console.log("Server is running!"); 
});