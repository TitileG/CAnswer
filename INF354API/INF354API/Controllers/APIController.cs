using INF354API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;
using INF354API.Models.Customized_Models;

namespace INF354API.Controllers
{
    public class APIController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public class UsersController : ApiController
        {
            private S354_ProjectEntities1 db = new S354_ProjectEntities1();

            // GET: api/Users
            public List<User> GetUsers()
            {
                try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    //List<User> userList = db.Users.ToList();
                    List<User> userList = db.Users.Include(zz => zz.UserType).ToList();
                    return userList;
                }
                catch
                {
                    throw;
                }
                
            }
            // GET: api/Users
            public List<Colloborator> GetCollaborators()
            {
                try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    List<Colloborator> colabList = db.Colloborators.Include(i => i.User).ToList();
                    return colabList;
                }
                catch(Exception e)
                {
                   throw;
                }
                
            }
            [ResponseType(typeof(Colloborator))]
            public IHttpActionResult GetColloborator(int id)
            {
                db.Configuration.ProxyCreationEnabled = false;
                Colloborator colloborator = db.Colloborators.Find(id);
                
                if (colloborator == null)
                {
                    return NotFound();
                }
                User tempuser = db.Users.Find(colloborator.Users);
                AddCollaborator temp = new AddCollaborator();
                temp.getcolab = colloborator;
                temp.getusers = tempuser;
                return Ok(temp);
            }
            [ResponseType(typeof(User))]
            public IHttpActionResult GetUser(int id)
            {
                db.Configuration.ProxyCreationEnabled = false;
                User user = db.Users.Find(id);

                if (user == null)
                {
                    return NotFound();
                }
                
                
                return Ok(user);
            }

            // GET: api/Users
            public List<Symptom> GetSymptoms()
            {
                try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    List<Symptom> symptomsList = db.Symptoms.ToList();
                    return symptomsList;
                }
                catch
                {
                    throw;
                }
               
            }
            public List<Post> GetPostandComments()
            {
                try{
                    db.Configuration.ProxyCreationEnabled = false;
                    List<Post> PostList = db.Posts.Include("Post_Comment").ToList();
                    return PostList;
                }
                catch
                {
                    throw;
                }
                
            }
            // GET: api/Users
            public List<Question> getQuestions()
            {
                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {

                    List<Question> Questionlist = db.Questions.ToList();
                    return Questionlist;

                }
                catch (Exception)
                {
                    throw;
                }
            }
            // POST: api/Users
            [ResponseType(typeof(int))]
            public List<Answer> getAnswers([FromBody] int id)
            {
                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    List<Answer> Answerlist = db.Answers.Where(z => z.Question.ID == id).ToList();
                    return Answerlist;


                }

                catch (Exception)
                {

                    throw;
                }

                //return Answers;
            }
            // GET: api/Users
            public List<Treatment> GetTreatments()
            {
                try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    List<Treatment> treatlist = db.Treatments.Include(zz => zz.Treatment_Type).ToList();
                    return treatlist;
                }
                catch
                {

                    throw;
                }    
                //this is for an error that it can serialize the data that we send through
                
            /*https://www.aspsnippets.com/Articles/Retrieve-and-display-PDF-Files-from-database-in-browser-in-ASPNet.aspx */
            //http://imar.spaanjaars.com/414/storing-uploaded-files-in-a-database-or-in-the-file-system-with-aspnet-20
                 //this code is there for downloading the PDF https://www.codeproject.com/Questions/250274/Download-pdf-from-SQL-Server-database
                 //use this to add the treatments to the table
              
            }

            //this will login and verify the user to see if they are on the database.
            // GET: api/Users
            [ResponseType(typeof(User))]
            public IHttpActionResult Login(User loginuser)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    User user = db.Users.Where(x => x.email_address == loginuser.email_address && x.Password == loginuser.Password).FirstOrDefault();
                    if (user != null)
                    {
                        AccessValidate(user);
                        return Ok(user);
                    }
                    else
                    {
                        return Ok("Incorrect data");
                    }
                }
                catch (Exception e)
                {

                    return NotFound();
                }

            }
            [ResponseType(typeof(User))]
            // GET: api/Users
            public User AddUser(User newUser)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    if (newUser != null) {

                        db.Users.Add(newUser);
                        db.SaveChanges();

                    }
                    else
                    {
                        return newUser;
                    }
                   
                    //List<Colloborator> colabList = db.Colloborators.ToList();
                    return newUser;
                }
                catch (Exception e)
                {
                    string mesage = e.Message;
                    throw;
                }

            }
            [ResponseType(typeof(AddCollaborator))]
            // POST: api/Users
            public List<Colloborator> UpdateCollaborator(AddCollaborator Colab)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    //here I assign all the user to a temp user and colab to temp colab
                    Colloborator newcolabs = Colab.getcolab;
                    User newuser = Colab.getusers;

                    //then we searh the user table for the id and update the information
                    User presentuser = db.Users.Where(i => i.Username == newuser.Username && i.Password == newuser.Password).FirstOrDefault();
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
            // POST: api/Users
            public IHttpActionResult AddComment(Post_Comment Comment)
            {
                if (Comment != null)
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
                else
                {
                    return NotFound();
                }
                    
               

            }
            [ResponseType(typeof(Question))]
            // GET: api/Users
            public Question AddQuestion([FromBody] Question newQuestion)
            {


                if(newQuestion != null){
                    String q = newQuestion.Question1;
                    //this is for an error that it can serialize the data that we send through
                    db.Configuration.ProxyCreationEnabled = false;
                    try
                    {
                        db.Questions.Add(newQuestion);
                        db.SaveChanges();
                        return newQuestion;
                    }
                    catch (Exception e)
                    {
                        return newQuestion;
                    }
                }
                else{
                    return newQuestion;
                }


                

            }
            [ResponseType(typeof(Answer))]
            public IHttpActionResult AddAnswer(Answer newanswer)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    db.Answers.Add(newanswer);
                    db.SaveChanges();
                    return Ok(newanswer);
                }
                catch (Exception e)
                {
                    return Ok(e.Message);
                }

            }
            [ResponseType(typeof(Post))]
            // POST: api/Users
            public IHttpActionResult AddPost(Post POSTCOMMENT)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    if (POSTCOMMENT.inputfield != null)
                    {
                        POSTCOMMENT.Picture = ConvertToBytes(POSTCOMMENT.inputfield);
                    }

                    db.Posts.Add(POSTCOMMENT);
                    db.SaveChanges();
                    return Ok(POSTCOMMENT);
                }
                catch (Exception e)
                {
                    return Ok(e.Message);
                }

            }

            [ResponseType(typeof(Post))]
            // POST: api/Users
            public IHttpActionResult UpdatePost(Post POSTCOMMENT)
            {

                //this is for an error that it can serialize the data that we send through
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    if (POSTCOMMENT.inputfield != null)
                    {
                        POSTCOMMENT.Picture = ConvertToBytes(POSTCOMMENT.inputfield);
                    }

                    db.Posts.Add(POSTCOMMENT);
                    db.SaveChanges();
                    return Ok(POSTCOMMENT);
                }
                catch (Exception e)
                {
                    return Ok(e.Message);
                }

            }
            /***
             * 
             * 
             * this where our own methods are created
             * 1.ConvertToBytes()
             * 2.ValidateAccess()
             * 3.
             * 4.
             * 5.
             * */
            public byte[] ConvertToBytes(HttpPostedFileBase file)
            {
                //got the code from this website http://20fingers2brains.blogspot.com/2014/07/upload-multiple-files-to-database-using.html
                byte[] imageBytes = null;
                BinaryReader reader = new BinaryReader(file.InputStream);
                imageBytes = reader.ReadBytes((int)file.ContentLength);
                return imageBytes;
            }
            public bool AccessValidate(User user)
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

        }
    }
}
