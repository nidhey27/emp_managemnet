var express = require('express');
var router = express.Router();
var bcrypt = require('../node_modules/bcryptjs');
var mysql = require('mysql');
var jwt = require('jsonwebtoken')

// Conntection Credentials
var mysqlConnection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'emp_managemnet',
  multipleStatements : true
});


// MySQL DB Connetion
mysqlConnection.connect((err) => {
  if(err){
      console.log(JSON.stringify(err,undefined,2));
  }else{
      console.log("DB Connection Successful");
  }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get Total Number of Emp's
router.get('/emps', function(req, res, next) {
  var sql = 'SELECT COUNT(`id`) as total FROM `emp_details`'
  mysqlConnection.query(sql,(err, rows, field) =>{
    if(!err){
      // console.log(rows)
      return res.status(201).json(rows[0].total);   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })
});

// Get all emp data
router.get('/emps_data', function(req, res, next) {
  var sql = 'SELECT * FROM `emp_details`'
  mysqlConnection.query(sql,(err, rows, field) =>{
    if(!err){
      // console.log(rows)
      return res.status(201).send(rows);   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })
});

// Get Individual EMp Data
router.get('/emp/:id', function(req, res, next) {
  var sql = 'SELECT * FROM `emp_details` WHERE id = ?'
  mysqlConnection.query(sql,[req.params.id],(err, rows, field) =>{
    if(!err){
      // console.log(rows)
      return res.status(201).send(rows);   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })
});


// Add new Emp
router.post('/add_emp', function(req, res, next) {
  let caught_data = req.body
  var sql = 'INSERT INTO `emp_details`(`name`, `dob`, `address`, `role`, `salary`, `exp`) VALUES (?,?,?,?,?,?)'
  mysqlConnection.query(sql,[caught_data.name,caught_data.dob,caught_data.address,caught_data.role,caught_data.salary,caught_data.exp],(err, rows, field) =>{
    if(!err){
      return res.status(201).send({message : 'success'});   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })
});

// Delete An Emp
router.delete('/delete_emp/:id', function(req, res, next) {
  console.log(req.params.id)
  let del_id = req.params.id
  var sql = 'DELETE FROM `emp_details` WHERE id = ?'
  mysqlConnection.query(sql,[del_id],(err, rows, field) =>{
    if(!err){
      return res.status(201).send({message : 'success'});   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })
});

// Update emp data
router.put('/update_emp/:id', (req,res, next) => {
  let emp = req.body;
  var sql = 'UPDATE `emp_details` SET `name`=?,`dob`=?,`address`=?,`role`=?,`salary`=?,`exp`=? WHERE `id` = ?'

  mysqlConnection.query(sql,[emp.name,emp.dob,emp.address,emp.role,emp.salary,emp.exp,req.params.id],(err, rows, field) =>{
    if(!err){
      return res.status(201).send({message : 'success'});   
    }else{
      return res.status(501).json({message: 'Error getting user.'})
    }
  })

})


// Register an user
router.post('/register', (req, res, next) => {
  let emp = req.body;
  var sql = 'INSERT INTO `users`(`email`, `password`) VALUES (?,?)'

  mysqlConnection.query(sql,[emp.email, bcrypt.hashSync(emp.password,10)],(err, rows, field) =>{
    if(!err){
      return res.status(201).json({message: 'success'});   
    }else{
      return res.status(501).json({message: 'Error registering user.'})
    }
  })
})

// Login an user
router.post('/login',(req, res, next) => {
  let emp = req.body;
  var sql = 'SELECT password FROM `users` WHERE email = ?';
  // console.log(`SELECT * FROM users WHERE email = '${emp.email}'`)
  mysqlConnection.query(sql,[emp.email],(err, rows, field) =>{
    if(!err && rows.length > 0 ){
     
      if (bcrypt.compareSync(emp.password, rows[0].password)) {
        let token = jwt.sign({username: emp.email},'secret', {expiresIn : '2h'})
        return res.status(201).json(token); 
    } else {
      
      return res.status(501).json({message: err})
    }     
     
    }else{
      return res.status(501).json({message: err})
    }
  })

})

// Verifying the JWT TOKEN
router.get('/dashboard', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.email);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(501).json({'message':' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}
module.exports = router;
