
const mysql= require('mysql');

const pool = mysql.createPool({
    connectionLimit :100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    database        : process.env.DB_NAME


});



exports.view = (req,res) => {

    pool.getConnection((err,connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT * FROM user', (err,rows) => {
            connection.release();

            if ( ! err){
                res.render('home',{rows});

            }
            else{
                console.log(err);
            }
            console.log('The data from user table: \n',rows);

        })


       });
    }

    exports.find = (req,res) => {

        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);

            let searchTerm= req.body.search;
    //sql injection ?
            connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',['%' + searchTerm + '%','%' + searchTerm + '%'], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    res.render('home',{rows});
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
    }

    exports.form =(req, res) => {
        res.render('add-user');
    }

    exports.create =(req, res) => {
        const {first_name, last_name, email, phone, comments } = req.body;
        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);

            
            connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ? , phone = ? , comments = ?',[first_name,last_name,email,phone,comments], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    res.render('add-user',{rows});
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
    }

    exports.edit =(req, res) => {
        

        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);
    
            connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    res.render('edit-user',{rows});
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
    }

    exports.update =(req, res) => {
        const {first_name, last_name, email, phone, comments } = req.body;

        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);
    
            connection.query('UPDATE user SET first_name = ? , last_name = ?, email = ?, phone = ?, comments = ?  WHERE ID = ?',[first_name, last_name, email, phone, comments, req.params.id], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    pool.getConnection((err,connection) => {
                        if (err) throw err;
                        console.log('Connected as ID' + connection.threadId);
                
                        connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err,rows) => {
                            connection.release();
                
                            if ( ! err){
                                res.render('edit-user',{rows});
                
                            }
                            else{
                                console.log(err);
                            }
                            console.log('The data from user table: \n',rows);
                
                        })
                
                
                       });
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
    }

    exports.delete =(req, res) => {
        

        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);
    
            connection.query('DELETE FROM user WHERE id = ?',[req.params.id], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    let removedUser = encodeURIComponent('User Successfully Removed');
                    res.redirect('/?removed =' + removedUser);
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
    }


    exports.viewall = (req,res) => {

        pool.getConnection((err,connection) => {
            if (err) throw err;
            console.log('Connected as ID' + connection.threadId);
    
            connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err,rows) => {
                connection.release();
    
                if ( ! err){
                    res.render('view-user',{rows});
    
                }
                else{
                    console.log(err);
                }
                console.log('The data from user table: \n',rows);
    
            })
    
    
           });
        }
