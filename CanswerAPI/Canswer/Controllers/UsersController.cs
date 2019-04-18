using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Canswer.Models;
using Canswer.Models.Customized_Models;

namespace Canswer.Controllers
{
    public class UsersController : ApiController
    {
        private S354_ProjectEntities1 db = new S354_ProjectEntities1();
       
        // GET: api/Users
        public List<User> GetUsers()
        {
            db.Configuration.ProxyCreationEnabled = false;
            //List<User> userList = db.Users.ToList();
            List<User> userList = db.Users.Include(zz => zz.UserType).ToList();
            return userList;
        }
        // GET: api/Users
        public List<Colloborator> GetCollaborators()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Colloborator> colabList = db.Colloborators.Include(i=>i.User
            ).ToList();
            return colabList;
        }
        // GET: api/Users
        public List<Symptom> GetSymptoms()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Symptom> symptomsList = db.Symptoms.ToList();
            return symptomsList;
        }
        public List<Post> GetPostandComments()
        {
            db.Configuration.ProxyCreationEnabled = false;
            List<Post> PostList = db.Posts.Include("Post_Comment").ToList();
            return PostList;
        }
        // GET: api/Users
        public List<Post> Doof()
        {
            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            List<Post> PostList = db.Posts.Include("Post_Comment").ToList();
            return PostList;
        }
        // GET: api/Users
        public List<Treatment> GetTreatments()
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            /*https://www.aspsnippets.com/Articles/Retrieve-and-display-PDF-Files-from-database-in-browser-in-ASPNet.aspx */

            //this code is there for downloading the PDF https://www.codeproject.com/Questions/250274/Download-pdf-from-SQL-Server-database
            //use this to add the treatments to the table
            List<Treatment> treatlist = db.Treatments.Include(zz => zz.Treatment_Type).ToList();
            return treatlist;
        }

        //this will login and verify the user to see if they are on the database.
        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult Login(User loginuser)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                User user = db.Users.Where(x=> x.email_address == loginuser.email_address && x.Password == loginuser.Password ).FirstOrDefault();
                if (user != null)
                {
                    AccessValidate(user);
                    return Ok(user);
                }
                else
                {
                    return Ok("");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
            
        }
        [ResponseType(typeof(AddCollaborator))]
        // GET: api/Users
        public List<Colloborator> AddCollaborators(AddCollaborator Colab)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                //here i assign all the user to a temp user and colab to temp colab
                Colloborator tempcolabs = Colab.getcolab;
                User tempuser = Colab.getusers;
                //First we got to add the user table
                    //WE FIRST HAVE TO ASSIGN TO THE USER A TYPE COLLABORATOR
                UserType typeid =db.UserTypes.Where(i => i.Usertype1 == "Collaborator").FirstOrDefault();
                tempuser.usertypeID = typeid.ID;
                db.Users.Add(tempuser);
                //then we searh the user table for the id
                 User Newuser = db.Users.Where(i => i.Username == tempuser.Username).FirstOrDefault();

                //then we the add the colab details to the system and id that we got from above
                tempcolabs.Users = Newuser.ID;
                db.Colloborators.Add(tempcolabs);
                db.SaveChanges();
                List<Colloborator> colabList = db.Colloborators.ToList();
                return colabList;
            }
            catch (Exception e)
            {
                string mesage = e.Message;
                throw;
            }
            
        }
        [ResponseType(typeof(AddCollaborator))]
        // GET: api/Users
        public List<Colloborator> Update(AddCollaborator Colab)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                //here I assign all the user to a temp user and colab to temp colab
                Colloborator newcolabs = Colab.getcolab;
                User newuser = Colab.getusers;
                
                //then we searh the user table for the id and update the information
                User presentuser = db.Users.Where(i => i.Username == newuser.Username  && i.Password == newuser.Password).FirstOrDefault();
                presentuser = newuser;
                db.SaveChanges();
                //the we search see if its a collaborator if it is we change the colabinfromation aswell
                Colloborator presentcolab = db.Colloborators.Where(i => i.Users == presentuser.ID).FirstOrDefault();
                if (presentcolab != null)
                {
                    presentcolab = newcolabs;
                    db.SaveChanges();
                }
                
                //then we the add the colab details to the system and id that we got from above
                
                List<Colloborator> colabList = db.Colloborators.ToList();
                return colabList;
            }
            catch (Exception e)
            {
                string mesage = e.Message;
                throw;
            }

        }
        [ResponseType(typeof(Post_Comment))]
        public IHttpActionResult AddComment(Post_Comment Comment)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                db.Post_Comment.Add(Comment);
                db.SaveChanges();
                return Ok(Comment);
            }
            catch (Exception e)
            {
                return Ok();
            }

        }


        [ResponseType(typeof(Post))]
        public IHttpActionResult AddPost(Post POSTCOMMENT)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {

                db.Posts.Add(POSTCOMMENT);
                db.SaveChanges();
                return Ok(POSTCOMMENT);
            }
            catch (Exception e)
            {
                return Ok();
            }
         
        }
        public bool AccessValidate(User  user)
        {
            try
            {
                if (true)
                {

                }

                return true;
            }
            catch (Exception e)
            {

                return false;
            }
            



        }





        //This is where the sign up api will be called to add a user
        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult SignUp(User SignupUser)
        {

            //this is for an error that it can serialize the data that we send through
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                if (SignupUser != null)
                {
                    SignupUser.usertypeID = 1;
                    db.Users.Add(SignupUser);
                    db.SaveChanges();
                }
                
            }
            catch (Exception)
            {

                throw;
            }
            

            return CreatedAtRoute("DefaultApi", new { id = SignupUser.ID }, SignupUser);
        }
        /*
        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.ID == id) > 0;
        }*/
    }
}